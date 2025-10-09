//Lista de Taferas (ToDoList)

// dispara o evento
document.getElementById("btnAdicionar").addEventListener("click",criarTarefa);

function criarTarefa(){
    let input = document.getElementById("tarefa");
    let texto = input.value.trim();//remove os espaços antes e depois do texto
    //verificar se a tafera não esta vazia
    if(texto===""){
        return;
    }
    //se não vazio
    let li = document.createElement("li");
    li.innerHTML = texto+'<button onclick="removerTarefa(this)">Remover</button>';
    //adicionar o li -> ul
    let ul = document.getElementById("lista");//pega a lista
    ul.appendChild(li);//adiciona o li a ul

    input.value = ""; //limpa  campo do input

}

function removerTarefa(botao){
    botao.parentElement.remove();
}
