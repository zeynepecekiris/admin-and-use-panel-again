from flask import Flask,render_template, request, redirect, url_for, jsonify
from flask_cors import CORS
import sqlite3


app = Flask(__name__)
CORS(app)

users = {
    "admin": {
        "password": "admin",
        "role": "admin",
        "name": "admin",
        "surname": "admin",

            },
        "user": {
            "password": "user",
            "role": "user",
            "name": "user",
            "surname": "user",
        }
           
    }
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=["POST"])   
def login():
    data = request.json
    username = data.get("name", "").lower().strip()
    password = data.get("password", "").lower().strip()

    if username in users and users[username]["password"] == password:
        role = users[username]["role"]
        return jsonify({
            "message": "Login successful",
            "role": role
            }), 200
    else:
        return jsonify({
            "message": "Invalid credentials"
        }), 401
        
    


if __name__ == "__main__":
    app.run (host ="0.0.0.0", port=5000, debug=True)