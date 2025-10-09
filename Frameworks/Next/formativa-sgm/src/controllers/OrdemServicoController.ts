import OrdemServico, { IOrdemServico } from "@/models/OrdemServico";
import connectMongo from "@/services/mongodb"


//getAll
export const getAllOrdemServico = async() =>{
    await connectMongo();//estabelece conexão com o BD
    const ordemServicos = await OrdemServico.find([]); //listar todos os usuários da coleção
    return ordemServicos;
}

//getOne
export const getOneOrdemServico = async(id:string) => {
    await connectMongo();
    const ordemServico = await OrdemServico.findById(id); //listar o OrdemServico pelo ID
    return ordemServico;
}

//create
export const createOrdemServico = async(data: Partial<IOrdemServico>) =>{
    await connectMongo();
    const novoOrdemServico = new OrdemServico(data); //cria o usuário
    const novoOrdemServicoId = novoOrdemServico.save(); //salva o usuário no BD
    return novoOrdemServicoId;
}

//update
export const updateOrdemServico = async (id:string, data:Partial<IOrdemServico>) => {
    await connectMongo();
    const ordemServicoAtualizado = await OrdemServico.findByIdAndUpdate(id, data, {new:true});
    return ordemServicoAtualizado;    
}

//delete
export const deleteOrdemServico = async (id:string) =>{
    await connectMongo();
    await OrdemServico.findByIdAndDelete(id);
}