import flask
from flask import Flask, render_template, jsonify, request, g
import pandas as pd
import logging
import json

app = Flask(__name__)

datas = pd.DataFrame(
    data={'工番': [10, 20, 30, 40],
          '型名': [50, 60, 70, 80],
          '着手計画日': ['2023/08/23', '2023/08/23', '2023/08/23', '2023/08/23']}
)

@app.route("/", methods=['GET', 'POST'])
def index():
    return render_template("index.html")

@app.route("/headers", methods=['GET','POST'])
def headers():
    return render_template("headers.html")

@app.route("/radiobtn", methods=['GET','POST'])
def radiobtn():
    return render_template("radiobtn.html")

@app.route("/flow", methods=['GET','POST'])
def flow():
    return render_template("flow.html")

@app.route("/button", methods=['GET','POST'])
def button():
    return render_template("button.html")

@app.route("/grid", methods=['GET'])
def get_grid():
    return render_template("grid.html")

@app.route("/grid", methods=['POST'])
def post_grid():
    new_value = datas.to_json()
    if request.headers['Content-Type'] != 'application/json':
        print(request.headers['Content-Type'])
        return flask.jsonify(res='error'), 400
    return flask.jsonify(res='ok')


if __name__ == "__main__":
    app.run(debug=True)