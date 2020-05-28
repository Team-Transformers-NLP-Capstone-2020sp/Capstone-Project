from flask import Flask, render_template, request
import interact2
import json
import pickle
import codecs

app = Flask(__name__,)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/test")
def test():
    return render_template("test.html")

@app.route("/personality", methods=['GET'])
def personality():
    personality, text_personality = interact2.getPersonality()
    return json.dumps([personality, text_personality])

@app.route("/chat", methods=['GET'])
def chat():
    raw_text = request.args.get('raw_text')
    personality = json.loads(request.args.get('personality'))
    chatHistory = json.loads(request.args.get('chatHistory'))
    out_text, chatHistory = interact2.webRun(raw_text, personality, chatHistory)
    return json.dumps([out_text, chatHistory])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
