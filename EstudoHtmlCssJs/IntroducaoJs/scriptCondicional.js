let idade = 18;

//Exemplo If Else
if (idade >= 18) {
  console.log("Maior de idade");
} else {
  console.log("Menor de idade");
}

//Exemplo If Else Encadeado

var nota = 6.5

if (nota >= 7 ){
    console.log("Aluno Aprovado");
} else if (nota >= 5){
    console.log("Aluno de Recuperação");
} else {
    console.log("Aluno de Reprovado");
}

let dia = 3
switch (dia) {
  case 1:
    console.log("Domingo");
    break;
  case 2:
    console.log("Segunda");
    break;
  default:
    console.log("Outro Dia...")
    break;
}
