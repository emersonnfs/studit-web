"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";

async function fetchExercicioById(id) {
  try {
    const response = await fetch(`http://localhost:8080/exercicio/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch exercicio by ID");
    }
  } catch (error) {
    console.error("Error fetching exercicio by ID:", error);
    throw error;
  }
}

export default function ExercicioDetails() {
  const [exercicio, setExercicio] = useState(null);
  const [showResolucao, setShowResolucao] = useState(false);

  useEffect(() => {
    // Obtenha o valor de 'exercicioId' do localStorage
    const exercicioId = localStorage.getItem("exercicioId");

    if (exercicioId) {
      // Use 'exercicioId' como o 'id' para buscar os detalhes do exercicio
      fetchExercicioById(exercicioId)
        .then((data) => setExercicio(data))
        .catch((error) =>
          console.error("Error fetching exercicio by ID:", error)
        );
    } else {
      console.error("exercicioId not found in localStorage");
    }
  }, []);

  const handleShowResolucao = () => {
    setShowResolucao(!showResolucao);
  };

  return (
    <>
      <NavBar />
      <div className="bg-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Detalhes do Exercício
          </h2>

          {exercicio ? (
            <div className="bg-slate-700 p-4 rounded-lg text-white">
              <p className="text-lg font-semibold">
                Pergunta: {exercicio.pergunta}
              </p>
              <p className="text-sm">Matéria: {exercicio.materia}</p>
              <div className="mt-4">
                <p className="text-lg font-semibold">Alternativas:</p>
                <ul className="text-white">
                  {exercicio.alternativas.map((alternativa, index) => (
                    <li
                      key={index}
                    >
                      {alternativa}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleShowResolucao}
                  className="bg-cyan-400 text-white px-4 py-2 rounded-md hover-bg-cyan-500 transition duration-300 mt-4"
                >
                  {showResolucao
                    ? "Esconder Resolução"
                    : "Mostrar Resolução e Resposta"}
                </button>
                {showResolucao && (
                  <div className="mt-4">
                    <p className="text-lg font-semibold">Resolução:</p>
                    <p className="text-white">{exercicio.resolucao}</p>
                    <p className="text-lg font-semibold mt-4">Resposta:</p>
                    <p className="text-white">
                      {exercicio.alternativas[exercicio.resposta]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-white">Carregando...</p>
          )}
        </div>
      </div>
    </>
  );
}
