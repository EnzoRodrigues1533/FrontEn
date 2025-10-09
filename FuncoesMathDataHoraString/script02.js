let texto = "Aula de JavaScript";

// contagem dos caracteres (length)
console.log(texto.length); // 18

//Maiúsculas e Minúsculas
console.log(texto.toUpperCase());// MAIÚSCULA
console.log(texto.toLowerCase());// minúscula

// Partes da String
console.log(texto.substring(0,4));
console.log(texto.slice(-10));

//substituição de texto
let novoTexto = texto.replace("Java","Type");
console.log(novoTexto);

//trim (tesoura)
let textoEspaco = "  JavaScript  ";
let textoCortado = textoEspaco.trim();
console.log(textoEspaco);
console.log(textoCortado);

//split (separação)

let linguagens = "JavaScript, Python, PHP, C++, Java";
let linguagensArray = linguagens.split(", ");
console.log(linguagens);
console.log(linguagensArray);
