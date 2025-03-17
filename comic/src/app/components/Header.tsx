import React from 'react';

interface HeaderProps {
  favoriteCount: number;
}

const Header: React.FC<HeaderProps> = ({ favoriteCount }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md">
      {/* Logo/Title */}
      <h1 className="text-2xl font-bold">Marvel Comics</h1>

      {/* Navigation */}
      <nav>
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="hover:text-red-400 transition">Home</a>
          </li>
          <li>
            <a href="/about" className="hover:text-red-400 transition">About</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-red-400 transition">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Favorites Counter */}
      <div className="bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold shadow-md">
        Favorites: {favoriteCount}
      </div>
    </header>
  );
};

export default Header;
