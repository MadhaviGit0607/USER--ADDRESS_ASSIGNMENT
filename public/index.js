let Formel=document.getElementById('registrationForm');
Formel.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, address })
        });

        if (response.ok) {
            alert('User registered successfully!');
            document.getElementById('registrationForm').reset();
        } else {
            alert('Registration failed.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred.');
    }
});
