# app.py
from flask import Flask, request, Response
# import requests
import os, json, re
from dotenv import load_dotenv
from flask_cors import CORS
import openai

load_dotenv()  # 加载 .env 文件中的变量

app = Flask(__name__)
CORS(app, origins="*")
openai.api_key = os.getenv("OPENAI_API_KEY")  # 从环境变量中获取 API 密钥




@app.route("/api/python", methods=["POST"])
def generate():
    # return "<p>Hello, World!</p>"
    content = request.json.get('content')
    # print(content, flush=True)

    def stream():
        for chunk in openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=[
                {'role': 'user', 'content': content}
            ],
            temperature=0,
            stream=True  # this time, we set stream=True
        ):
            # 有的chunk没有content
            if 'content' in chunk.choices[0].delta:
                print(chunk.choices[0].delta.content)
                yield chunk.choices[0].delta.content

    return Response(stream(), mimetype='text/event-stream')
    
    

if __name__ == '__main__':
    app.run(port=5328,debug=True)



