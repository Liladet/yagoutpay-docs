# Testing

- Use sandbox endpoint: `https://uatcheckout.yagoutpay.com`.
- Test payments with 1.00 ETB.
- Use Postman or Swagger UI for API testing.
- Example curl:

```bash
curl -X POST https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/paymentRedirection/checksumGatewayPage \
-H "Content-Type: application/json" \
-d '{"merchantId": "202508080001", "merchantRequest": "encrypted_base64"}'
```
