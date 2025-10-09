//criar a solicitação de login do usuário http Request -> backend do login
//jwt -> vai gerar o token de autenticação

import { autenticaUsuario } from "@/controllers/UsuarioController";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

//verificar se o JWT está inserido no enviroment(variáveis de ambiente)

const JWT_SECRET = process.env.JWT_KEY;
//verifica se a chave esta no .env.local
if(!JWT_SECRET){
    throw new Error("JWT_KEY não está definida nas Variáveis de Ambiente");
}

// começa com o método de Autenticação 
export async function POST(req: NextRequest) { // pega as informações do HTML
    try {
        const {email , senha} = await req.json();//converte html -> json
        //validar os Dados obtidos da client-side
        if(!email || !senha) {
            return NextResponse.json({
                success: false, error: "Email e Senha são Obrigatórios"
            });
        }
        // constinuar validação
        const usuario = await autenticaUsuario(email, senha);
        //se não encontrou o usuário
        if(!usuario){
            return NextResponse.json({
                success: false, error: "Email ou Senha inválido"
            });
        }
        //continuo para gerar o token (JWT)
        // gerar o token permite acessar as páginas adiante
        const token = jwt.sign(
            {id: usuario._id, nome: usuario.nome, funcao: usuario.funcao},
            JWT_SECRET as string,
            {expiresIn: "1h"}
        );
        return NextResponse.json({
            success: true,
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                funcao: usuario.funcao
            }
        });

    } catch (error) {
        return NextResponse.json({success:false, error:error});
    }
    
}
