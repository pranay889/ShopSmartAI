
import sqlite3
import os

DATABASE = os.path.join(os.path.dirname(__file__), "database.db")

connection = sqlite3.connect(DATABASE)
cursor = connection.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        stock INTEGER NOT NULL,
        rating REAL NOT NULL
    )
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
""")
products = [
    (
        "Smartphone",
        15999,
        "mobiles",
        "Powerful smartphone with a clear display and long battery life.",
        25,
        4.5
    ),
    (
        "Wireless Headphones",
        1999,
        "electronics",
        "Comfortable wireless headphones with clear sound quality.",
        40,
        4.3
    ),
    (
        "Smart Watch",
        2499,
        "accessories",
        "Smart watch with fitness tracking and notification features.",
        30,
        4.4
    ),
    (
        "Wireless Mouse",
        699,
        "electronics",
        "Smooth and comfortable wireless mouse for everyday use.",
        50,
        4.2
    ),
    (
        "Mechanical Keyboard",
        2499,
        "electronics",
        "Durable mechanical keyboard suitable for gaming and typing.",
        20,
        4.6
    ),
    (
        "Power Bank",
        1299,
        "accessories",
        "Portable power bank for charging your devices anywhere.",
        35,
        4.1
    ),
    (
        "Laptop",
        42999,
        "electronics",
        "Reliable laptop for education, programming and data analytics.",
        10,
        4.5
    ),
    (
        "Bluetooth Speaker",
        1799,
        "electronics",
        "Portable speaker with powerful sound and Bluetooth connectivity.",
        28,
        4.3
    )
]

cursor.execute("DELETE FROM products")

cursor.executemany("""
    INSERT INTO products
    (name, price, category, description, stock, rating)
    VALUES (?, ?, ?, ?, ?, ?)
""", products)

connection.commit()
connection.close()

print("Database updated successfully with new products.")