import flask
from flask import Flask, render_template, jsonify, request, g, redirect, send_file, url_for
from wtforms import Form, StringField, IntegerField, validators
import pandas as pd
import logging
from datetime import datetime, date, timedelta
import time

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

@app.route("/modal", methods=['GET'])
def modal():
    return render_template("modal.html")

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

@app.route("/list/", methods=['GET'])
def get_list():
    return render_template("list.html", linename='B')

@app.route("/list%<lname>", methods=['GET'])
def switch_list(lname=None):
    ln = lname if lname==None else 'TEST'
    ln = f'{ln}{lname}'
    print(ln)
    if('B' in ln):
        print('redirect')
        return redirect(url_for('get_list', linename=ln))
    return render_template("list.html", linename=ln)

@app.route("/chat", methods=['GET'])
def get_chat():
    return render_template("chat.html", linename='B')

@app.route("/draganddrop", methods=['GET'])
def draganddrop():
    return render_template("draganddrop.html")

@app.route("/table1", methods=['GET'])
def table1():
    return render_template("table1.html")

@app.route("/table2", methods=['GET'])
def table2():
    return render_template("table2.html")

@app.route("/table3", methods=['GET'])
def table3():
    return render_template("table3.html")

class EmployeeForm(Form):
    full_name = StringField('Full Name', [validators.Length(min=1, max=50, message="Full Name must be between 1 and 50 characters")])
    age = IntegerField('Age', [validators.NumberRange(min=18, max=65, message="Age must be between 18 and 65")])
    job_title = StringField('Job Title', [validators.Length(min=1, max=50, message="Job Title must be between 1 and 50 characters")])
    location = StringField('Location', [validators.Length(min=1, max=100, message="Location must be between 1 and 100 characters")])
    
@app.route('/validate', methods=['POST'])
def validate():
    form = EmployeeForm(request.form)
    if form.validate():
        return "Validated"
    else:
        return "Validation failed"
   
if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1', port=80)