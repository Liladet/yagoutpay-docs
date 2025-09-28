## YagoutPay laravel Integration: Setup and Usage

This document provides detailed instructions for setting up and using the YagoutPay direct API integration for laravel, the full code availabble at [CLICK ME](https://github.com/Liladet/yagoutpay_payement). The integration uses AES-256-CBC encryption to secure payment payloads and communicates with the YagoutPay gateway via the /othersRedirection/encryption and /apiRedirection/apiIntegration endpoints. The encryption process and output formats are consistent across all platforms, with differences only in the setup and execution steps.

# Prerequisites

- For all integrations:

  - Laravel: PHP 8.0 or higher, Composer, Laravel 10.0 or higher,
  - Git: To clone the repository,
  - Terminal or Command Prompt: For executing commands,
  - YagoutPay Credentials: Obtain MERCHANT_ID, MERCHANT_KEY, and IV from YagoutPay,
  - ngrok: For testing callback URLs locally (install via npm install -g ngrok or download from https://ngrok.com/),
  - SSL/TLS: Ensure secure connections for production; ngrok provides HTTPS for local testing.

- For full code for hosted checkout page using laravel [CLICK HERE](https://github.com/Liladet/yagoutpay_payement/tree/main/yagoutpay%20with%20laravel%20hosted%20checkout)

- For full code for direct api integretion using laravel [CLICK HERE](https://github.com/Liladet/yagoutpay_payement/tree/main/yagoutpay%20with%20laravel%20direct%20api)

# Setup

1. Clone the Repository

- Clone the repository:

```bash
git clone https://github.com/Liladet/yagoutpay_payement.git
```

- Navigate to the Laravel integration directory (e.g., yagoutpay with laravel):

```bash
cd yagoutpay_payement/yagoutpay with laravel direct api
```

2. Install Dependencies

- Ensure Composer is installed (https://getcomposer.org/).

- Install Laravel dependencies:

```bash
composer install
```

- Install the guzzlehttp/guzzle package for HTTP requests:

```bash
composer require guzzlehttp/guzzle
```

3. Configure Environment Variables

- Copy .env.example to .env:

```bash
cp .env.example .env
```

- Update .env with YagoutPay credentials:

```bash
YAGOUT_MERCHANT_ID=202508080001
YAGOUT_MERCHANT_KEY=IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=
YAGOUT_IV=0123456789abcdef
YAGOUT_PAYMENT_URL=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0
YAGOUT_SUCCESS_URL=https://b1b88f72e1d8.ngrok-free.app/payment/success
YAGOUT_FAILURE_URL=https://b1b88f72e1d8.ngrok-free.app/payment/failure
```

- Generate an application key:

```bash
php artisan key:generate
```

4. Run the Server

- Start the Laravel development server:

```bash
php artisan serve
```

- The server runs on http://localhost:8000.

# Usage

1. Initiate a Payment

- Access the payment route (e.g., http://localhost:8000/pay) or integrate with a Blade template.

- Construct a payload in a controller:

```bash
$payload = json*encode([
'amount' => 100,
'currency' => 'ETB',
'orderId' => 'ORDER*' . time(),
]);
```

2. Encrypt the Payload

- Use PHP’s openssl_encrypt for AES-256-CBC:

```bash
use Illuminate\Support\Facades\Crypt;
function encryptAES($plaintext, $key, $iv) {
    return base64_encode(openssl_encrypt(
        $plaintext, 'aes-256-cbc', base64_decode($key), OPENSSL_RAW_DATA, $iv
));
}
```

- Send to the encryption endpoint using Guzzle:

```bash
use GuzzleHttp\Client;
$client = new Client();
$response = $client->post('https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/othersRedirection/encryption', [
    'json' => ['data' => $payload]
]);
$encrypted = json_decode($response->getBody())->encrypted;
```

4. Process the Payment

- Send the encrypted payload:

```bash
$client->post('https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration', [
'json' => [
'merchantId' => env('YAGOUT_MERCHANT_ID'),
'merchantRequest' => $encrypted
]
]);
```

- Handle the response as shown above.

4. Handle Callbacks

- Define routes in routes/web.php:

```bash
Route::get('/payment/success', PaymentController::class, 'success');
Route::get('/payment/failure', PaymentController::class, 'failure');
```

- Implement callback logic in PaymentController.

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
