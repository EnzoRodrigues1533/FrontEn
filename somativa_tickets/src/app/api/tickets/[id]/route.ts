import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectToDatabase from '@/lib/mongodb';
import Ticket from '@/models/Ticket';
import User from '@/models/User';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await connectToDatabase();

    const ticket = await Ticket.findById(params.id)
      .populate('employeeId', 'name')
      .populate('technicianId', 'name');

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket não encontrado' }, { status: 404 });
    }

    // Check if user can view this ticket
    if (session.user.role === 'funcionario' && ticket.employeeId._id.toString() !== session.user.id) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { status, priority, technicianId } = await request.json();

    await connectToDatabase();

    const ticket = await Ticket.findById(params.id);

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket não encontrado' }, { status: 404 });
    }

    // Only technicians can update tickets
    if (session.user.role !== 'tecnico') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    if (status && !['Aberto', 'Em Andamento', 'Resolvido'].includes(status)) {
      return NextResponse.json({ error: 'Status inválido' }, { status: 400 });
    }

    if (priority && !['Baixa', 'Média', 'Alta'].includes(priority)) {
      return NextResponse.json({ error: 'Prioridade inválida' }, { status: 400 });
    }

    if (technicianId) {
      const technician = await User.findById(technicianId);
      if (!technician || technician.role !== 'tecnico') {
        return NextResponse.json({ error: 'Técnico inválido' }, { status: 400 });
      }
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (technicianId !== undefined) updateData.technicianId = technicianId;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    )
      .populate('employeeId', 'name')
      .populate('technicianId', 'name');

    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
