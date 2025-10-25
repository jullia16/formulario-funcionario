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

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const cargo = document.getElementById('cargo').value;
  const salario = document.getElementById('salario').value;

  if (indexEdicao === -1) {

    const funcionario = new Funcionario(nome, idade, cargo, salario);
    funcionarios.push(funcionario);
    alert("Funcionário cadastrado!");
  } else {

    funcionarios[indexEdicao].atualizarDados(nome, idade, cargo, salario);
    alert("Funcionário atualizado!");
    indexEdicao = -1;
  }

  form.reset();
  renderTabela();
});

