class Funcionario {
  constructor(nome, idade, cargo, salario) {
    this._nome = nome;
    this._idade = parseInt(idade);
    this._cargo = cargo;
    this._salario = parseFloat(salario);
  }

  get nome() { return this._nome; }
  set nome(valor) { this._nome = valor; }

  get idade() { return this._idade; }
  set idade(valor) { this._idade = parseInt(valor); }

  get cargo() { return this._cargo; }
  set cargo(valor) { this._cargo = valor; }

  get salario() { return this._salario; }
  set salario(valor) { this._salario = parseFloat(valor); }

  atualizarDados(nome, idade, cargo, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
  }

  toString = () => `${this._nome}, ${this._idade} anos, Cargo: ${this._cargo}, Salário: R$${this._salario.toFixed(2)}`;
}

let funcionarios = [];
let indexEdicao = -1;

const form = document.getElementById('formFuncionario');
const tabela = document.querySelector('#tabelaFuncionarios tbody');
const divRelatorios = document.getElementById('relatorios');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const cargo = document.getElementById('cargo').value;
  const salario = document.getElementById('salario').value;

  if (indexEdicao === -1) {
    funcionarios.push(new Funcionario(nome, idade, cargo, salario));
    alert("Funcionário cadastrado!");
  } else {
    funcionarios[indexEdicao].atualizarDados(nome, idade, cargo, salario);
    alert("Funcionário atualizado!");
    indexEdicao = -1;
  }

  form.reset();
  renderTabela();
});

const renderTabela = () => {
  tabela.innerHTML = '';
  funcionarios.forEach((func, index) => {
    const row = tabela.insertRow();

    row.insertCell(0).textContent = func.nome;
    row.insertCell(1).textContent = func.idade;
    row.insertCell(2).textContent = func.cargo;
    row.insertCell(3).textContent = func.salario.toFixed(2);

    const cellAcoes = row.insertCell(4);

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.onclick = function() {
      document.getElementById('nome').value = func.nome;
      document.getElementById('idade').value = func.idade;
      document.getElementById('cargo').value = func.cargo;
      document.getElementById('salario').value = func.salario;
      indexEdicao = index;
    };

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.onclick = function() {
      if (confirm(`Deseja excluir ${func.nome}?`)) {
        funcionarios.splice(index, 1);
        renderTabela();
      }
    };

    cellAcoes.appendChild(btnEditar);
    cellAcoes.appendChild(btnExcluir);
  });
};

document.getElementById('btnSalarioMaior5000').addEventListener('click', () => {
  const filtrados = funcionarios.filter(f => f.salario > 5000);
  exibirRelatorio("Funcionários com salário maior que R$5000:", filtrados.map(f => f.toString()));
});

document.getElementById('btnMediaSalarial').addEventListener('click', () => {
  if (funcionarios.length === 0) return exibirRelatorio("Média salarial:", ["Nenhum funcionário cadastrado"]);
  const media = funcionarios.reduce((soma, f) => soma + f.salario, 0) / funcionarios.length;
  exibirRelatorio("Média salarial:", [`R$ ${media.toFixed(2)}`]);
});

document.getElementById('btnCargosUnicos').addEventListener('click', () => {
  const cargos = funcionarios.map(f => f.cargo);
  const unicos = [...new Set(cargos)];
  exibirRelatorio("Cargos únicos:", unicos);
});

document.getElementById('btnNomesMaiusculo').addEventListener('click', () => {
  const nomesMaiusculo = funcionarios.map(f => f.nome.toUpperCase());
  exibirRelatorio("Nomes em maiúsculo:", nomesMaiusculo);
});

function exibirRelatorio(titulo, linhas) {
  divRelatorios.innerHTML = `<h4>${titulo}</h4>` + 
    (linhas.length > 0 ? `<ul>${linhas.map(l => `<li>${l}</li>`).join('')}</ul>` : "<p>Nenhum resultado encontrado.</p>");
}
