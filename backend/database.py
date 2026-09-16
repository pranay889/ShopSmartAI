import sqlite3
import os

DATABASE = os.path.join(
    os.path.dirname(__file__),
    "database.db"
)


def setup_database():
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Create products table
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

    # Create users table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)

    # All 26 products
    products = [
        (
            "Samsung Galaxy A15",
            14999,
            "mobile",
            "Affordable smartphone with a bright display and long battery life.",
            25,
            4.5
        ),
        (
            "iPhone 15",
            54999,
            "mobile",
            "Premium smartphone with powerful performance and excellent camera quality.",
            20,
            4.7
        ),
        (
            "OnePlus Nord CE",
            18999,
            "mobile",
            "Fast and stylish smartphone for daily use and gaming.",
            30,
            4.4
        ),
        (
            "Realme Narzo",
            11999,
            "mobile",
            "Budget-friendly smartphone with smooth performance.",
            35,
            4.3
        ),
        (
            "Android Tablet",
            12999,
            "mobile",
            "Useful tablet for studying, entertainment, and browsing.",
            25,
            4.2
        ),
        (
            "Smart Watch",
            2499,
            "electronics",
            "Track your fitness, heart rate, and daily activities.",
            30,
            4.4
        ),
        (
            "Wireless Headphones",
            1799,
            "electronics",
            "Enjoy clear sound and comfortable wireless listening.",
            40,
            4.3
        ),
        (
            "Bluetooth Speaker",
            1499,
            "electronics",
            "Portable speaker with powerful sound for parties and travel.",
            35,
            4.3
        ),
        (
            "Gaming Mouse",
            899,
            "electronics",
            "Responsive gaming mouse with comfortable controls.",
            50,
            4.2
        ),
        (
            "Mechanical Keyboard",
            3499,
            "electronics",
            "Mechanical keyboard suitable for work, study, and gaming.",
            20,
            4.6
        ),
        (
            "Fast Charging Adapter",
            799,
            "electronics",
            "Compact fast charger for compatible smartphones.",
            45,
            4.1
        ),
        (
            "Power Bank",
            1299,
            "electronics",
            "Portable power bank for charging devices while travelling.",
            35,
            4.1
        ),
        (
            "USB-C Cable",
            299,
            "electronics",
            "Durable USB-C charging and data cable.",
            60,
            4.0
        ),
        (
            "Classic Sneakers",
            2299,
            "fashion",
            "Comfortable sneakers for everyday use.",
            30,
            4.3
        ),
        (
            "Running Shoes",
            1999,
            "fashion",
            "Lightweight running shoes for workouts and outdoor activities.",
            35,
            4.4
        ),
        (
            "Oversized Hoodie",
            1599,
            "fashion",
            "Soft and comfortable casual hoodie.",
            40,
            4.2
        ),
        (
            "Casual T-Shirt",
            699,
            "fashion",
            "Comfortable cotton T-shirt for everyday wear.",
            50,
            4.1
        ),
        (
            "Denim Jacket",
            2499,
            "fashion",
            "Stylish denim jacket for a modern casual look.",
            25,
            4.3
        ),
        (
            "Slim Fit Jeans",
            1799,
            "fashion",
            "Comfortable slim-fit jeans for casual outfits.",
            30,
            4.2
        ),
        (
            "Urban Backpack",
            1299,
            "accessories",
            "Stylish backpack for college, office, and travel.",
            35,
            4.4
        ),
        (
            "Premium Sunglasses",
            999,
            "accessories",
            "Modern sunglasses with a stylish look.",
            40,
            4.1
        ),
        (
            "Leather Wallet",
            599,
            "accessories",
            "Compact wallet for cards, cash, and identification.",
            45,
            4.2
        ),
        (
            "Smart Desk Lamp",
            1199,
            "home",
            "Brighten your study desk with a modern desk lamp.",
            30,
            4.3
        ),
        (
            "Water Bottle",
            499,
            "home",
            "Reusable water bottle for college, gym, and travel.",
            60,
            4.2
        ),
        (
            "Study Table Organizer",
            799,
            "home",
            "Keep your study table clean and organized.",
            40,
            4.1
        ),
        (
            "LED Strip Lights",
            899,
            "home",
            "Decorative LED lights for your room or gaming setup.",
            35,
            4.3
        )
    ]

    # Insert products only if the table is empty
    cursor.execute("SELECT COUNT(*) FROM products")
    product_count = cursor.fetchone()[0]

    if product_count == 0:
        cursor.executemany("""
            INSERT INTO products
            (name, price, category, description, stock, rating)
            VALUES (?, ?, ?, ?, ?, ?)
        """, products)

        print("Products inserted successfully.")
    else:
        print("Products already exist. No duplicate products inserted.")

    connection.commit()
    connection.close()

    print("Database setup completed successfully.")


if __name__ == "__main__":
    setup_database()