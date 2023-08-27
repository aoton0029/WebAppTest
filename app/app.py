import flask
from flask import Flask, render_template, jsonify, request, g
import pandas as pd
import json

app = Flask(__name__)

datas = pd.DataFrame(
    data={'工番': [10, 20, 30, 40],
          '型名': [50, 60, 70, 80],
          '着手計画日': ['2023/08/23', '2023/08/23', '2023/08/23', '2023/08/23']}
)

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/index", methods=["post"])
def post():
    return render_template("index.html")


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
    #print(new_value)
    #print(request.path)
    #return jsonify(values=json.dumps(new_value))

if __name__ == "__main__":
    app.run(debug=True)