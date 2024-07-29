# """
# This module takes care of starting the API Server, Loading the DB and Adding the endpoints
# """
# from flask import Flask, request, jsonify, url_for, Blueprint
# from api.models import db, User
# from api.utils import generate_sitemap, APIException
# from flask_cors import CORS

# api = Blueprint('api', __name__)

# # Allow CORS requests to this API
# CORS(api)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Sucursal, Empresa, Empleado, Cita, Producto
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Hello World example
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

# User endpoints
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_serialized = [user.serialize() for user in users]
    return jsonify(users_serialized), 200

@api.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    user = User(
        nombre=data.get('nombre'),
        apellido=data.get('apellido'),
        email=data.get('email'),
        password=data.get('password'),
        telefono=data.get('telefono'),
        id_sucursal=data.get('id_sucursal')
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201

@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.serialize()), 200

@api.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get_or_404(id)
    user.nombre = data.get('nombre', user.nombre)
    user.apellido = data.get('apellido', user.apellido)
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)
    user.telefono = data.get('telefono', user.telefono)
    user.id_sucursal = data.get('id_sucursal', user.id_sucursal)
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200

# Sucursal endpoints
@api.route('/sucursales', methods=['GET'])
def get_sucursales():
    sucursales = Sucursal.query.all()
    sucursales_serialized = [sucursal.serialize() for sucursal in sucursales]
    return jsonify(sucursales_serialized), 200

@api.route('/sucursales', methods=['POST'])
def add_sucursal():
    data = request.get_json()
    sucursal = Sucursal(
        nombre=data.get('nombre'),
        direccion=data.get('direccion'),
        telefono=data.get('telefono')
    )
    db.session.add(sucursal)
    db.session.commit()
    return jsonify(sucursal.serialize()), 201

@api.route('/sucursales/<int:id>', methods=['GET'])
def get_sucursal(id):
    sucursal = Sucursal.query.get_or_404(id)
    return jsonify(sucursal.serialize()), 200

@api.route('/sucursales/<int:id>', methods=['PUT'])
def update_sucursal(id):
    data = request.get_json()
    sucursal = Sucursal.query.get_or_404(id)
    sucursal.nombre = data.get('nombre', sucursal.nombre)
    sucursal.direccion = data.get('direccion', sucursal.direccion)
    sucursal.telefono = data.get('telefono', sucursal.telefono)
    db.session.commit()
    return jsonify(sucursal.serialize()), 200

@api.route('/sucursales/<int:id>', methods=['DELETE'])
def delete_sucursal(id):
    sucursal = Sucursal.query.get_or_404(id)
    db.session.delete(sucursal)
    db.session.commit()
    return jsonify({"message": "Sucursal deleted"}), 200

# Empresa endpoints
@api.route('/empresas', methods=['GET'])
def get_empresas():
    empresas = Empresa.query.all()
    empresas_serialized = [empresa.serialize() for empresa in empresas]
    return jsonify(empresas_serialized), 200

@api.route('/empresas', methods=['POST'])
def add_empresa():
    data = request.get_json()
    empresa = Empresa(
        id_usuario=data.get('id_usuario'),
        id_sucursal=data.get('id_sucursal'),
        nombre=data.get('nombre'),
        nif=data.get('nif')
    )
    db.session.add(empresa)
    db.session.commit()
    return jsonify(empresa.serialize()), 201

@api.route('/empresas/<int:id>', methods=['GET'])
def get_empresa(id):
    empresa = Empresa.query.get_or_404(id)
    return jsonify(empresa.serialize()), 200

@api.route('/empresas/<int:id>', methods=['PUT'])
def update_empresa(id):
    data = request.get_json()
    empresa = Empresa.query.get_or_404(id)
    empresa.id_usuario = data.get('id_usuario', empresa.id_usuario)
    empresa.id_sucursal = data.get('id_sucursal', empresa.id_sucursal)
    empresa.nombre = data.get('nombre', empresa.nombre)
    empresa.nif = data.get('nif', empresa.nif)
    db.session.commit()
    return jsonify(empresa.serialize()), 200

@api.route('/empresas/<int:id>', methods=['DELETE'])
def delete_empresa(id):
    empresa = Empresa.query.get_or_404(id)
    db.session.delete(empresa)
    db.session.commit()
    return jsonify({"message": "Empresa deleted"}), 200

# Empleado endpoints
@api.route('/empleados', methods=['GET'])
def get_empleados():
    empleados = Empleado.query.all()
    empleados_serialized = [empleado.serialize() for empleado in empleados]
    return jsonify(empleados_serialized), 200

@api.route('/empleados', methods=['POST'])
def add_empleado():
    data = request.get_json()
    empleado = Empleado(
        nombre=data.get('nombre'),
        apellido=data.get('apellido'),
        horario=data.get('horario'),
        id_empresa=data.get('id_empresa')
    )
    db.session.add(empleado)
    db.session.commit()
    return jsonify(empleado.serialize()), 201

