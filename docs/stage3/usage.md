## Stage 3: Usage

# YagoutPay Static and Dynamic Payment Methods: Usage

This document provides a clear usage guide for integrating YagoutPay's dynamic and static payment methods using the Python SDK, as implemented in the repository at [CLICK HERE](https://github.com/Liladet/yagoutpay-static-and-dynamic-sdk).

- This section explains how to use the Python SDK for dynamic payment links and static QR code payments.

## Dynamic Payment Link

1. Prepare the Payload

- Create a payload with required fields (as shown in dynamic_link_sdk.py):

```bash
dynamic_payload =
{
    "req_user_id": "yagou381",
    "me_id": "202508080001",
    "amount": "500",
    "customer_email": "test@example.com",
    "mobile_no": "0909260339",
    "expiry_date": "2025-10-23",
    "media_type": ["API"],
    "order_id": f"DYN_{datetime.now().strftime('%Y%m%d_%H%M')}",
    "first_name": "YagoutPay",
    "last_name": "DynamicLink",
    "product": "Premium Subscription",
    "dial_code": "+251",
    "failure_url": "http://localhost:3000/failure",
    "success_url": "http://localhost:3000/success",
    "country": "ETH",
    "currency": "ETB"
}
```

2. Generate the Payment Link

- Use the YagoutPaySDK class to create a dynamic link:

```bash
from dynamic_link_sdk import YagoutPaySDK
sdk = YagoutPaySDK("202508080001", "IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=")
response = sdk.create_dynamic_link(dynamic_payload)
print(response)  # Example: {"status": "success", "link": "<payment_url>"}
```

- The SDK:
- Validates required fields and expiry date (within 30 days).
- Encrypts the payload using AES-256-CBC.
- Sends a POST request to /sdk/paymentByLinkResponse.
- Decrypts the response and extracts the payment link.

3. Handle the Response

- If successful, the response contains a link field with the payment URL.
- If an error occurs, check the message field (e.g., "Missing required payload fields").
- Share the payment link with the customer (e.g., via email or redirect).

4. Process Callbacks

- Use ngrok to expose the server (ngrok http 3000) and update URLs in the payload.

## Static QR Code Payment

![click](image.png)

1. Prepare the Payload

- Create a payload with required fields (as shown in static_link_sdk.py).

2. Generate the Static Payment Link and QR Code

- Use the static_link_sdk.py script to create a static payment link and generate a QR code image.

- The script:

  - Encrypts the payload using AES-256-CBC with a static IV (0123456789abcdef).
  - Sends a POST request to /sdk/staticQRPaymentResponse.
  - Decrypts the response to extract the staticLink and qrId.
  - Generates a QR code image encoding the staticLink and saves it (e.g., payment_qr_6495373221.png).

- Handle the Response

  - If successful, the response contains a staticLink (payment URL) and qrId (QR code identifier).
  - The QR code image is saved locally with a filename based on the qrId.
  - If an error occurs, check the errorMessage or sysErrorMessage fields (e.g., "Invalid encrypted payload").
  - Share the QR code image or staticLink with customers via SMS, email, or physical displays.

Use the generated QR code image (e.g., payment_qr_6495373221.png) for physical displays or digital sharing.

# Additional Notes

- Encryption: Both dynamic and static methods use AES-256-CBC with a 32-byte key and static IV (0123456789abcdef), as implemented in encryption.py or inline in static_link_sdk.py.

- API Endpoints:

  - Dynamic: /sdk/paymentByLinkResponse
  - Static: /sdk/staticQRPaymentResponse

- Testing:
- Test with small amounts (e.g., 1.00 ETB).
- Disable SSL verification (verify=False) for local testing only; enable in production.

- Troubleshooting:
- Ensure MERCHANT_ID and MERCHANT_KEY are valid.
- Check payload fields for completeness.
- Verify ngrok URLs for callbacks.
- Debug API responses using print statements or logging.

- Repository: Refer to [CLICK HERE](https://github.com/Liladet/yagoutpay-static-and-dynamic-sdk) for the latest code and examples.

This guide enables developers to set up and use YagoutPay’s dynamic and static payment methods with Python for secure and flexible payment processing.
