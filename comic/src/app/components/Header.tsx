// components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{ padding: '20px', backgroundColor: '#333', color: '#fff' }}>
      <h1>Marvel Comics</h1>
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ display: 'inline', marginRight: '20px' }}>
            <a href="/" style={{ color: '#fff' }}>Home</a>
          </li>
          <li style={{ display: 'inline', marginRight: '20px' }}>
            <a href="/about" style={{ color: '#fff' }}>About</a>
          </li>
          <li style={{ display: 'inline' }}>
            <a href="/contact" style={{ color: '#fff' }}>Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
