## Stage 3: Setup

# YagoutPay Dynamic Payment Method: Setup

- This document provides a clear introduction and setup guide for integrating YagoutPay's dynamic payment links and static QR code payments using the Python SDK, as implemented in the repository at [CLICK HERE](https://github.com/Liladet/yagoutpay-static-and-dynamic-sdk).

## Dynamic Payment Link

- Generates a unique payment link for each transaction, allowing customers to complete payments via a customizable URL. The SDK sends encrypted payloads to the `/sdk/paymentByLinkResponse` endpoint.

## Static QR Code Payment

- Generates a reusable payment link and QR code details for fixed-amount payments, ideal for store displays, printed materials, or recurring payments. The SDK sends encrypted payloads to the `/sdk/staticQRPaymentResponse` endpoint and generates a QR code image locally.

# Introduction

# Dynamic Payment Link

The dynamic payment link method allows merchants to create a unique payment URL for each transaction. This is ideal for e-commerce platforms where customers need a tailored payment experience. The SDK constructs a payload with transaction details (e.g., amount, order ID, customer info), encrypts it, and sends it to the YagoutPay API, which returns a payment link for the customer to complete the transaction.

- Uses AES-256-CBC encryption with a merchant-provided key and static IV.
- Communicates with the YagoutPay test environment (`https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0`).
- Supports Ethiopian Birr (ETB) and Ethiopia (ETH) as the default currency and country.
- Handles success/failure callbacks via specified URLs.

# Static QR Code Payment

The static QR code payment method allows merchants to create a reusable payment link and QR code for fixed-amount transactions. This is ideal for physical stores, event tickets, or membership fees. The SDK constructs a payload with payment details (e.g., amount, brand name), encrypts it, sends it to the YagoutPay API, and generates a QR code image locally using the returned payment link.

- Uses AES-256-CBC encryption with a merchant-provided key and static IV.
- Communicates with the YagoutPay test environment (`https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0`).
- Supports Ethiopian Birr (ETB) and Ethiopia (ETH) as the default currency and country.
- Generates a QR code image locally using libraries like `qrcode` and `Pillow`.

# Setup

Follow these steps to set up the Python environment for dynamic and static payment methods.

# Prerequisites

- Python 3.8 or higher: Required for running the SDK.
- Git: To clone the repository.
- Terminal or Command Prompt: For executing commands.
- YagoutPay Credentials: Obtain `MERCHANT_ID` and `MERCHANT_KEY` from YagoutPay.
- ngrok: For testing dynamic payment callback URLs locally (install via `npm install -g ngrok` or download from https://ngrok.com/).

# Step-by-Step Setup

1. Clone the Repository

- Clone the YagoutPay payment integration repository:

```bash
git clone https://github.com/Liladet/yagoutpay-static-and-dynamic-sdk.git
```

- Navigate to the Python integration directory :

```bash
cd yagoutpay-static-and-dynamic-sdk
```

- run for dynamic

```bash
python app.py
```

- run for static

```bash
python static_link_sdk.py
```

2. Install Dependencies

- Install required Python packages:

```bash
pip install requests cryptography qrcode pillow
```

- requests: For making HTTP requests to the YagoutPay API.
- cryptography: For AES-256-CBC encryption and decryption.
- qrcode: For generating QR code images (static payments).
- pillow: For image processing (static payments).

3. Organize Project Structure

- Ensure the following files are in the project directory:
- constants.py: Defines constants like BASE_URL_TEST, DYNAMIC_LINK_ENDPOINT, STATIC_LINK_ENDPOINT, and AGGREGATOR_ID.
- encryption.py: Implements EncryptionUtils for AES-256-CBC encryption/decryption.
- dynamic_link_sdk.py: Contains the YagoutPaySDK class for dynamic link generation.
- static_link_sdk.py: Contains the script for static QR payment link and QR code generation.

4. Configure Credentials

- Update dynamic_link_sdk.py or static_link_sdk.py with your YagoutPay credentials:

```bash
# For dynamic payments
sdk = YagoutPaySDK(
    merchant_id="202508080001",
    encryption_key="IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo="
)
```

```bash
# For static payments (in static_link_sdk.py)
key_b64 = "IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo="  # Replace with your key
headers = {"Content-Type": "application/json", "me_id": "202508080001"}
```

- For local testing, set up callback URLs using ngrok:

- Run ngrok http 3000 to get a public URL (e.g., https://b1b88f72e1d8.ngrok-free.app).

- Update success_url and failure_url in the payload accordingly.
