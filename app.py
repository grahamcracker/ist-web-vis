from flask import Flask, render_template, jsonify
from pymongo import MongoClient
from bson.json_util import dumps
import json

from helpers import doctor, business, tip

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

@app.route("/businesses/")
def businesses():
    return render_template("businesses.html")

@app.route("/businesses/source")
def businesses_json():
    businesses = db.business
    businesses_bson = businesses.find(filter=business.filter, projection=business.projection)
    return jsonify(businesses=json.loads(dumps(businesses_bson, indent=4)))

@app.route("/tips/")
def tips():
    return render_template("tips.html")

@app.route("/tips/source")
def tips_json():
    tips = db.tips
    tips_bson = tips.find(filter=tip.filter, projection=tip.projection)
    return jsonify(tips=json.loads(dumps(tips_bson, indent=4)))


if __name__ == "__main__":
    app.run(debug=True)
