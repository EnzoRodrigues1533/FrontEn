import mongoose from "mongoose";
import { Script } from "vm";

//IConstutor de um Obj do da Coleção do MongoDB _ Tarefas
const TodoSchema = new mongoose.Schema({
    titulo: {
        type: Script,
        required: [true, "O título é obrigatório"], // Adiciona mensagem de erro
        trim: true, //remove os espaços antes e depois
        maxlength: [100, "Max 100 char"] // mensagem de erro se>100char
    },
    concluida: {
        type: Boolean,
        default: false //O padrão é que sejá falso inicialmente
    },
    criadaEm: {
        type: Date,
        default: Date.now //Registra automaticamente a data de criação 
    }
});

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
//Cria um Modelo Todo Caso Já não Exista 
// se Modelos já existe usa o que Todo
// se não Existir cria um novo Schema para o Bando de Dados Chamado TodoSchema