import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDdHbYZPfymCZnGlVwO_2HrPZXigu82WT0",
    authDomain: "dieta-em-foco.firebaseapp.com",
    databaseURL: "https://dieta-em-foco-default-rtdb.firebaseio.com",
    projectId: "dieta-em-foco",
    storageBucket: "dieta-em-foco.appspot.com",
    messagingSenderId: "255987740158",
    appId: "1:255987740158:web:c347e8567c782f23bf24af",
    measurementId: "G-2YY2QNTGEM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Cadastro
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'index.html';
        })
        .catch(error => {
            alert('Erro no cadastro: ' + error.message);
        });
});

// Login
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = 'home.html';
        })
        .catch(() => {
            document.getElementById('loginError').style.display = 'block';
        });
});
