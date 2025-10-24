'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Comment {
  _id: string;
  text: string;
  userName: string;
  createdAt: string;
}

interface Ticket {
  _id: string;
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  employeeId: { name: string };
  technicianId: { name: string } | null;
  createdAt: string;
  comments: Comment[];
}

export default function TicketDetail() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingPriority, setUpdatingPriority] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/');
      return;
    }

    if (params.id) {
      fetchTicket();
    }
  }, [session, status, params.id, router]);

  const fetchTicket = async () => {
    try {
      const response = await fetch(`/api/tickets/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setTicket(data);
      } else if (response.status === 404) {
        alert('Ticket não encontrado');
        router.back();
      } else if (response.status === 403) {
        alert('Você não tem permissão para ver este ticket');
        router.back();
      }
    } catch (error) {
      console.error('Error fetching ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!ticket) return;

    setUpdatingStatus(true);
    try {
      const response = await fetch(`/api/tickets/${ticket._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        setTicket(updatedTicket);
      } else {
        alert('Erro ao atualizar status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Erro ao atualizar status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handlePriorityChange = async (newPriority: string) => {
    if (!ticket) return;

    setUpdatingPriority(true);
    try {
      const response = await fetch(`/api/tickets/${ticket._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priority: newPriority }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        setTicket(updatedTicket);
      } else {
        alert('Erro ao atualizar prioridade');
      }
    } catch (error) {
      console.error('Error updating priority:', error);
      alert('Erro ao atualizar prioridade');
    } finally {
      setUpdatingPriority(false);
    }
  };

  const handleAssignToMe = async () => {
    if (!ticket || !session) return;

    try {
      const response = await fetch(`/api/tickets/${ticket._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ technicianId: session.user.id }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        setTicket(updatedTicket);
      } else {
        alert('Erro ao atribuir ticket');
      }
    } catch (error) {
      console.error('Error assigning ticket:', error);
      alert('Erro ao atribuir ticket');
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket || !newComment.trim()) return;

    try {
      const response = await fetch(`/api/tickets/${ticket._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newComment.trim() }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        setTicket(updatedTicket);
        setNewComment('');
      } else {
        alert('Erro ao adicionar comentário');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Erro ao adicionar comentário');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberto': return 'bg-yellow-100 text-yellow-800';
      case 'Em Andamento': return 'bg-blue-100 text-blue-800';
      case 'Resolvido': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Baixa': return 'bg-green-100 text-green-800';
      case 'Média': return 'bg-yellow-100 text-yellow-800';
      case 'Alta': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!ticket) {
    return <div className="min-h-screen flex items-center justify-center">Ticket não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Sistema de Tickets - InovaTech</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="text-white hover:text-gray-200"
              >
                Voltar
              </button>
              <button
                onClick={() => router.push('/api/auth/signout')}
                className="text-white hover:text-gray-200"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Detalhes do Ticket #{ticket.id}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <strong className="text-gray-700">Título:</strong>
              <p className="mt-1">{ticket.title}</p>
            </div>
            <div>
              <strong className="text-gray-700">Status:</strong>
              <p className="mt-1">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </p>
            </div>
            <div>
              <strong className="text-gray-700">Prioridade:</strong>
              <p className="mt-1">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </p>
            </div>
            <div>
              <strong className="text-gray-700">Funcionário:</strong>
              <p className="mt-1">{ticket.employeeId?.name || 'N/A'}</p>
            </div>
            <div>
              <strong className="text-gray-700">Técnico Responsável:</strong>
              <p className="mt-1">{ticket.technicianId?.name || 'Não atribuído'}</p>
            </div>
            <div>
              <strong className="text-gray-700">Data de Criação:</strong>
              <p className="mt-1">{new Date(ticket.createdAt).toLocaleString('pt-BR')}</p>
            </div>
          </div>

          <div className="mb-6">
            <strong className="text-gray-700">Descrição:</strong>
            <p className="mt-2 text-gray-600">{ticket.description}</p>
          </div>

          {/* Technician Actions */}
          {session?.user.role === 'tecnico' && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Alterar Status:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={updatingStatus}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <option value="Aberto">Aberto</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Resolvido">Resolvido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioridade
                  </label>
                  <select
                    value={ticket.priority}
                    onChange={(e) => handlePriorityChange(e.target.value)}
                    disabled={updatingPriority}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleAssignToMe}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Atribuir a Mim
                </button>
              </div>
            </div>
          )}

          {/* Comments */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Comentários</h2>

            <div className="space-y-4 mb-4">
              {ticket.comments.map((comment) => (
                <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <strong className="text-gray-900">{comment.userName}</strong>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="flex gap-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Adicionar comentário..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Adicionar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
