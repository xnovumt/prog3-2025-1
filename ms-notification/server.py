from flask import Flask, request, jsonify
from mailersend import emails
from dotenv import load_dotenv
import os
import random

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

# Configurar la clave API de MailerSend
MAILERSEND_API_KEY = os.getenv('MAILERSEND_API_KEY')
if not MAILERSEND_API_KEY:
    raise ValueError("MAILERSEND_API_KEY is not set in the environment variables.")

# Inicializar MailerSend
mailer = emails.NewEmail(MAILERSEND_API_KEY)

# Crear la aplicación Flask
app = Flask(__name__)

# Función para enviar correos
def send_email(data):
    mail_body = {
        "from": {
            "email": "sergiovelaskez23@trial-r9084zvrjnxgw63d.mlsender.net",  # Cambia esto por tu correo verificado en MailerSend
            "name": "Notificaciones"
        },
        "to": data["recipients"],
        "subject": data["subject"],
        "html": data["content"]
    }
    try:
        # Enviar el correo
        response = mailer.send(mail_body)
        print("Response from MailerSend:", response)  # Depuración: imprime la respuesta

        # Manejar la respuesta como cadena
        if isinstance(response, str) and "202" in response:
            return {"status": "success", "message": "Email sent successfully"}
        else:
            return {"status": "error", "message": f"Failed to send email: {response}"}
    except Exception as e:
        return {"status": "error", "message": f"Exception occurred: {str(e)}"}

# Función para generar un código de 2FA
def generate_2fa_code():
    return str(random.randint(100000, 999999))  # Genera un código de 6 dígitos

# Ruta para probar el servicio
@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Notification microservice is running!"})

# Ruta para enviar correos
@app.route('/sendemail', methods=['POST'])
def send_email_route():
    data = request.get_json()
    if not data or "recipients" not in data or "subject" not in data or "content" not in data:
        return jsonify({"error": "Invalid request. 'recipients', 'subject', and 'content' are required."}), 400

    result = send_email(data)
    if result["status"] == "success":
        return jsonify({"message": result["message"]}), 200
    else:
        return jsonify({"error": result["message"]}), 500

# Ruta para enviar un correo con código de 2FA
@app.route('/send2fa', methods=['POST'])
def send_2fa_route():
    data = request.get_json()
    if not data or "recipients" not in data:
        return jsonify({"error": "Invalid request. 'recipients' is required."}), 400

    # Generar el código de 2FA
    code = generate_2fa_code()

    # Crear el contenido del correo
    email_data = {
        "recipients": data["recipients"],
        "subject": "Tu código de autenticación de dos factores",
        "content": f"<h1>Código de autenticación</h1><p>Tu código de autenticación es: <strong>{code}</strong></p>"
    }

    # Enviar el correo
    result = send_email(email_data)
    if result["status"] == "success":
        return jsonify({"message": "2FA email sent successfully", "code": code}), 200
    else:
        return jsonify({"error": result["message"]}), 500

# Iniciar el servidor Flask
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081, debug=False)