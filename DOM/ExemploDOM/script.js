// Exemplo de uso do DOM
//header -> DOM
let header = document.createElement("div");
document.body.appendChild(header);
header.style.backgroundColor = "black";
header.style.height = "8vh";
let menu = document.createElement("div");
header.appendChild(menu);
header.classList.add("header");
menu.classList.add("menu");
let menuItens = ["Início", "Produtos", "Contato"];
menuItens.forEach(element => {
    let item = document.createElement("a");
    item.innerText = element; 
    menu.appendChild(item);   
});


// Footer -> DOM



