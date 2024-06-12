import flask
from flask import Flask, render_template, jsonify, request, g, redirect, send_file, url_for
from flask_wtf import FlaskForm, CSRFProtect
from wtforms import FieldList, Form, FormField, SelectField, StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange
import pandas as pd
import logging
from datetime import datetime, date, timedelta
import time
from seizo import seizo

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
csrf = CSRFProtect(app)

app.register_blueprint(seizo, url_prefix='/seizo')  # Blueprintをアプリに登録


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
    f = EmployeeFormList()
    return render_template("table2.html", form=f)

@app.route('/validate', methods=['POST'])
def validate():
    print(request.form)
    f = EmployeeFormList(request.form)
    if f.validate():
        return render_template('table3.html')
    else:
        return render_template('table2.html', form=f)

@app.route('/add_row', methods=['POST'])
def add_row():
    employee_form = EmployeeForm()
    rendered_form = render_template('employee_form.html', form=employee_form)
    return jsonify({'form': rendered_form})

@app.route("/table3", methods=['GET'])
def table3():
    return render_template("table3.html")

@app.route('/combobox', methods=['GET', 'POST'])
def combobox():
    form = ComboBoxForm()
    if form.validate_on_submit():
        print("Selected option:", form.options.data)
        return redirect('/combobox')
    return render_template('combobox.html', form=form)

@app.route('/table_form', methods=['GET', 'POST'])
def table_form():
    form = TableForm()
    if form.validate_on_submit():
        rows = form.row.data
        columns = form.column.data
        return render_template('table.html', rows=rows, columns=columns)
    return render_template('table_form.html', form=form)

class TableForm(FlaskForm):
    row = IntegerField('Number of Rows', validators=[DataRequired()])
    column = IntegerField('Number of Columns', validators=[DataRequired()])
    submit = SubmitField('Create Table')
   
class ComboBoxForm(FlaskForm):
    options = SelectField('Options', choices=[('1', 'Option 1'), ('2', 'Option 2'), ('3', 'Option 3')])

class EmployeeForm(Form):
    full_name = StringField('Full Name', [Length(min=1, max=50, message="Full Name must be between 1 and 50 characters")])
    age = IntegerField('Age', [NumberRange(min=18, max=65, message="Age must be between 18 and 65")])
    job_title = StringField('Job Title', [Length(min=1, max=50, message="Job Title must be between 1 and 50 characters")])
    location = StringField('Location', [Length(min=1, max=100, message="Location must be between 1 and 100 characters")])
    
class EmployeeFormList(FlaskForm):
    employees = FieldList(FormField(EmployeeForm), min_entries=1)

   
if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1', port=80)