//rotas que não precisa passar o ID (GET e POST)

import { createOrdemServico, getAllOrdemServico } from "@/controllers/OrdemServicoController";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    //verificar a sessão do usuário
    //se (sessão ativa e OrdemServico ==admin)
    // const session = await getServerSession(authOptions);
    // if(!session || session.user?.role !== "admin"){
    //     return NextResponse.json({success: false, error: "Não autorizado"})
    // }
    try {
        const data = await getAllOrdemServico();//chama o controlador
        return NextResponse.json({success:true, data:data});
    } catch (error) {
        return NextResponse.json({success:false,error:error});        
    }
}

export async function POST(req: NextRequest) { //req são os dados que estou enviando
    try {
        const data = await req.json();
        const newOrdemServico = await createOrdemServico(data);
        return NextResponse.json({success:true, data: newOrdemServico});
    } catch (error) {
        return NextResponse.json({success:false,error:error}); 
    }
}
