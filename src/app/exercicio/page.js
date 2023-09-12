"use client";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Link from "next/link";

async function fetchExercicios(idUsuario, pagina) {
  try {
    const response = await fetch(
      `http://localhost:8080/exercicio?idUsuario=${idUsuario}&page=${pagina}&size=6`
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

export default function Exercicio() {
  const [loginData, setLoginData] = useState(null);
  const [exercicios, setExercicios] = useState([]);
  const [pagina, setPagina] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem("loginData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setLoginData(parsedData);

      fetchExercicios(parsedData.id, pagina)
        .then((data) => setExercicios(data))
        .catch((error) => console.error("Error fetching exercicios:", error));
    }
  }, [pagina]);

  const handlePageChange = (newPage) => {
    setPagina(newPage);
  };

  return (
    <>
      <NavBar />
      <div className="bg-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4 text-white">EXERCÍCIOS</h2>

          {loginData ? (
            <div className="flex-col">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Atividade Recente
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Array.isArray(exercicios.content) &&
                  exercicios.content.length > 0 ? (
                    exercicios.content.map((exercicio) => (
                      <div
                        className="bg-slate-700 p-4 rounded-lg text-white cursor-pointer hover:bg-cyan-400 transition duration-300"
                        key={exercicio.id}
                      >
                        <Link
                          href={`/exercicio/detalhes`}
                          key={exercicio.id}
                          onClick={() =>
                            localStorage.setItem("exercicioId", exercicio.id)
                          }
                        >
                          <p className="text-lg font-semibold">
                            Pergunta: {exercicio.pergunta}
                          </p>
                          <p className="text-sm">
                            Matéria: {exercicio.materia}
                          </p>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-white">Nenhum exercício disponível.</p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => handlePageChange(pagina - 1)}
                  disabled={pagina === 0}
                  className="text-white mx-2"
                >
                  Anterior
                </button>
                <button
                  onClick={() => handlePageChange(pagina + 1)}
                  disabled={pagina >= exercicios.totalPages - 1}
                  className="text-white mx-2"
                >
                  Próxima
                </button>
              </div>
            </div>
          ) : (
            <p>Você não está logado.</p>
          )}
        </div>
      </div>
    </>
  );
}
