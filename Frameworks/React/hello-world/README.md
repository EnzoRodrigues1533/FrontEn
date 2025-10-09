# criar um Diagrama de Arquitetura usando Mermaid

```mermaid

graph TD
    subgraph Interface["Navegador"]
        UI
    end

    subgraph Front/Back["React/Next"]
        FrontEnd
        BackEnd
    end

    subgraph Banco["MongoDB"]
        BD
    end

    %%fluxo
    UI-->FrontEnd
    FrontEnd-->BackEnd
    BackEnd-->BD
    BD-->BackEnd
    BackEnd-->FrontEnd
    FrontEnd-->UI

```

## Trabalhando com MongoDB

### meu Banco de Dados
use minhaLojaSESIA;

### criar um Obj em uma Coleção
db.produtos.insertOne(
    {
        nome: "Tablet 10",
        marca: "Multilaser",
        valor: 800.00,
        disponibilidade: true,
        especificacoes:{
            processador:"quadCore",
            ram: "8GB",
            armazenamento:"64GB"
        },
        cores:["Azul","Rosa","Cinza","Preto"]
    }
);

### listar produtos 
db.produtos.find();

### listar especifico

db.produtos.find({valor:{$lt:1000}});