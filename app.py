from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)


@app.route('/')
@app.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == "GET":
        return render_template('login.html')
        # POST请求
    if request.method == "POST":
        # 获取数据并转化成字典
        user_info = request.form.to_dict()
        if user_info.get("username") == "admin" and user_info.get("pwd") == '123456':
            return redirect(url_for('index'))    # redirect会改变url地址，render_templates渲染不会。
    return "用户名密码错误"


@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/single/left1')
def left1():
    return render_template('Left1.html')


@app.route('/single/left2')
def left2():
    return render_template('Left2.html')


@app.route('/single/left3')
def left3():
    return render_template('Left3.html')


@app.route('/single/right1')
def right1():
    return render_template('Right1.html')


@app.route('/single/right2')
def right2():
    return render_template('Right2.html')


@app.route('/single/right3')
def right3():
    return render_template('Right3.html')


if __name__ == '__main__':
    app.run(debug=True)
