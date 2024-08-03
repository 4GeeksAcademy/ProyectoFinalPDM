import os
import sys
import re
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, redirect, url_for, flash, abort
from flask_mail import Mail, Message
from sqlalchemy.orm import validates
from datetime import datetime
from itsdangerous import URLSafeTimedSerializer
from geopy.geocoders import Nominatim
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=True)
    last_name = db.Column(db.String(80), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=True, nullable=False)
    phone = db.Column(db.String(15), unique=False, nullable=True)
    companies = db.relationship('Company', backref='user', lazy=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'
    
    def generate_password(self, password):
        return bcrypt.generate_password_hash(password)
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def create_user(self, email, password, is_active=True):
        hashed_password = self.generate_password(password).decode('utf-8')
        new_user = User(
            email = email,
            password = hashed_password,
            is_active =is_active   
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user
        
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            'is_active': self.is_active
            # do not serialize the password, i ts a security breach
        }
    
    """
    def send_verification_email(email):
        token = s.dumps(email, salt='email-confirm')
        link = url_for('confirm_email', token=token, _external=True)
        msg = Message('Confirm Your Email', recipients=[email])
        msg.body = f'Your link is {link}'
        mail.send(msg)
      

    @app.route('/confirm_email/<token>')
    def confirm_email(token):
        try:
            email = s.loads(token, salt='email-confirm', max_age=3600)
        except:
            return '<h1>The confirmation link is invalid or has expired.</h1>'
        return '<h1>Your email has been verified!</h1>'
    """

    @validates('phone')
    def validate_phone(self, key, phone):
        country_code = "+34"
        if not phone.startswith(country_code):
            phone = country_code + phone
        return phone
    
    @validates('email')
    def validate_email(self, key, email):
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not re.match(email_regex, email):
            raise ValueError("El correo electrónico no es válido")
        return email

class Branch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    branch_name = db.Column(db.String(250), nullable=False)
    branch_address = db.Column(db.String(150), nullable=False)
    branch_phone = db.Column(db.String(15), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    branch_is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def create_branch(self, branch_name, branch_address, branch_phone, company_id, branch_is_active=True):
        new_branch = Branch(
            branch_name = branch_name,
            branch_address = branch_address,
            branch_phone = branch_phone,
            company_id = company_id,
            branch_is_active = branch_is_active   
        )
        db.session.add(new_branch)
        db.session.commit()
        return new_branch 
    
    def serialize(self):
        return {
            "id": self.id,
            "branch_name": self.branch_name,
            "branch_address": self.branch_address,
            "branch_phone": self.branch_phone,
            "company_id": self.company_id,
            "branch_is_active": self.branch_is_active
        }


    @validates('branch_phone')
    def validate_phone(self, key, phone):
        country_code = "+34"  
        if not phone.startswith(country_code):
            phone = country_code + phone
        return phone


    @validates('branch_address')
    def validate_address(self, key, address):
        geolocator = Nominatim(user_agent="branch_locator")
        location = geolocator.geocode(address)
        if not location:
            raise ValueError("La dirección no es válida")
        return address

class AvailableSlot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employees_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    appointments = db.relationship('Appointment', backref='available_slot', lazy=True)
    available_slot_is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    @validates('start_time', 'end_time')
    def validate_times(self, key, value):
        if key == 'start_time' and value < datetime.now():
            raise ValueError("La hora de inicio debe estar en el futuro")
        if key == 'end_time' and value <= self.start_time:
            raise ValueError("La hora de fin debe ser posterior a la hora de inicio")
        return value 

    def create_slot(self, employee_id, start_time, end_time, available_slot_is_active=True):
        new_slot = AvailableSlot(
            employee_id=employee_id, 
            start_time=start_time, 
            end_time=end_time, 
            available_slot_is_active=available_slot_is_active
            )
        db.session.add(new_slot)
        db.session.commit()
        return new_slot
    
    def serialize(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'start_time': self.start_time.isoformat(),
            'end_time': self.end_time.isoformat(),
            'available_slot_is_active': self.available_slot_is_active,
            'appointments': [appointment.serialize() for appointment in self.appointments]
        }
    
class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    appointment_time = db.Column(db.DateTime, nullable=False)
    first_name_customer = db.Column(db.String(80), nullable=False)
    last_name_customer = db.Column(db.String(80), nullable=False)
    phone_customer = db.Column(db.String(15), nullable=False)
    email_customer = db.Column(db.String(120), nullable=False)
    observation_customer = db.Column(db.String(500), nullable=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    available_slot_id = db.Column(db.Integer, db.ForeignKey('available_slot.id'), nullable=False)
    service = db.relationship('Service', backref='appointment', lazy=True)
    product = db.relationship('Product', backref='appointment', lazy=True)
    employee = db.relationship('Employee', backref='appointment', lazy=True)
    appointment_is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)  

    @validates('appointment_time')
    def validate_appointment_time(self, key, appointment_time):
        if appointment_time < datetime.now():
            raise ValueError("La fecha y hora de la cita deben estar en el futuro")
        return appointment_time

    def create_appointment(self, company_id, available_slot_id, appointment_time, first_name_customer, last_name_customer, phone_customer, email_customer, observation_customer, appointment_is_active=True):
        new_appointment = Appointment(
            company_id=company_id,
            available_slot_id=available_slot_id,
            appointment_time=appointment_time,
            first_name_customer=first_name_customer,
            last_name_customer=last_name_customer,
            phone_customer=phone_customer,
            email_customer=email_customer,
            observation_customer=observation_customer,
            appointment_is_active=appointment_is_active
        )
        db.session.add(new_appointment)
        db.session.commit()
        return new_appointment

    def serialize(self):
        return {
            'id': self.id,
            'appointment_time': self.appointment_time.isoformat(),
            'first_name_customer': self.first_name_customer,
            'last_name_customer': self.last_name_customer,
            'phone_customer': self.phone_customer,
            'email_customer': self.email_customer,
            'observation_customer': self.observation_customer,
            'company_id': self.company_id,
            'available_slot_id': self.available_slot_id,
            'appointment_is_active': self.appointment_is_active
        }

    @validates('first_name', 'last_name')
    def validate_not_empty(self, key, value):
        if not value:
            raise ValueError(f"El campo {key} no puede estar vacío")
        return value

    @validates('phone', 'email')
    def validate_contact_details(self, key, value):
        if key == 'phone':
            country_code = "+34"
            if not value.startswith(country_code):
                value = country_code + value
        elif key == 'email':
            email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
            if not re.match(email_regex, value):
                raise ValueError("El correo electrónico no es válido")
        return value
       
    
class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    service_name = db.Column(db.String(100), nullable=False)
    service_price = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    appointment_id = db.Column(db.Integer, db.ForeignKey('appointment.id'), nullable=False)
    
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), nullable=False)
    product_price = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    appointment_id = db.Column(db.Integer, db.ForeignKey('appointment.id'), nullable=False)

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    available_slots = db.relationship('AvailableSlot', backref='employee', lazy=True) 
    working_hours = db.relationship('WorkingHours', backref='employee', lazy=True)
    appointment_id = db.Column(db.Integer, db.ForeignKey('appointment.id'), nullable=False)

