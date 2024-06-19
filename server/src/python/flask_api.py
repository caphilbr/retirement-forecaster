from flask import Flask, jsonify, request
import main

app = Flask(__name__)

@app.route('/api/v1/scenario', methods=['POST'])
def run_scenario():
  if request.is_json:
    scenarioInputs = request.get_json()
    results = main.run(scenarioInputs)
    # print(results, flush=True)
    return results
  else:
    errorMessage = jsonify({ "error": "Invalid input, JSON expected" })
    return errorMessage, 400

if __name__ == '__main__':
  app.run(debug=True)  # remove if in production
