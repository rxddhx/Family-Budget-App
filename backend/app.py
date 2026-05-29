from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# Creating database table
def create_database():
    connection = sqlite3.connect("finance.db")
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            amount REAL
        )
    """)

    connection.commit()
    connection.close()


# Add transaction
@app.route('/add', methods=['POST'])
def add_transaction():

    data = request.json

    connection = sqlite3.connect("finance.db")
    cursor = connection.cursor()

    cursor.execute(
        "INSERT INTO transactions (type, amount) VALUES (?, ?)",
        (data['type'], data['amount'])
    )

    connection.commit()
    connection.close()

    return jsonify({"message": "Transaction added"})


# Get all transactions
@app.route('/transactions')
def get_transactions():

    connection = sqlite3.connect("finance.db")
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM transactions")

    data = cursor.fetchall()

    connection.close()

    return jsonify(data)


# Summary
@app.route('/summary')
def summary():

    connection = sqlite3.connect("finance.db")
    cursor = connection.cursor()

    # Income total
    cursor.execute(
        "SELECT SUM(amount) FROM transactions WHERE type='income'"
    )

    income = cursor.fetchone()[0]

    if income is None:
        income = 0

    # Expense total
    cursor.execute(
        "SELECT SUM(amount) FROM transactions WHERE type='expense'"
    )

    expenses = cursor.fetchone()[0]

    if expenses is None:
        expenses = 0

    savings = income - expenses

    connection.close()

    return jsonify({
        "income": income,
        "expenses": expenses,
        "savings": savings
    })


# Starting the  app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)