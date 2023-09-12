'use client'

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";

async function fetchResumoById(id) {
  try {
    const response = await fetch(`http://localhost:8080/resumo/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch resumo by ID");
    }
  } catch (error) {
    console.error("Error fetching resumo by ID:", error);
    throw error;
  }
}

export default function ResumoDetails() {
  const [resumo, setResumo] = useState(null);

  useEffect(() => {
    // Obtenha o valor de 'resumoId' do localStorage
    const resumoId = localStorage.getItem('resumoId');

    if (resumoId) {
      // Use 'resumoId' como o 'id' para buscar os detalhes do resumo
      fetchResumoById(resumoId)
        .then((data) => setResumo(data))
        .catch((error) => console.error("Error fetching resumo by ID:", error));
    } else {
      console.error("resumoId not found in localStorage");
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="bg-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4 text-white">Detalhes do Resumo</h2>

          {resumo ? (
            <div className="bg-slate-700 p-4 rounded-lg text-white">
              <p className="text-lg font-semibold">{resumo.nome}</p>
              <p className="text-sm">Matéria: {resumo.materia}</p>
              <p className="text-white mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget
                risus vel ligula ullamcorper tincidunt. Phasellus vel nisi in turpis
                fermentum tristique. Sed scelerisque quam id justo rhoncus bibendum.
                Etiam nec tellus non purus malesuada malesuada eget non nisl. Cras
                eget quam non velit auctor venenatis ut in purus. In hac habitasse
                platea dictumst. Donec id sapien at erat eleifend vulputate. Vivamus
                vel augue quis justo viverra condimentum.
              </p>
            </div>
          ) : (
            <p className="text-white">Carregando...</p>
          )}
        </div>
      </div>
    </>
  );
}


