//Indicar que é um componente do Cliente Side 
"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tarefas:any[], setTarefas] = useState([]); //manipulador da lista de tarefas
  const [newTarefa, setNewTarefa] = useState(""); //manipulador do Input do Formulário

  //useEffect
  useEffect(()=> {fetchTarefas();},[]);
  //UseEffect para preencher as lista de tarefas enquanto carrega a página
  

  //método para pegar todas as tarefas da coleção  no MOngoDB
  const fetchTarefas = async () =>{
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTarefas(data.data);
  }

  async function addTarefa() {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({title: newTarefa})
    });
    const data = await response.json();
    setTarefas([...tarefas, data.data]);
    setNewTarefa("");
  }


}
