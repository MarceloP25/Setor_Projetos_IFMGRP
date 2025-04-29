import React from 'react';

interface SidebarProps {
  activeSection?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection = 'projetos' }) => {
  const menuItems = [
    { id: 'visao_geral', label: 'Visão Geral' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'orcamentos', label: 'Orçamentos' },
    { id: 'edital', label: 'Editais' }
  ];

  return (
    <div className="sidebar">
      <h2>Visão Geral</h2>
      <ul className="sidebar-menu">
        {menuItems.map(item => (
          <li 
            key={item.id}
            className={activeSection === item.id ? 'active' : ''}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;