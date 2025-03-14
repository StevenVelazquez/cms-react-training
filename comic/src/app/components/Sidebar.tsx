// components/Sidebar.tsx
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px', borderRight: '2px solid #ddd' }}>
      <h2>Filters</h2>
      <div>
        <h3>Character Filter</h3>
        <ul>
          <li><a href="#">Iron Man</a></li>
          <li><a href="#">Captain America</a></li>
          <li><a href="#">Thor</a></li>
          <li><a href="#">Deadpool</a></li>
        </ul>
      </div>
      <div>
        <h3>Creator Filter</h3>
        <ul>
          <li><a href="#">Kate Leth</a></li>
          <li><a href="#">Stan Lee</a></li>
          <li><a href="#">Steve Ditko</a></li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
