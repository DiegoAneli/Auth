'use client';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Errore</h1>
        <p className="text-gray-700 mb-6">Si è verificato un errore durante il processo di autenticazione. Per favore, riprova.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
