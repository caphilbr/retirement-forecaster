from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/data')
def get_data():
  # Replace this with your logic to retrieve data
  data = {"message": "Hello from Flask API!"}
  return jsonify(data)

if __name__ == '__main__':
  app.run(debug=True)  # remove if in production
