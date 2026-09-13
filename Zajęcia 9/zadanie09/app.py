import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from google import genai

load_dotenv()

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("Brak zmiennej środowiskowej GEMINI_API_KEY")

client = genai.Client(api_key=API_KEY)
MODEL_NAME = "gemini-3.6-flash"

app = Flask(__name__)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"error": "Pole 'message' jest wymagane"}), 400

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=user_message,
        )
        reply = response.text
    except Exception as e:
        return jsonify({"error": f"Błąd komunikacji z Gemini: {str(e)}"}), 500

    return jsonify({"reply": reply})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)