class WorkingHours(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)

    @validates('start_time', 'end_time')
    def validate_times(self, key, value):
        if key == 'start_time' and value < datetime.now():
            raise ValueError("La hora de inicio debe estar en el futuro")
        if key == 'end_time' and value <= self.start_time:
            raise ValueError("La hora de fin debe ser posterior a la hora de inicio")
        return value

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    name = db.Column(db.String(250), nullable=False)
    nif = db.Column(db.String(9), nullable=False) #UNA LETRA INICIAL A, B, C (EN MAYUSCULA) CON 7 NÚMEROS, UNA CRACTER DE CONTROL Un carácter de control (que puede ser una letra o un número) al final.
    branches = db.relationship('Branch', backref='company', lazy=True)
    service = db.relationship('Service', backref='company', lazy=True)
    product = db.relationship('Product', backref='company', lazy=True)
    employee = db.relationship('Employee', backref='company', lazy=True)
    appointment = db.relationship('Appointment', backref='company', lazy=False)
    company_is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    @validates('nif')
    def validate_nif(self, key, nif):
        pattern = r'^[ABC]\d{7}[A-Z0-9]$'
        if not re.match(pattern, nif):
            raise ValueError("Invalid NIF format. Expected format: One initial letter among 'A', 'B', 'C', followed by 7 digits, and a control character at the end.")
        return nif

    def create_company(self, user_id, name, nif, company_is_active=True):
        new_company = Company(user_id=user_id, name=name, nif=nif, company_is_active=company_is_active)
        db.session.add(new_company)
        db.session.commit()
        return new_company

    def update_company(self, name, is_active):
        self.name = name
        self.company_is_active = is_active
        db.session.commit()
        return self

    def delete_company(self):
        db.session.delete(self)
        db.session.commit()

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'is_active': self.company_is_active
        }

