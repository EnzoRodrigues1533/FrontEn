import Equipamento, { IEquipamento } from "@/models/Equipamento";
import connectMongo from "@/services/mongodb"


//getAll
export const getAllEquipamento = async() =>{
    await connectMongo();//estabelece conexão com o BD
    const equipamentos = await Equipamento.find([]); //listar todos os usuários da coleção
    return equipamentos;
}

//getOne
export const getOneEquipamento = async(id:string) => {
    await connectMongo();
    const equipamento = await Equipamento.findById(id); //listar o Equipamento pelo ID
    return equipamento;
}

//create
export const createEquipamento = async(data: Partial<IEquipamento>) =>{
    await connectMongo();
    const novoEquipamento = new Equipamento(data); //cria o usuário
    const novoEquipamentoId = novoEquipamento.save(); //salva o usuário no BD
    return novoEquipamentoId;
}

//update
export const updateEquipamento = async (id:string, data:Partial<IEquipamento>) => {
    await connectMongo();
    const equipamentoAtualizado = await Equipamento.findByIdAndUpdate(id, data, {new:true});
    return equipamentoAtualizado;    
}

//delete
export const deleteEquipamento = async (id:string) =>{
    await connectMongo();
    await Equipamento.findByIdAndDelete(id);
}