from flask import Flask, render_template, jsonify
from pymongo import MongoClient
from bson.json_util import dumps
import json

from helpers import doctor

app = Flask(__name__)

client = MongoClient()
db = client.ist

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/doctors/")
def doctors():
    return render_template("doctors.html")

@app.route("/doctors/source")
def doctors_json():
    doctors = db.doctors
    doctors_bson = doctors.find(filter=doctor.filter, projection=doctor.projection)
    return jsonify(doctors=json.loads(dumps(doctors_bson, indent=4)))

if __name__ == "__main__":
    app.run(debug=True)
