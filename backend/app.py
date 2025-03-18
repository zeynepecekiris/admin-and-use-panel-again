from flask import Flask, request,jsonify
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime


app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  
DB_PATH = os.path.join(BASE_DIR, "users.db") 

def create_user_table():
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""  
    CREATE TABLE IF NOT EXISTS users(
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     surname TEXT NOT NULL,
     role TEXT NOT NULL
     login_time TEXT
    )""")

    conn.commit()
    conn.close()

create_user_table()



@app.route("/register", methods=["POST"])

def register():
    data = request.json
    name = data.get("name", "").lower().strip()
    surname = data.get("surname", "").lower().strip()
    role = data.get("role", "user")

    if not name or not surname :
        return jsonify({"message": "All fields are required"}), 400

    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM users WHERE name=? AND surname=?", (name, surname))
        existing_user = cursor.fetchone()
        if existing_user:
            conn.close()
            return jsonify({"message": "User already exists"}), 400

        
        cursor.execute("INSERT INTO users (name, surname, role) VALUES (?, ?, ?)", (name, surname, role))

        conn.commit()
        conn.close()
        
        return jsonify({"message": "User registered successfully"}), 201
   
    except Exception as e:
        return jsonify({"message": "Database error", "error": str(e)}), 500
   
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()  
    name = data.get("name", "").strip().lower()
    surname = data.get("surname", "").strip().lower()
    

    if not name or not surname:
        return jsonify({"message": "All fields are required"}), 400
    
    try:
        conn = sqlite3.connect(DB_PATH) 
        cursor = conn.cursor()
        cursor.execute("SELECT role FROM users WHERE name=? AND surname=?", (name, surname))
        user = cursor.fetchone()

    if user:
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
         cursor.execute(
                "UPDATE users SET login_time=? WHERE name=? AND surname=?",
                (now, name, surname)
            )
        conn.commit()
        role = user[0]
        conn.close()

        return jsonify({
            "message":"Login successful",
            "role": role,
            "token": "fake-jwt-token"
        }), 200

    else:
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cursor.execute(
                "INSERT INTO users (name, surname, role, login_time) VALUES (?, ?, ?, ?)",
                (name, surname, "user", now)
            )
        conn.commit()
        conn.close()
        
        return jsonify({
                "message": "User registered and logged in successfully",
                "role": "user",
                "token": "fake-jwt-token"
            }), 201

    except Exception as e:
        return jsonify({"message": "Database error", "error": str(e)}), 500




@app.route("/")
def home():
    return "Flask is running!"
    


if __name__ == "__main__":
    app.run (host ="0.0.0.0", port=8000, debug=True)