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

  toString = () => `${this._nome}, ${this._idade} anos, Cargo: ${this._cargo}, Salário: R$${this._salario.toFixed(2)}`;
}

let funcionarios = [];
let indexEdicao = -1;

const form = document.getElementById('formFuncionario');
const tabela = document.querySelector('#tabelaFuncionarios tbody');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const cargo = document.getElementById('cargo').value;
  const salario = document.getElementById('salario').value;

  const funcionario = new Funcionario(nome, idade, cargo, salario);

  if (indexEdicao === -1) {
    funcionarios.push(funcionario);
    alert("Funcionário cadastrado!");
  } else {
    funcionarios[indexEdicao] = funcionario;
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
    btnEditar.addEventListener('click', () => editarFuncionario(index));

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => excluirFuncionario(index));

    cellAcoes.appendChild(btnEditar);
    cellAcoes.appendChild(btnExcluir);
  });
};

const editarFuncionario = (index) => {
  const func = funcionarios[index];
  document.getElementById('nome').value = func.nome;
  document.getElementById('idade').value = func.idade;
  document.getElementById('cargo').value = func.cargo;
  document.getElementById('salario').value = func.salario;
  indexEdicao = index;
};

const excluirFuncionario = (index) => {
  if (confirm(`Deseja excluir ${funcionarios[index].nome}?`)) {
    funcionarios.splice(index, 1);
    renderTabela();
  }
};
