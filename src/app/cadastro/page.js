'use client'

import Link from 'next/link';
import { useState } from 'react';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();
    const data = {
        nome,
        email,
        senha,
        dataNascimento 
    };

    try {
      const response = await fetch('http://localhost:8080/api/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status == 201) {
        console.log('Login bem-sucedido');
        alert("Usuário Cadastrado");
        window.location.href = '/login';
      } else {
        console.error('Erro no cadastro');
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
        <form onSubmit={handleCadastro}>
          <div className="mb-4">
            <input
              className="bg-slate-700 w-full p-2 border rounded-md"
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-slate-700 w-full p-2 border rounded-md"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-slate-700 w-full p-2 border rounded-md"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-slate-700 w-full p-2 border rounded-md"
              type="text"
              placeholder="Data de Nascimento"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-pink-700 text-white py-2 rounded-md hover:bg-pink-700 transition duration-300"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
        <p className="mt-4">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Ir para a página de login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
