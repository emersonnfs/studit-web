'use client'
import Link from 'next/link';
import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email,
      senha, 
    };

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Login bem-sucedido');
        localStorage.setItem('loginData', JSON.stringify(responseData));
        window.location.href = '/homepage'
      } else {
        alert('Erro no login');
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded shadow-md w-96">
        <div>
          <h2>STUDIT</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              className="bg-slate-700 w-full p-2 border rounded-md"
              type="email"
              id="email"
              name="email"
              placeholder="Insira seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-slate-700 w-full p-2 border rounded-md"
              type="password"
              id="senha" 
              name="senha"
              placeholder="Insira sua senha"
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
            />
          </div>
          <button
            className="w-full bg-pink-700 text-white py-2 rounded-md hover:bg-pink-700 transition duration-300"
            type="submit"
          >
            Descobrir
          </button>
        </form>
        <p className="mt-4">
          Ainda não tem login?{' '}
          <Link href="/cadastro" className="text-blue-600 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
