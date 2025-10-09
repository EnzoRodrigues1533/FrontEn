// Parte 1 - Exibir no console

let titulo = document.getElementById("titulo");
let paragrafo = document.querySelector(".paragrafo");

console.log(titulo);
console.log(paragrafo);

//parte 2 - Modificar Elemento 

function mudarTexto() {
    titulo.innerText = "Novo Título";
    paragrafo.innerText = "Novo Parágrafo";
}

//parte 3 - Modificar Estilo

function mudarFundo(){
    let body = document.querySelector("body");
    body.style.backgroundColor = "blue";
}

// parte 4 - Adicionar um classe ao elemento

function adicionarClasse(){
    titulo.classList.add("descricao");
    document.querySelector(".descricao").style.color = "red";
}