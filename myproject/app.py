from flask import Flask, request, render_template
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        file = request.files['image']
        if file:
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
            return f"上传成功: {file.filename}"
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
