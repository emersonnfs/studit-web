"use client";
import NavBar from "@/components/NavBar";
import React, { useState, useEffect } from "react";

function PerfilPage() {
  const [usuario, setUsuario] = useState({});
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmNovaSenha, setConfirmNovaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("loginData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUsuario(parsedData);
    }
  }, []);

  const atualizarSenha = async () => {
    if (novaSenha !== confirmNovaSenha) {
      setMensagem("As novas senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/atualizar-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: usuario.id,
          senhaAtual: senhaAtual,
          senhaNova: novaSenha,
        }),
      });

      if (response.status === 200) {
        setMensagem("Senha atualizada com sucesso.");

        localStorage.removeItem("loginData");
        window.location.href = "/";
      }
    } catch (error) {
      setMensagem("Erro ao atualizar a senha. Verifique suas credenciais.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    window.location.href = "/";
  };

  return (
    <>
      <NavBar />
      <div className="bg-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto p-4">
          <div className="container mx-auto mt-5">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Perfil do Usuário
            </h2>
            <div className="mb-4 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mr-4">
                <img
                  className="w-full h-full object-cover"
                  src="https://i.pravatar.cc/200"
                  alt="foto de perfil"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Nome:
              </label>
              <input
                type="text"
                value={usuario.nome || ""}
                readOnly
                className="bg-gray-200 px-4 py-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                value={usuario.email || ""}
                readOnly
                className="bg-gray-200 px-4 py-2 rounded-md w-full"
              />
            </div>
            <div className="mb-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Atualizar Senha
              </h3>
              <input
                type="password"
                placeholder="Senha Atual"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                className="bg-gray-200 px-4 py-2 rounded-md mb-2 w-2/5"
              />
              <input
                type="password"
                placeholder="Nova Senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className="bg-gray-200 px-4 py-2 rounded-md mb-2 w-2/5"
              />
              <input
                type="password"
                placeholder="Confirmar Nova Senha"
                value={confirmNovaSenha}
                onChange={(e) => setConfirmNovaSenha(e.target.value)}
                className="bg-gray-200 px-4 py-2 rounded-md mb-2 w-2/5"
              />
              <div className="flex justify-center">
                <button
                  onClick={atualizarSenha}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Atualizar Senha
                </button>
              </div>
              {mensagem && <p className="text-red-500 mt-2">{mensagem}</p>}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-auto"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PerfilPage;
