"use client";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiSend } from "react-icons/fi";

async function fetchResumos(idUsuario) {
  try {
    const response = await fetch(
      `http://localhost:8080/resumo?idUsuario=${idUsuario}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("Failed to fetch resumos");
    }
  } catch (error) {
    console.error("Error fetching resumos:", error);
    throw error;
  }
}

async function fetchExercicios(idUsuario) {
  try {
    const response = await fetch(
      `http://localhost:8080/exercicio?idUsuario=${idUsuario}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("Failed to fetch exercicios");
    }
  } catch (error) {
    console.error("Error fetching exercicios:", error);
    throw error;
  }
}

export default function HomePage() {
  const [loginData, setLoginData] = useState(null);
  const [resumos, setResumos] = useState([]);
  const [exercicios, setExercicios] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("loginData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setLoginData(parsedData);

      fetchResumos(parsedData.id)
        .then((data) => setResumos(data))
        .catch((error) => console.error("Error fetching resumos:", error));

      fetchExercicios(parsedData.id)
        .then((data) => setExercicios(data))
        .catch((error) => console.error("Error fetching exercicios:", error));
    }
  }, []);

  const handleChatIconClick = () => {
    window.location.href = "/chat";
  };

  return (
    <>
      <NavBar />
      <div className="bg-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4 text-white">HOME PAGE</h2>

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
                <div className="relative flex flex-row">
                  <textarea
                    className="w-full h-16 p-2 border rounded-md"
                    placeholder="Faça uma pergunta..."
                  ></textarea>
                  <a
                    href="#"
                    className="absolute right-4 bottom-4 text-cyan-400 cursor-pointer"
                    onClick={handleChatIconClick}
                  >
                    <FiSend size={24} /> {/* Use the send icon */}
                  </a>
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <div className="">
                  <div className="bg-slate-700 p-4 rounded-lg text-white text-center cursor-pointer mb-10 hover:bg-cyan-400 transition duration-300">
                    <Link href="/resumo">Resumos</Link>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Atividade Recente
                  </h3>
                  <div>
                    <ul className="text-white">
                      {Array.isArray(resumos.content) &&
                      resumos.content.length > 0 ? (
                        resumos.content.map((resumo) => (
                          <div
                            className="bg-slate-700 mb-4 p-4 rounded-lg cursor-pointer mb-10 hover:bg-cyan-400 transition duration-300"
                            key={resumo.id}
                          >
                            <Link href="/resumo" key={resumo.id}>
                              Matéria: {resumo.materia}
                              <br />
                              Nome: {resumo.nome}
                            </Link>
                          </div>
                        ))
                      ) : (
                        <ul className="bg-slate-700 mb-4 p-4 rounded-lg">
                          <li>Nenhum exercício disponível.</li>
                        </ul>
                      )}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="bg-slate-700 p-4 rounded-lg text-white text-center cursor-pointer mb-10 hover:bg-cyan-400 transition duration-300">
                    <Link href="/exercicio">Exercícios</Link>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Atividade Recente
                  </h3>
                  <div>
                    <ul className="text-white">
                      {Array.isArray(exercicios.content) &&
                      exercicios.content.length > 0 ? (
                        exercicios.content.map((exercicio) => (
                          <div
                            className="bg-slate-700 mb-4 p-4 rounded-lg cursor-pointer mb-10 hover:bg-cyan-400 transition duration-300"
                            key={exercicio.id}
                          >
                            <Link href="/exercicio" key={exercicio.id}>
                              Matéria: {exercicio.materia}
                              <br />
                              Pergunta: {exercicio.pergunta}
                            </Link>
                          </div>
                        ))
                      ) : (
                        <ul className="bg-slate-700 mb-4 p-4 rounded-lg">
                          <li>Nenhum exercício disponível.</li>
                        </ul>
                      )}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="bg-slate-700 p-4 rounded-lg text-white text-center cursor-pointer mb-10 hover:bg-cyan-400 transition duration-300">
                    <Link href="/simulado">Simulados</Link>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Atividade Recente
                  </h3>
                  <div className="bg-slate-700 mb-4 p-4 rounded-lg">
                    <p className="text-white">Nenhum simulado disponível.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-white">Você não está logado.</p>
          )}
        </div>
      </div>
    </>
  );
}
