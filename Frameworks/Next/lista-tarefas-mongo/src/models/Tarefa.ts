import mongoose, { Document, Model, Schema } from "mongoose";

//definir a estrutura do Obj
export interface Itarefa extends Document{
    //herdamos a base de documentos do mongoose
    //atributos do Obj
    _id:string;
    titulo:string;
    concluida:boolean;
    dataCriacao: Date;
}

//criar as Regras (Schema) do MongoDB
//construtor
const TarefaSchema: Schema<Itarefa> = new mongoose.Schema({
    titulo:{
        type: String,
        required:[true, "O título é obrigatório"],
        maxlength:[50, "máximo de 50 char"]
    },
    concluida:{
        type: Boolean,
        default: false
    },
    dataCriacao:{
        type: Date,
        default: Date.now
    }
})

//tomap e fromMap do modelo
const Tarefa: Model<Itarefa> = mongoose.models.Tarefa || mongoose.model<Itarefa>("Tarefa", TarefaSchema);

//transforma é um componente reutilizável
export default Tarefa;