//array e Matrizes

//array
let numeros = [1,2,3,4,5,6,7,8,9]; //lista com elementos numéricos
console.log(numeros[8]);
let texto = ["cachorro", "bola", "sapato", "prédio"]; //texto
let mista = ["gato", 2, true]; 
console.log(texto[1]);
console.log(mista[2]);

//tamanho do array (length)

console.log(texto.length); //4

//adicionar elementos em um array ou alterar

// adicionar

//começo (unshift)
texto.unshift("pão");
console.log(texto);
//fim (push)
texto.push("jogo");
console.log(texto);
//remover do começo (shift)
texto.shift();
console.log(texto);
// remover do final (pop)
texto.pop();
console.log(texto);

//alteração de valor
texto[2] = "Tênis";
console.log(texto);

//percorrer um array (for // foreach)

for(let i = 0; i<numeros.length; i++){
    console.log("numeros["+i+"]="+numeros[i]);
}

//foreach
texto.forEach(x => {
    console.log(x)
});

let lista = [];
for(let i = 0; i<100; i++){
    lista[i]=i+1;
}
console.log(lista);

//retorna o indice
texto.indexOf("Tênis");

//splice (remover elemento de posição específica)
texto.splice(2,1); // posição , quantidade
console.log(texto);

//Operações Avançadas de Arrays

let valores = [10, 20, 30, 40, 50];

//map
let valoresDobro = valores.map(x => x*2);
console.log(valoresDobro);

//filter
let parteValores = valores.filter(x => x>20);
console.log(parteValores);

//filtro e map x<35 x*2
let parte2Valores = valores.filter(x=>x<35).map(x=>x*2);
console.log(parte2Valores);

//reduce
//x = acumulador, y = valor atual
let soma = valores.reduce((x,y)=>(x+y),0);

//sort

let z = [2,6,3,8,1,7,4,9,5];
z.sort();
console.log(z);
