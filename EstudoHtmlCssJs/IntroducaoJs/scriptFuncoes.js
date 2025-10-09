//npm install -g prompt-sync
const prompt = require("prompt-sync")(); // Importa o pacote

function saudacao(nome) {
  return "Olá, " + nome + "!";
}
let nome = prompt("Informe seu Nome");
console.log(saudacao(nome));
