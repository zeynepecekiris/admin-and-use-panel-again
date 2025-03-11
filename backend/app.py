from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

def log_user(username, role):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS user_logs (id INTEGER PRIMARY KEY, username TEXT, role TEXT)")
    cursor.execute("INSERT INTO user_logs (username, role) VALUES (?, ?)", (username, role))
    conn.commit()
    conn.close()

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = f"{data.get('name')} {data.get('surname')}"
    
    # Admin kontrolü
    if username.lower() == "admin admin":
        role = "admin"
    else:
        role = "user"
    
    log_user(username, role)
    return jsonify({
        "message": "Giriş başarılı", 
        "username": username, 
        "role": role
    })

@app.route("/logs", methods=["GET"])
def get_logs():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user_logs")
    logs = cursor.fetchall()
    conn.close()
    
    # Logları daha okunabilir formata çevirelim
    formatted_logs = [
        {
            "id": log[0],
            "username": log[1],
            "role": log[2]
        } for log in logs
    ]
    
    return jsonify({"logs": formatted_logs})

# CORS ayarları için
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST')
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)