@api.route('/empleados/<int:id>', methods=['GET'])
def get_empleado(id):
    empleado = Empleado.query.get_or_404(id)
    return jsonify(empleado.serialize()), 200

@api.route('/empleados/<int:id>', methods=['PUT'])
def update_empleado(id):
    data = request.get_json()
    empleado = Empleado.query.get_or_404(id)
    empleado.nombre = data.get('nombre', empleado.nombre)
    empleado.apellido = data.get('apellido', empleado.apellido)
    empleado.horario = data.get('horario', empleado.horario)
    empleado.id_empresa = data.get('id_empresa', empleado.id_empresa)
    db.session.commit()
    return jsonify(empleado.serialize()), 200

@api.route('/empleados/<int:id>', methods=['DELETE'])
def delete_empleado(id):
    empleado = Empleado.query.get_or_404(id)
    db.session.delete(empleado)
    db.session.commit()
    return jsonify({"message": "Empleado deleted"}), 200

# Cita endpoints
@api.route('/citas', methods=['GET'])
def get_citas():
    citas = Cita.query.all()
    citas_serialized = [cita.serialize() for cita in citas]
    return jsonify(citas_serialized), 200

@api.route('/citas', methods=['POST'])
def add_cita():
    data = request.get_json()
    cita = Cita(
        fecha=data.get('fecha'),
        id_producto=data.get('id_producto'),
        id_empleado=data.get('id_empleado'),
        nombre_cliente=data.get('nombre_cliente'),
        apellido_cliente=data.get('apellido_cliente'),
        telefono_cliente=data.get('telefono_cliente'),
        email=data.get('email'),
        observacion=data.get('observacion'),
        id_empresa=data.get('id_empresa')
    )
    db.session.add(cita)
    db.session.commit()
    return jsonify(cita.serialize()), 201

@api.route('/citas/<int:id>', methods=['GET'])
def get_cita(id):
    cita = Cita.query.get_or_404(id)
    return jsonify(cita.serialize()), 200

@api.route('/citas/<int:id>', methods=['PUT'])
def update_cita(id):
    data = request.get_json()
    cita = Cita.query.get_or_404(id)
    cita.fecha = data.get('fecha', cita.fecha)
    cita.id_producto = data.get('id_producto', cita.id_producto)
    cita.id_empleado = data.get('id_empleado', cita.id_empleado)
    cita.nombre_cliente = data.get('nombre_cliente', cita.nombre_cliente)
    cita.apellido_cliente = data.get('apellido_cliente', cita.apellido_cliente)
    cita.telefono_cliente = data.get('telefono_cliente', cita.telefono_cliente)
    cita.email = data.get('email', cita.email)
    cita.observacion = data.get('observacion', cita.observacion)
    cita.id_empresa = data.get('id_empresa', cita.id_empresa)
    db.session.commit()
    return jsonify(cita.serialize()), 200

@api.route('/citas/<int:id>', methods=['DELETE'])
def delete_cita(id):
    cita = Cita.query.get_or_404(id)
    db.session.delete(cita)
    db.session.commit()
    return jsonify({"message": "Cita deleted"}), 200

# Producto endpoints
@api.route('/productos', methods=['GET'])
def get_productos():
    productos = Producto.query.all()
    productos_serialized = [producto.serialize() for producto in productos]
    return jsonify(productos_serialized), 200

@api.route('/productos', methods=['POST'])
def add_producto():
    data = request.get_json()
    producto = Producto(
        nombre=data.get('nombre'),
        descripcion=data.get('descripcion'),
        precio=data.get('precio'),
        id_empresa=data.get('id_empresa')
    )
    db.session.add(producto)
    db.session.commit()
    return jsonify(producto.serialize()), 201

@api.route('/productos/<int:id>', methods=['GET'])
def get_producto(id):
    producto = Producto.query.get_or_404(id)
    return jsonify(producto.serialize()), 200

@api.route('/productos/<int:id>', methods=['PUT'])
def update_producto(id):
    data = request.get_json()
    producto = Producto.query.get_or_404(id)
    producto.nombre = data.get('nombre', producto.nombre)
    producto.descripcion = data.get('descripcion', producto.descripcion)
    producto.precio = data.get('precio', producto.precio)
    producto.id_empresa = data.get('id_empresa', producto.id_empresa)
    db.session.commit()
    return jsonify(producto.serialize()), 200

@api.route('/productos/<int:id>', methods=['DELETE'])
def delete_producto(id):
    producto = Producto.query.get_or_404(id)
    db.session.delete(producto)
    db.session.commit()
    return jsonify({"message": "Producto deleted"}), 200
