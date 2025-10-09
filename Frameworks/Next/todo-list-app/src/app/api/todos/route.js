//criar as funções GEt e POST para a api de Tarefas
import connectMongo from "@/services/mongodb";
import Todo from "@/models/Todo";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongo();
        const tarefas = await Todo.find({});
        return NextResponse.json({success: true, data: tarefas});
    } catch (err) {
        return NextResponse.json({success: false}, {status: 500});
    }
}

export async function POST(req) {
    try {
        await connectMongo();
        const data = await req.json(); //transforma da View(pagian do Formulário de Tarefas) em Json
        const tarefa = await Todo.create(data);
        return NextResponse.json({success: true, data: tarefa});
    } catch (error) {
        return NextResponse.json({success: false}, {status:500});        
    }
    
}

