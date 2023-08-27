from flask import Flask,render_template,request
import pandas as pd

app = Flask(__name__)


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/index",methods=["post"])
def post():
    return render_template("index.html")

@app.route("/grid")
def gridview():
    return render_template("grid.html")

if __name__ == "__main__":
    app.run(debug=True)