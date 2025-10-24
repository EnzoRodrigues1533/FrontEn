import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Sistema de Abertura de Tickets
          </h1>
          <p className="text-gray-600 mb-8">Departamento de TI - InovaTech</p>
          <div className="space-y-4">
            <Link
              href="/login"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors block text-center"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors block text-center"
            >
              Registrar-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
