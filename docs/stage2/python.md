## YagoutPay Python Integration: Setup and Usage

This document provides detailed instructions for setting up and using the YagoutPay hosted checkout and direct API integration with Python, both directory in the repository available at [CLICK ME](https://github.com/Liladet/yagoutpay_payement/tree/main/yagoutpay%20with%20python%20both). The integration supports secure payment processing using AES-256-CBC encryption and direct API calls to the YagoutPay gateway.

# Setup

Follow these steps to set up the Python environment and prepare the YagoutPay integration.

# Prerequisites

- Python 3.8 or higher: Required for running the integration scripts.
- Git: For cloning the repository.
- Terminal or Command Prompt: For executing commands.
- YagoutPay Credentials: Obtain MERCHANT_ID, MERCHANT_KEY, and other necessary credentials from YagoutPay.
- Optional: A tool like ngrok for testing callback URLs locally.

# Step-by-Step Setup

1. Clone the Repository

- Open your terminal or command prompt.
- Clone the YagoutPay payment integration repository:

```bash
git clone https://github.com/Liladet/yagoutpay_payement.git
```

Navigate to the Python integration directory:

```bash
cd yagoutpay_payement/yagoutpay with python both
```

2. Set Up a Virtual Environment

- Create a virtual environment to isolate dependencies:

```bash
python -m venv venv
```

- Activate the virtual environment:
  - On Linux/Mac:

```bash
  source venv/bin/activate
```

- On Windows:

```bash
venv\Scripts\activate
```

3. Install Dependencies

- Install the required Python packages for the integration:

```bash
pip install requests cryptography flask
```

- requests: For making HTTP requests to the YagoutPay API.

- cryptography: For AES-256-CBC encryption (preferred over pycryptodome in some cases).

- flask: For running the local server to handle payment requests.

- If a requirements.txt file is present in the directory, you can alternatively run:

```bash
pip install -r requirements.txt
```

4. Configure the Python Script

- Open the Python script (e.g., direct api.py ) in a code editor.

- Update the following constants with your YagoutPay credentials:

```bash
MERCHANT_ID = "202508080001" # Replace with your merchant ID
MERCHANT_KEY = base64.b64decode("IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=") # Replace with your base64-encoded key
IV = b"0123456789abcdef" # Replace with your initialization vector
AGGREGATOR_ID = "yagout" # Replace if different
URL = "https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0"
```

- If testing locally, set up callback URLs using ngrok:

  - Install ngrok: npm install -g ngrok or download from https://ngrok.com/.

  - Run ngrok http 5000 to get a public URL (e.g., https://b1b88f72e1d8.ngrok-free.app).

  - Update success and failure URLs in the script accordingly.

5. Run the Flask Server

- Start the Flask server to handle payment requests:

```bash
python Direct Api.py

```

- The server will run on http://localhost:5000 by default.

- Ensure the server is running before proceeding to usage.

# Usage

This section explains how to use the Python integration to process payments via the YagoutPay direct API, which involves encrypting a payload and sending it to the /apiRedirection/apiIntegration endpoint.

# Step-by-Step Usage

1. Initiate a Payment Request

- Access the Flask server’s payment endpoint, typically at http://localhost:5000/pay, to trigger a payment. This can be done:

  - Directly by visiting the URL in a browser (for testing).

  - Via a frontend application (e.g., React) that sends a request to the Flask backend.

- The Python script (e.g., direct api.py) constructs a JSON payload with payment details, such as:

```bash
{
"amount": 100,
"currency": "ETB",
"orderId": "123"
}
```

2. Encrypt the Payload

- The script encrypts the JSON payload using AES-256-CBC via the cryptography library (or pycryptodome if used in the script).

- Example encryption function (based on hosted_checkoutpay.py):

```bash
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import base64

def encrypt_aes(plaintext: str, key: bytes, iv: bytes) -> str:
cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
encryptor = cipher.encryptor()
padded = pad(plaintext.encode("utf-8"), algorithms.AES.block_size)
encrypted = encryptor.update(padded) + encryptor.finalize()
return base64.b64encode(encrypted).decode("utf-8")
```

- The encrypted payload is sent to the /othersRedirection/encryption endpoint:

```bash
POST https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/othersRedirection/encryption
Content-Type: application/json
{
"data": "{\"amount\": 100, \"currency\": \"ETB\", \"orderId\": \"123\"}"
}
```

- The response contains the encrypted field (base64-encoded string).

3. Process the Payment

- Using the encrypted payload from the previous step, the script sends a request to the /apiRedirection/apiIntegration endpoint:

```bash
POST https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration
Content-Type: application/json
{
"merchantId": "202508080001",
"merchantRequest": "base64_encrypted_from_previous_step"
}
```

- The response indicates the payment status:

```bash
{
"status": "Success",
"statusMessage": "No Error",
"response": "encrypted_response_base64"
}
```

- or, in case of an error:

```bash
{
"status": "Error",
"statusMessage": "Invalid request"
}
```

4. Handle Callbacks

- After processing, YagoutPay redirects to the success or failure URL specified in the script (e.g., https://b1b88f72e1d8.ngrok-free.app/yagoutpay/success or /failure).

- Implement Flask routes to handle these callbacks:

```bash
@app.route("/yagoutpay/success")
def success(): # Log or process success response
return "Payment Successful"

@app.route("/yagoutpay/failure")
def failure(): # Log or process failure response
return "Payment Failed"
```

- Use ngrok for local testing to receive callbacks:

  - Run ngrok http 5000 and update the URLs in the script.

  - Verify the response for status and statusMessage.

# Additional Notes

- Testing: Use the YagoutPay UAT environment (https://uatcheckout.yagoutpay.com) for safe testing. Ensure all credentials are correct.

- Security: The integration uses AES-256-CBC for encryption, ensuring secure data transmission. Verify that MERCHANT_KEY and IV are securely stored.

- Customization: Modify the payment payload (e.g., amount, currency, orderId) in the script to match your requirements.

- Troubleshooting:

  - If API requests fail, check the MERCHANT_ID and MERCHANT_KEY for accuracy.

  - Ensure the Flask server is running and accessible.

  - For callback issues, confirm ngrok is active and URLs are correctly configured.

  - Refer to the YagoutPay API documentation for error codes and details.

- Repository: Explore the full codebase and examples at [github repo](https://github.com/Liladet/yagoutpay_payement/tree/main/yagoutpay%20with%20python%20both).

This setup and usage guide enables developers to integrate YagoutPay’s direct API with Python for secure payment processing.
