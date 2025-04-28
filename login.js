// Cadastro
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    localStorage.setItem('user', JSON.stringify({ username, email, password }));

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'index.html';
});

// Login
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === email && user.password === password) {
        window.location.href = 'home.html';
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
});
