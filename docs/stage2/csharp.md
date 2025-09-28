## YagoutPay C# Integration: Setup and Usage

This document provides detailed instructions for setting up and using the YagoutPay direct API integration for C#, the repository available at [CLICK ME](https://github.com/Liladet/yagoutpay_payement). The integration uses AES-256-CBC encryption to secure payment payloads and communicates with the YagoutPay gateway via the /othersRedirection/encryption and /apiRedirection/apiIntegration endpoints. The encryption process and output formats are consistent across all platforms, with differences only in the setup and execution steps.

# Prerequisites

- For all integrations:

  - C#: .NET SDK (e.g., .NET 6.0 or higher)
  - Git: To clone the repository.
  - Terminal or Command Prompt: For executing commands.
  - YagoutPay Credentials: Obtain MERCHANT_ID, MERCHANT_KEY, and IV from YagoutPay.
  - ngrok: For testing callback URLs locally (install via npm install -g ngrok or download from https://ngrok.com/).
  - SSL/TLS: Ensure secure connections for production; ngrok provides HTTPS for local testing.

- For full code for hosted checkout page using C# [CLICK HERE](https://github.com/Liladet/yagoutpay_payement/tree/main/yagoutpay%20with%20laravel%20hosted%20checkout)

- For full code for direct api integretion using C# [CLICK HERE](https://github.com/Liladet/yagoutpay_payement/tree/main/yagoutpay%20with%20c%23%20direct%20api)

# Setup

1. Clone the Repository

- Clone the repository:

```bash
git clone https://github.com/Liladet/yagoutpay_payement.git
```

- Navigate to the C# integration directory (e.g., yagoutpay with csharp):

```bash
cd yagoutpay_payement/yagoutpay with c# direct api
```

2. Create or Use an MVC Project

- If starting fresh, create a new MVC project:

```bash
dotnet new mvc -n YagoutPayIntegration
cd YagoutPayIntegration
```

- Add required NuGet packages:

```bash
dotnet add package System.Security.Cryptography
dotnet add package Newtonsoft.Json
dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson
```

3. Configure Settings

- Update appsettings.json:

```bash
{
  "YagoutPay": {
    "MerchantId": "202508080001",
    "EncryptionKey": "IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=",
    "IV": "0123456789abcdef",
    "ApiUrl": "https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0"}
}
```

- Configure ngrok for callback URLs.

4. Run the Server

- Start the application:

```bash
dotnet run
```

- The server runs on http://localhost:5273.

# Usage

1. Initiate a Payment

- Access the payment endpoint (e.g., http://localhost:5273/api/hostedcheckout/test).

- Construct a payload in a controller:

```bash
var payload = new
{
    amount = 100,
    currency = "ETB",
    orderId = "ORDER_" + DateTime.Now.Ticks
};
```

2. Encrypt the Payload

- Use System.Security.Cryptography:

```bash
using System.Security.Cryptography;
public string EncryptAES(string plaintext, string key, string iv)
{
    using var aes = Aes.Create();
    aes.Key = Convert.FromBase64String(key);
    aes.IV = Encoding.UTF8.GetBytes(iv);
    using var encryptor = aes.CreateEncryptor();
    byte[] input = Encoding.UTF8.GetBytes(plaintext);
    byte[] encrypted = encryptor.TransformFinalBlock(input, 0, input.Length);
    return Convert.ToBase64String(encrypted);
}
```

- Send to the encryption endpoint using HttpClient.

3. Process the Payment

- Send the encrypted payload to the payment endpoint and handle the response.

4. Handle Callbacks

- Define routes in Controllers/PaymentController.cs for success/failure handling.

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
