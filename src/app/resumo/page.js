"use client";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Link from "next/link";

async function fetchResumos(idUsuario, pagina) {
  try {
    const response = await fetch(
      `http://localhost:8080/resumo?idUsuario=${idUsuario}&page=${pagina}&size=6`
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

export default function Resumo() {
  const [loginData, setLoginData] = useState(null);
  const [resumos, setResumos] = useState([]);
  const [pagina, setPagina] = useState(0); // Initialize the pagina state

  useEffect(() => {
    const storedData = localStorage.getItem("loginData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setLoginData(parsedData);

      // Fetch resumos for the current page
      fetchResumos(parsedData.id, pagina)
        .then((data) => setResumos(data))
        .catch((error) => console.error("Error fetching resumos:", error));
    }
  }, [pagina]); // Add pagina as a dependency so it updates when pagina changes

  const handlePageChange = (newPage) => {
    setPagina(newPage); // Update pagina when switching pages
  };

  return (
    <>
      <NavBar />
      <div className="bg-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4 text-white">HOME PAGE</h2>

          {loginData ? (
            <div className="flex-col">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Atividade Recente
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Array.isArray(resumos.content) &&
                  resumos.content.length > 0 ? (
                    resumos.content.map((resumo) => (
                      <div
                        className="bg-slate-700 p-4 rounded-lg text-white cursor-pointer hover:bg-cyan-400 transition duration-300"
                        key={resumo.id}
                      >
                        <Link href={`/resumo/detalhes`} key={resumo.id} onClick={() => localStorage.setItem('resumoId', resumo.id)}>
                            <p className="text-lg font-semibold">
                              {resumo.nome}
                            </p>
                            <p className="text-sm">Matéria: {resumo.materia}</p>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-white">Nenhum resumo disponível.</p>
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
                  disabled={pagina >= resumos.totalPages - 1}
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
