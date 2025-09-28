# Stage 3: Setup

## YagoutPay Dynamic Payment Method: Setup

- This document provides a clear introduction and setup guide for integrating YagoutPay's dynamic payment method using the Python SDK, as implemented in the repository at [CLICK HERE](https://github.com/Liladet/yagoutpay-dynamic-payment-method).

# Dynamic Payment Link :

- Generates a unique payment link for each transaction, allowing customers to complete payments via a customizable URL. The SDK sends encrypted payloads to the /sdk/paymentByLinkResponse endpoint.

## Introduction

# Dynamic Payment Link

- The dynamic payment link method allows merchants to create a unique payment URL for each transaction. This is ideal for e-commerce platforms where customers need a tailored payment experience. The SDK constructs a payload with transaction details (e.g., amount, order ID, customer info), encrypts it, and sends it to the YagoutPay API, which returns a payment link for the customer to complete the transaction.

- Use AES-256-CBC encryption with a merchant-provided key and static IV.
- Communicate with the YagoutPay test environment (https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0).
- Support Ethiopian Birr (ETB) and Ethiopia (ETH) as the default currency and country.
- Handle success/failure callbacks via specified URLs.

# Setup

- Follow these steps to set up the Python environment for dynamic payment methods.

# Prerequisites

- Python 3.8 or higher: Required for running the SDK.
- Git: To clone the repository.
- Terminal or Command Prompt: For executing commands.
- YagoutPay Credentials: Obtain MERCHANT_ID and MERCHANT_KEY from YagoutPay.
- ngrok: For testing callback URLs locally (install via npm install -g ngrok or download from https://ngrok.com/).

# Step-by-Step Setup

1. Clone the Repository

- Clone the YagoutPay payment integration repository:

```bash
git clone https://github.com/Liladet/yagoutpay-dynamic-payment-method.git
```

- Navigate to the Python integration directory :

```bash
cd yagoutpay-dynamic-payment-method
```

- run

```bash
python app.py
```

2. Install Dependencies

- Install required Python packages:

```bash
pip install requests cryptography
```

- requests: For making HTTP requests to the YagoutPay API.
- cryptography: For AES-256-CBC encryption and decryption.

3. Organize Project Structure

- Ensure the following files are in the project directory
- constants.py: Defines constants like BASE_URL_TEST, DYNAMIC_LINK_ENDPOINT, STATIC_LINK_ENDPOINT, and AGGREGATOR_ID.
- encryption.py: Implements EncryptionUtils for AES-256-CBC encryption/decryption.
- dynamic_link_sdk.py: Contains the YagoutPaySDK class for dynamic link generation .

4. Configure Credentials

- Update dynamic_link_sdk.py with your YagoutPay credentials:

```bash
sdk = YagoutPaySDK(
    merchant_id="202508080001",
    encryption_key="IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo="
)
```

- For local testing, set up callback URLs using ngrok:

- Run ngrok http 3000 to get a public URL (e.g., https://b1b88f72e1d8.ngrok-free.app).

- Update success_url and failure_url in the payload accordingly.
