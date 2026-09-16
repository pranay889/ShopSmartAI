from flask import Flask, jsonify, request, send_from_directory
import sqlite3
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'


DATABASE = os.path.join(os.path.dirname(__file__), "database.db")


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


@app.route("/")
def home():
    return send_from_directory(
        os.path.dirname(os.path.dirname(__file__)),
        "index.html"
    )


@app.route("/style.css")
def style():
    return send_from_directory(
        os.path.dirname(os.path.dirname(__file__)),
        "style.css"
    )


@app.route("/script.js")
def script():
    return send_from_directory(
        os.path.dirname(os.path.dirname(__file__)),
        "script.js"
    )
# ================= PRODUCTS =================

@app.route("/api/products")
def products():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT id, name, price, category, description, stock, rating
        FROM products
    """)

    products_list = [dict(row) for row in cursor.fetchall()]
    connection.close()

    return jsonify(products_list)


# ================= CREATE ACCOUNT =================

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    if not name or not email or not password:
        return jsonify({
            "success": False,
            "message": "Please fill all fields."
        }), 400

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)

    cursor.execute("SELECT id FROM users WHERE email = ?", (email,))

    if cursor.fetchone():
        connection.close()

        return jsonify({
            "success": False,
            "message": "This email is already registered."
        }), 409

    cursor.execute("""
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
    """, (name, email, password))

    connection.commit()
    connection.close()

    return jsonify({
        "success": True,
        "message": "Account created successfully!"
    })


# ================= LOGIN =================

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Please enter email and password."
        }), 400

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT id, name, email
        FROM users
        WHERE email = ? AND password = ?
    """, (email, password))

    user = cursor.fetchone()
    connection.close()

    if user:
        return jsonify({
            "success": True,
            "message": "Login successful!",
            "user": dict(user)
        })

    return jsonify({
        "success": False,
        "message": "Incorrect email or password."
    }), 401


if __name__ == "__main__":
    app.run(debug=True)