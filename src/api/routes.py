"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Branch, Company
from flask_login import LoginManager
from config import Config
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from geopy.geocoders import Nominatim
from flask import render_template, redirect, url_for, flash
from flask_login import login_user
from flask_migrate import Migrate
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

 
#app = create_app()
api = Blueprint('api', __name__)
#app = Flask(__name__)
#migrate = Migrate(app, db) 
CORS(api)

"""
app.config.from_object(Config)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///branches.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
"""

login_manager = LoginManager(api)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Allow CORS requests to this API
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200

@api.route('/register', methods=['POST'])
def register():
    data_user = request.json
    user = User()
    new_user = user.create_user(email=data_user["email"], password=data_user["password"])
    print(new_user)
    return jsonify({"msg": "Your registration has been successful, congratulations!"})
 
@api.route('/login', methods=['POST'])
def login(): 
    data_user = request.json
    user = User.query.filter_by(email=data_user["email"]).first()
    if user and user.check_password(password=data_user["password"]):
        access_token = create_access_token(identity=user.serialize())
        return jsonify({"token": access_token, "msg": "WELCOME!"})
    else:
        return jsonify({"msg": "Invalid email or password"}), 401

@api.route('/branch', methods=['POST'])
def create_branch():
    data_branch = request.json
    if not data_branch or not 'branch_name' in data_branch or not 'branch_address' in data_branch or not 'branch_phone' in data_branch:
        return jsonify({"msg": "Missing name, address, or phone"}), 400
    branch = Branch(branch_name=data_branch["branch_name"], branch_address=data_branch["branch_address"], branch_phone=data_branch["branch_phone"])
    return jsonify({"msg": "Branch created successfully!"}), 201

@api.route('/company', methods=['POST'])
@jwt_required()
def add_company():
    data = request.get_json()
    user_id = data.get('user_id')
    name = data.get('name')
    nif = data.get('nif')
    company_is_active = data.get('company_is_active', True)  # Default to True if not provided

    if not user_id or not name:
        return jsonify({"error": "user_id and name are required"}), 400

    new_company = Company().create_company(user_id=user_id, name=name, nif=nif, company_is_active=company_is_active)

    return jsonify({"message": "Company added successfully", "company": new_company.serialize()}), 201

@api.route('/company/<int:company_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def manage_company(company_id):
    company = Company.query.get_or_404(company_id)

    if request.method == 'PUT':
        data = request.get_json()
        name = data.get('name')
        is_active = data.get('is_active', True)  # Default to True if not provided

        if not name:
            return jsonify({"error": "name is required"}), 400

        updated_company = company.update_company(name=name, is_active=is_active)

        return jsonify({"message": "Company updated successfully", "company": updated_company.serialize()}), 200

    elif request.method == 'DELETE':
        company.delete_company()
        return jsonify({"message": "Company deleted successfully"}), 200
    

"""
@api.route('/branch', methods=['GET'])
def get_branches():
    branches = Branch.query.all()
    return jsonify([branch.serialize() for branch in branches]), 200

@api.route('/branch/<int:id>', methods=['GET'])
def get_branch(id):
    branch = Branch.query.get_or_404(id)
    return jsonify(branch.serialize()), 200

@api.route('/branch/<int:id>', methods=['PUT'])
def update_branch(id):
    try:
        data_branch = request.json
        branch = Branch.query.get_or_404(id)

        if 'branch_name' in data_branch:
            branch.branch_name = data_branch['branch_name']
        if 'branch_address' in data_branch:
            branch.branch_address = data_branch['branch_address']
        if 'branch_phone' in data_branch:
            branch.branch_phone = data_branch['branch_phone']

        db.session.commit()
        return jsonify({"msg": "Branch updated successfully!", "branch": branch.serialize()}), 200
    except KeyError as e:
        return jsonify({"msg": f"Missing key: {e.args[0]}"}), 400
    except Exception as e:
        return jsonify({"msg": "An error occurred", "error": str(e)}), 500

@api.route('/branch/<int:id>', methods=['DELETE'])
def delete_branch(id):
    try:
        branch = Branch.query.get_or_404(id)
        db.session.delete(branch)
        db.session.commit()
        return jsonify({"msg": "Branch deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"msg": "An error occurred", "error": str(e)}), 500
"""

