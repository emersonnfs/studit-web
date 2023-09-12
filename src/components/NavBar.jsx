import React from 'react';
import Link from "next/link";

function NavBar() {
  return (
    <nav className="bg-slate-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold hover:bg-cyan-400 transition duration-300 rounded-lg p-2">STUDIT</Link>
        <div className="flex space-x-4">
          <Link href="/perfil" className="text-white hover:bg-cyan-400 transition duration-300 rounded-lg p-2">Perfil</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
