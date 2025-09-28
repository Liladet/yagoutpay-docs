# Stage 1: Setup

## Prerequisites

- Python 3.8 or higher: Required for running the backend server.
- Node.js 16 or higher: Required if setting up the frontend (React-based).
- Git: For cloning the repository.
- A code editor like VS Code (optional but recommended).
- Access to a terminal or command prompt.

This setup is based on the YagoutPay integration repository available at [CLICK ME](https://github.com/Liladet/YagoutPay). The backend uses Flask for handling payment requests with AES encryption, as seen in the provided Python code

## Step 1: Cloning the Repository

1. Open your terminal or command prompt.

2. Clone the repository by running the following command:

```bash

git clone https://github.com/Liladet/YagoutPay.git

```

This will download the entire project to your local machine.

3. Navigate into the project directory:

```bash
cd YagoutPay
```

Here, you'll find folders like backend for the Python server and frontend for the React application.

# Step 2: Backend Setup

The backend is a Flask application that handles payment requests, encrypts data using AES-256, generates checksums with SHA-256, and submits forms to the YagoutPay gateway. It requires specific Python packages like Flask and pycryptodome.

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment to isolate dependencies:

```bash
python -m venv venv
```

This creates a folder named venv where Python packages will be installed without affecting your global Python installation.

3. Activate the virtual environment:
   On Linux/Mac:

```bash
source venv/bin/activate
```

On Windows:

```bash
venv\Scripts\activate
```

Once activated, your terminal prompt will change to indicate the virtual environment is active.

4. Install the required dependencies:

```bash
pip install -r requirements.txt
```

This command installs packages listed in requirements.txt, which should include flask, pycryptodome (for AES encryption), and others like hashlib (standard library). If requirements.txt is missing or incomplete, you can manually install:

```bash
pip install flask pycryptodome
```

5. Configure the backend script:

- Open the Python file (e.g., server.py or hosted_checkoutpay.py) in your code editor.
- Update constants like MERCHANT_ID, MERCHANT_KEY, IV, AGGREGATOR_ID, and URL with your actual YagoutPay credentials.
- Customize the success and failure URLs (e.g., using ngrok for local testing: run ngrok http 5000 in a separate terminal and copy the forwarded URL).
- Ensure the generate_request function matches your payment details (amount, name, email, phone).

6. Run the backend server:

```bash
python server.py
```

7. The server will start on http://localhost:5000.
8. Access the payment route at /pay to test the form submission.
9. In debug mode, it will auto-reload on code changes. Press Ctrl+C to stop.

# Step 3: Frontend Setup (Optional, for Full Application)

If you're setting up the full e-commerce platform:

1. From the project root, navigate to the frontend directory:

```bash
cd frontend
```

2. Install Node.js dependencies:

```bash
npm install
```

3. Install and configure TailwindCSS (if not already set up):

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. Start the frontend development server:

```bash
npm start
```

The React app will run on http://localhost:3000.

It integrates with the backend for payment processing.

# Step 4: Testing the Integration

1. Ensure both backend and frontend (if used) are running.

2. Use ngrok for public URLs if testing callbacks:

   - Install ngrok if needed: npm install -g ngrok or download from https://ngrok.com/.

   - Run ngrok http 5000 and update success/failure URLs in the Python code.

3. Visit the payment endpoint (e.g., http://localhost:5000/pay) to trigger the YagoutPay form.

4. Monitor the console for any errors and verify encryption/hash generation.

# Troubleshooting

- If you encounter import errors, ensure all packages are installed in the virtual environment.
- For encryption issues, verify the MERCHANT_KEY and IV are correctly base64-decoded.
- Check the YagoutPay documentation for API specifics.
- If the repo structure differs, refer to the latest on https://github.com/Liladet/YagoutPay.

This setup enables secure payment processing with YagoutPay using the hosted checkout method.
