# Stage 1: Usage

This document outlines how to use the YagoutPay payment integration, which combines a Flask backend for secure payment processing and an optional React frontend for a user-friendly interface. The backend handles payload encryption and communicates with the YagoutPay gateway. The source code is available at [CLICK ME](https://github.com/Liladet/YagoutPay).

# Step-by-Step Usage

1. Access the Application

- Frontend (Optional): If using the React frontend, open your browser and navigate to http://localhost:3000 after starting the frontend server (npm start in the frontend directory). This displays the e-commerce interface where users can initiate payments.

- Backend Only: If testing the backend directly, access the payment endpoint at http://localhost:5000/pay after running the Flask server (python server.py in the backend directory).

2. Initiate a Payment

- On the frontend, click the payment button (e.g., "Pay Now") to trigger a payment request. This sends a request to the Flask backend.
- If using the backend directly, visiting http://localhost:5000/pay generates a payment form that auto-submits to the YagoutPay gateway.
- The backend constructs a payment payload using the generate_request function, which includes:
  - Transaction details (e.g., MERCHANT_ID, order_no, amount, currency).
  - Customer details (e.g., name, email, phone).
  - Other required fields (e.g., pg_details, card_details) as per YagoutPay's API.

3. Payload Encryption and Submission

- The Flask backend encrypts the payment payload using AES-256-CBC with the provided MERCHANT_KEY and IV (initialization vector).
- A SHA-256 checksum is generated for the critical fields (MERCHANT_ID, order_no, amount, ETH, ETB) and encrypted.
- The encrypted payload (merchant_request) and hash are sent to the YagoutPay gateway at https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/paymentRedirection/checksumGatewayPage via an auto-submitting HTML form.
- The form includes: - me_id: The merchant ID (e.g., 202508080001). - merchant_request: The AES-encrypted payload. - hash: The encrypted SHA-256 checksum.

4. Handle Success/Failure Callbacks

- After processing, YagoutPay redirects the user to the success or failure URL specified in the payload (e.g., https://b1b88f72e1d8.ngrok-free.app/yagoutpay/success or /failure).

- For local testing, use a tool like ngrok to create public URLs: - Run ngrok http 5000 in a terminal to expose your Flask server. - Update the success and failure URLs in the generate_request function with the ngrok-provided URLs.

- Implement callback routes in your Flask app (e.g., /yagoutpay/success and /yagoutpay/failure) to handle the response, log transaction details, or update your database.

- Check the YagoutPay response for status (e.g., "Success" or "Error") and statusMessage to determine the outcome.

# Additional Notes

- Testing: Use the YagoutPay UAT (User Acceptance Testing) environment for safe testing. Ensure MERCHANT_ID, MERCHANT_KEY, and AGGREGATOR_ID are correctly set in hosted_checkoutpay.py.
- Security: The backend uses pycryptodome for AES encryption and hashlib for SHA-256 checksums, ensuring secure data transmission.
- Customization: Modify the generate_request function to adjust payment details like amount, name, email, or phone as needed.

# Troubleshooting:

If the form doesn't submit, verify the Flask server is running and the /pay endpoint is accessible.

- For callback issues, ensure ngrok is running and URLs match those in the payload.
- Refer to the GitHub repository (https://github.com/Liladet/YagoutPay) for the latest code and examples.
