window.onload = function () {
    document.getElementById('signup').onclick = signup;
}

async function signup() {
    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // if (password.length >= 8) {
            const response = await fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json'
                
                }
            });

            if (response.status === 400) {
                const result = await response.json();
                document.getElementById('error').innerText = result.message;
            } else if (response.status === 201) {
                location.href = 'login.html'; // Redirect on successful registration
        } else {
            document.getElementById('error').innerText = 'Password must be at least 8 characters';
        }
    } catch (e) {
        console.log('Error occurred:', e);
    }
}
