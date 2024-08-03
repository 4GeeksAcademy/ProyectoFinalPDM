  
import os
from flask_admin import Admin
from .models import db, User, Branch, AvailableSlot, Appointment, Service, Product, Employee, WorkingHours, Company
from flask_admin.contrib.sqla import ModelView
from flask_wtf import FlaskForm
from wtforms import SubmitField, Form, BooleanField, StringField, PasswordField, validators
from wtforms.validators import DataRequired, Email, Length, EqualTo

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Branch, db.session))
    admin.add_view(ModelView(AvailableSlot, db.session))
    admin.add_view(ModelView(Appointment, db.session))
    admin.add_view(ModelView(Service, db.session))
    admin.add_view(ModelView(Product, db.session))
    admin.add_view(ModelView(Employee, db.session))
    admin.add_view(ModelView(WorkingHours, db.session))
    admin.add_view(ModelView(Company, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
