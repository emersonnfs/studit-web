"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    // Recupere os dados de login do localStorage
    const storedData = localStorage.getItem("loginData");

    // Verifique se há dados de login no localStorage
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setLoginData(parsedData);
    }
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">HOME PAGE</h2>

        {loginData ? (
          <div className="flex-col ">
            <div className="bg-cyan-400 p-4 rounded-lg shadow-md text-center mb-10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    className="w-full h-full object-cover"
                    src="https://i.pravatar.cc/100"
                    alt="avatar do usuário"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold">
                    Olá, {loginData.nome}, bom te ver!
                  </p>
                </div>
              </div>
              <textarea
                className="w-full h-16 p-2 border rounded-md"
                placeholder="Faça uma pergunta..."
              ></textarea>
            </div>

            <div className="flex justify-between mb-4">
              <div className="">
                <div className="bg-slate-700 p-4 rounded-lg text-white text-center cursor-pointer mb-10 hover:bg-cyan-400 transition duration-300">
                  <p>Resumos</p>
                </div>
                <div className="bg-slate-700 mb-4 p-4 rounded-lg ">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Atividade Recente
                  </h3>
                  <ul className="text-white">
                    <li>Atividade 1</li>
                    <li>Atividade 2</li>
                    <li>Atividade 3</li>
                    <li>Atividade 4</li>
                    <li>Atividade 5</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-slate-700 p-4 rounded-lg text-white text-center cursor-pointer mb-10 hover:bg-cyan-400 transition duration-300">
                  <p>Exercícios</p>
                </div>
                <div className="bg-slate-700 mb-4 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Atividade Recente
                  </h3>
                  <ul className="text-white">
                    <li>Atividade 1</li>
                    <li>Atividade 2</li>
                    <li>Atividade 3</li>
                    <li>Atividade 4</li>
                    <li>Atividade 5</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-slate-700 p-4 rounded-lg text-white text-center cursor-pointer mb-10 hover:bg-cyan-400 transition duration-300">
                  <p>Simulados</p>
                </div>
                <div className="bg-slate-700 mb-4 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Atividade Recente
                  </h3>
                  <ul className="text-white">
                    <li>Atividade 1</li>
                    <li>Atividade 2</li>
                    <li>Atividade 3</li>
                    <li>Atividade 4</li>
                    <li>Atividade 5</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Você não está logado.</p>
        )}
      </div>
    </div>
  );
}
