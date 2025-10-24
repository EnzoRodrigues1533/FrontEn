import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectToDatabase from '@/lib/mongodb';
import Ticket from '@/models/Ticket';
import User from '@/models/User';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await connectToDatabase();

    let tickets;

    if (session.user.role === 'tecnico') {
      // Technicians see all tickets
      tickets = await Ticket.find({})
        .populate('employeeId', 'name')
        .populate('technicianId', 'name')
        .sort({ createdAt: -1 });
    } else {
      // Employees see only their tickets
      tickets = await Ticket.find({ employeeId: session.user.id })
        .populate('employeeId', 'name')
        .populate('technicianId', 'name')
        .sort({ createdAt: -1 });
    }

    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { title, description, priority, employeeId } = await request.json();

    if (!title || !description || !priority) {
      return NextResponse.json(
        { error: 'Título, descrição e prioridade são obrigatórios' },
        { status: 400 }
      );
    }

    if (!['Baixa', 'Média', 'Alta'].includes(priority)) {
      return NextResponse.json(
        { error: 'Prioridade inválida' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // If employeeId is not provided, use the current user's ID (for employees creating their own tickets)
    const finalEmployeeId = employeeId || session.user.id;

    // Verify that the employee exists and is actually an employee
    const employee = await User.findById(finalEmployeeId);
    if (!employee || employee.role !== 'funcionario') {
      return NextResponse.json(
        { error: 'Funcionário inválido' },
        { status: 400 }
      );
    }

    // Only technicians can create tickets for other employees
    if (session.user.role !== 'tecnico' && finalEmployeeId !== session.user.id) {
      return NextResponse.json(
        { error: 'Você só pode criar tickets para si mesmo' },
        { status: 403 }
      );
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      employeeId: finalEmployeeId,
    });

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('employeeId', 'name')
      .populate('technicianId', 'name');

    return NextResponse.json(populatedTicket, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
