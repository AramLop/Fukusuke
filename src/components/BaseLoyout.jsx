// src/components/BaseLayout.jsx
import PropTypes from 'prop-types';

export default function BaseLayout({ children }) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-naranja p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white font-bold text-2xl">Fukusuke Sushi</h1>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-white hover:text-orange-200">Inicio</a></li>
            <li><a href="#" className="text-white hover:text-orange-200">Menú</a></li>
            <li><a href="#" className="text-white hover:text-orange-200">Carrito</a></li>
            <li><a href="#" className="text-white hover:text-orange-200">Contacto</a></li>
          </ul>
        </div>
      </nav>
      {/* Contenido principal */}
      <main className="flex-grow container mx-auto p-6">
        {children}
      </main>
    </div>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
