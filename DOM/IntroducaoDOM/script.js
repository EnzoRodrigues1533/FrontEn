// Manipulação de Html

// Exemplo de uso do DOM
function testeDOM() {
    document.getElementById("titulo").innerText = "Texto Alterado";
}


//Selecionando Elementos
//getElementById() -> variável simples
let titulo = document.getElementById("titulo");
console.log(titulo);

titulo.style.color = "blue";//mudando a cor para Azul

//getElementsbyClassName() -> vetor
let descricao = document.getElementsByClassName("descricao"); //vetor-> array
console.log(descricao);

descricao[1].style.fontWeight = "bold"; 
descricao[2].style.color = "green";

//getElementsbyTag() -> vetor
let tituloH3 = document.getElementsByTagName("h3");
tituloH3[0].style.color = "red";

//getElementsbyName() -> vetor


//querySelector -> Tag("tag") ; Class(".class"); ID("#id")
//querySelector -> variavel simples
let primeiroH1 = document.querySelector("h1");
primeiroH1.innerText = "Meu Teste de DOM";

//querySelectorAll -> vetor
let todoParagrafos = document.querySelectorAll("p");
todoParagrafos.forEach( x => 
    x.style.fontSize = "18px"
);

