from flask import Flask,render_template, request, redirect, url_for, jsonify
from flask_cors import CORS
import sqlite3


app = Flask(__name__)
CORS(app)

def create_users_table():
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS  users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
    )""")
    
    conn.commit()
    conn.close()

create_users_table()

@app.route("/register", methods=["POST"])

def register():
    data = request.json
    name = data.get("name", "").lower().strip()
    surname = data.get("surname", "").lower().strip()
    password = data.get("password", "").lower().strip()
    role = data.get("role", "user")


    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()


    cursor.execute("SELECT role FROM users WHERE name=? AND surname=? AND password=?", (name, surname, password))
    existing_user = cursor.fetchone()
   
    if existing_user:
        conn.close()
        return jsonify({"message": "User already exists"
    }), 400
    
    cursor.execute("INSERT INTO users (name, surname, password, role) VALUES (?, ?, ?, ?)", (name, surname, password, role))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "User registered successfully"
    }), 201
   
    
   
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()  # JSON verisini al

    if not data:
        return jsonify({"message": "Invalid request, no data received"}), 400

    name = data.get("name", "").strip().lower()
    surname = data.get("surname", "").strip().lower()
    password = data.get("password", "").strip()

    if not name or not surname or not password:
        return jsonify({"message": "All fields are required"}), 400

    try:
        conn = sqlite3.connect("users.db")
        cursor = conn.cursor()
        cursor.execute("SELECT role FROM users WHERE name=? AND surname=? AND password=?", (name, surname, password))
        user = cursor.fetchone()
        conn.close()
    except Exception as e:
        return jsonify({"message": "Database error", "error": str(e)}), 500

    if user:
        return jsonify({
            "message": "Login successful",
            "role": user[0],
            "token": "fake-jwt-token"
        }), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401


@app.route("/")
def home():
    return "Flask is running!"
    


if __name__ == "__main__":
    app.run (host ="0.0.0.0", port=8000, debug=True)