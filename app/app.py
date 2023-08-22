from flask import Flask,render_template,request
#下記のインポート文を追加
from models.models import OnegaiContent

app = Flask(__name__)


@app.route("/")
@app.route("/index")
def index():
    name = request.args.get("name")
    #以下を変更
    all_onegai = OnegaiContent.query.all()
    return render_template("index.html",name=name,all_onegai=all_onegai)
    #変更終わり


@app.route("/index",methods=["post"])
def post():
    name = request.form["name"]
    #ここも変更
    all_onegai = OnegaiContent.query.all()
    return render_template("index.html", name=name, all_onegai=all_onegai)
    #変更終わり


if __name__ == "__main__":
    app.run(debug=True)