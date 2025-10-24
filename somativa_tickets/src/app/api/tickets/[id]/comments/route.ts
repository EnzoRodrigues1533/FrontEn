import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectToDatabase from '@/lib/mongodb';
import Ticket from '@/models/Ticket';
import User from '@/models/User';
import { authOptions } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Texto do comentário é obrigatório' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const ticket = await Ticket.findById(params.id);

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket não encontrado' }, { status: 404 });
    }

    // Check if user can comment on this ticket
    if (session.user.role === 'funcionario' && ticket.employeeId.toString() !== session.user.id) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const comment = {
      text: text.trim(),
      userId: session.user.id,
      userName: user.name,
      createdAt: new Date(),
    };

    ticket.comments.push(comment);
    await ticket.save();

    const updatedTicket = await Ticket.findById(params.id)
      .populate('employeeId', 'name')
      .populate('technicianId', 'name');

    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
