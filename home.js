let generatedOTP = '';

document.getElementById('sendBtn').addEventListener('click', sendOTP);
document.getElementById('verifyBtn').addEventListener('click', verifyOTP);

function sendOTP() {
    const phone = document.getElementById('phone').value.trim();
    
    if (phone.length !== 10 || isNaN(phone)) {
        showMessage('Valid 10 digit mobile number එකක් දාන්න!', 'error');
        return;
    }

    // Random 6-digit OTP generate
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    
    console.log('Your Demo OTP is: ' + generatedOTP);
    showMessage('OTP sent! (Demo OTP: ' + generatedOTP + ')', 'success');

    // Switch to OTP section
    document.getElementById('phoneSection').style.display = 'none';
    document.getElementById('otpSection').style.display = 'block';

    // Focus first OTP box
    document.querySelector('.otp-digit').focus();

    // Auto move to next input
    setupOTPInputs();
}

function setupOTPInputs() {
    const inputs = document.querySelectorAll('.otp-digit');
    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value === '' && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });
}

function verifyOTP() {
    const inputs = document.querySelectorAll('.otp-digit');
    let enteredOTP = '';
    inputs.forEach(input => {
        enteredOTP += input.value;
    });

    if (enteredOTP.length !== 6) {
        showMessage('සියලුම digits 6ම පුරවන්න!', 'error');
        return;
    }

    if (enteredOTP === generatedOTP) {
        showMessage('Authentication Successful! 🎉', 'success');
    } else {
        showMessage('Wrong OTP! නැවත try කරන්න.', 'error');
        inputs.forEach(input => input.value = '');
        inputs[0].focus();
    }
}

function showMessage(text, type) {
    const msg = document.getElementById('message');
    msg.textContent = text;
    msg.className = 'message ' + type;
}