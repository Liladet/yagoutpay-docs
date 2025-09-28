## YagoutPay nodejs Integration: Setup and Usage

This document provides detailed instructions for setting up and using the YagoutPay direct API integration for Node.js,the repository available at [CLICK ME](https://github.com/Liladet/yagoutpay_payement). The integration uses AES-256-CBC encryption to secure payment payloads and communicates with the YagoutPay gateway via the /othersRedirection/encryption and /apiRedirection/apiIntegration endpoints. The encryption process and output formats are consistent across all platforms, with differences only in the setup and execution steps.

# Prerequisites

- Node.js: Node.js 16 or higher, npm.
- Git: To clone the repository.
- Terminal or Command Prompt: For executing commands.
- YagoutPay Credentials: Obtain MERCHANT_ID, MERCHANT_KEY, and IV from YagoutPay.
- ngrok: For testing callback URLs locally (install via npm install -g ngrok or download from https://ngrok.com/).
- SSL/TLS: Ensure secure connections for production; ngrok provides HTTPS for local testing.

- For full code for hosted checkout page using node.js [CLICK HERE](https://github.com/Liladet/yagoutpay_payement/tree/main/yagoutpay%20with%20node%20hosted%20checkout)

- For full code for direct api integretion using node.js [CLICK HERE](https://github.com/Liladet/yagoutpay_payement/tree/main/yagoutpay%20with%20node%20direct%20api)

# Setup

1. Clone the Repository

- Clone the YagoutPay payment integration repository:

```bash
git clone https://github.com/Liladet/yagoutpay_payement.git
```

- Navigate to the Node.js integration directory (e.g., yagoutpay with nodejs):

```bash
cd yagoutpay_payement/yagoutpay with node direct api
```

2. Install Dependencies

- Install required Node.js packages:

```bash
npm install express axios crypto body-parser dotenv
```

This installs:

- express: For the web server.
- axios: For making HTTP requests to the YagoutPay API.
- crypto: For AES-256-CBC encryption.
- body-parser: For parsing JSON requests.
- dotenv: For environment variable management.

3. Configure Environment Variables

- Create a .env file in the Node.js directory:

```bash
PORT=3000
MERCHANT_ID=202508080001
ENCRYPTION_KEY=IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=
IV=0123456789abcdef
API_URL=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0
NODE_ENV=development
```

- Replace MERCHANT_ID, ENCRYPTION_KEY, and IV with your YagoutPay credentials.
- Update API_URL if using a different endpoint.
- For callback URLs, run ngrok http 3000 to get a public URL (e.g., https://b1b88f72e1d8.ngrok-free.app) and configure success/failure URLs in your code.

4. Run the Server

- Start the development server:

```bash
npm run dev
```

- Or start the production server:

```bash
npm start
```

- The server runs on http://localhost:3000 by default.

# Usage

1. Initiate a Payment

- Access the payment endpoint (e.g., http://localhost:3000/pay) via a browser or a frontend application.
- The Express server constructs a JSON payload:

```bash
{
  "amount": 100,
  "currency": "ETB",
  "orderId": "123"
}
```

2. Encrypt the Payload

- The server encrypts the payload using AES-256-CBC with the crypto module:

```bash
const crypto = require('crypto');
function encryptAES(plaintext, key, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'base64'), Buffer.from(iv));
  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}
```

- Send the payload to the encryption endpoint:

```bash
POST https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/othersRedirection/encryption
Content-Type: application/json
{
  "data": "{\"amount\": 100, \"currency\": \"ETB\", \"orderId\": \"123\"}"
}
```

- Receive the encrypted field (base64-encoded string).

3. Process the Payment

- Send the encrypted payload to the payment endpoint:

```bash
POST https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration
Content-Type: application/json
{
  "merchantId": "202508080001",
  "merchantRequest": "base64_encrypted_from_previous_step"
}
```

- Handle the response:

```bash
{
  "status": "Success",
  "statusMessage": "No Error",
  "response": "encrypted_response_base64"
}
```

4. Handle Callbacks

- Implement routes for success/failure callbacks (e.g., /payment/success, /payment/failure).
- Use ngrok for local testing to receive callbacks.
- Verify the response for status and statusMessage.

# Common Notes

- Encryption: All platforms use AES-256-CBC with the same MERCHANT_KEY and IV. The output is a base64-encoded string.

# API Flow:

- Encrypt payload at /othersRedirection/encryption.
- Process payment at /apiRedirection/apiIntegration.
- Response format:

```bash
{
    "status": "Success", "statusMessage": "No Error", "response": "encrypted_response_base64"
}
```

- Testing: Use the YagoutPay UAT environment. Test with small amounts (e.g., 1.00 ETB).

# Troubleshooting:

- Verify credentials and URLs.
- Ensure ngrok is running for callbacks.
- Check server logs for errors.
- Repository: Refer to [reference](https://github.com/Liladet/yagoutpay_payement) for code examples.
