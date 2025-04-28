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
    document.getElementById('loginError').classList.remove('d-none');
  }
});

// Funções para cálculo da dieta
function calcularDieta() {
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const idade = parseInt(document.getElementById('idade').value);
  const genero = document.getElementById('genero').value;
  const atividade = document.getElementById('atividade').value;

  let tmb = genero === 'masculino'
    ? 10 * peso + 6.25 * altura - 5 * idade + 5
    : 10 * peso + 6.25 * altura - 5 * idade - 161;

  const fator = atividade === 'ativo' ? 1.75 : atividade === 'moderado' ? 1.55 : 1.2;
  const calorias = Math.round(tmb * fator);

  document.getElementById('perfilContainer').classList.add('d-none');
  document.getElementById('resultadoContainer').classList.remove('d-none');

  document.getElementById('resultadoDieta').innerText = `Meta diária: ${calorias} kcal`;

  gerarDieta(calorias);
}

function gerarDieta(calorias) {
  const cafe = calorias * 0.3;
  const almoco = calorias * 0.4;
  const jantar = calorias * 0.3;

  const objetivos = {
    "Perda de gordura": Math.round(calorias * 0.8),
    "Manutenção": calorias,
    "Ganho de massa": Math.round(calorias * 1.2)
  };

  const peso = parseFloat(document.getElementById('peso').value);
  const agua = (peso * 35).toFixed(0);

  function alimentosPara(refeicaoCal) {
    const lista = [
      { nome: "Pão integral", porcao: 30, kcal: 70 },
      { nome: "Ovo cozido", porcao: 50, kcal: 78 },
      { nome: "Iogurte natural", porcao: 170, kcal: 100 },
      { nome: "Banana", porcao: 118, kcal: 105 },
      { nome: "Aveia", porcao: 30, kcal: 117 },
      { nome: "Arroz integral", porcao: 100, kcal: 111 },
      { nome: "Feijão", porcao: 100, kcal: 77 },
      { nome: "Peito de frango", porcao: 150, kcal: 248 },
      { nome: "Salada verde", porcao: 100, kcal: 30 },
      { nome: "Brócolis cozidos", porcao: 100, kcal: 55 },
      { nome: "Batata-doce", porcao: 100, kcal: 86 }
    ];

    let resultado = "<ul class='list-unstyled'>";
    let total = 0;

    for (let item of lista) {
      const porcoes = Math.floor(refeicaoCal / item.kcal);
      const kcalTotal = porcoes * item.kcal;
      const qtdTotal = porcoes * item.porcao;
      if (porcoes > 0 && total + kcalTotal <= refeicaoCal) {
        resultado += `<li>${item.nome}: ${qtdTotal}g (${kcalTotal} kcal)</li>`;
        total += kcalTotal;
      }
    }

    resultado += `</ul><p><strong>Total da refeição:</strong> ${total} kcal</p>`;
    return resultado;
  }

  let detalhes = `
    <p><strong>Meta para perda de gordura:</strong> ${objetivos["Perda de gordura"]} kcal</p>
    <p><strong>Meta para manter peso:</strong> ${objetivos["Manutenção"]} kcal</p>
    <p><strong>Meta para ganho de massa:</strong> ${objetivos["Ganho de massa"]} kcal</p>
    <p><strong>Água recomendada:</strong> ${agua} ml/dia</p>
  `;

  document.getElementById('dietaDetalhada').innerHTML = `
    ${detalhes}
    <h3>Café da Manhã</h3>
    ${alimentosPara(cafe)}
    <h3>Almoço</h3>
    ${alimentosPara(almoco)}
    <h3>Jantar</h3>
    ${alimentosPara(jantar)}
  `;
}
