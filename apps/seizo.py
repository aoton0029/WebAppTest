import flask
from flask import Flask, render_template, jsonify, request, g, redirect, send_file, url_for
from flask_wtf import FlaskForm, CSRFProtect
from wtforms import FieldList, Form, FormField, SelectField, StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange
import pandas as pd
import logging
from datetime import datetime, date, timedelta
import time

seizo = flask.Blueprint('seizo', __name__)

class CSRFOnlyForm(FlaskForm):
    pass

@seizo.route("/posttest", methods=['GET', 'POST'])
def posttest():
    form = CSRFOnlyForm()
    if request.method == 'POST':
        print(request.form)
        return render_template("table1.html")
    return render_template("posttest.html", form=form)

