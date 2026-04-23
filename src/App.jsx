import React from 'react';
import PersonasTable from './components/private/PersonasTable/personasTable';

function App() {
  // Datos de prueba basados en tu diseño
  const tableData = [
    { nombres: 'Jhon Jhon', apellidos: 'Doe Doe', correo: 'jhondoe@email.com', telefono: '69225140' },
    { nombres: 'Jhon Jhon', apellidos: 'Doe Doe', correo: 'jhondoe@email.com', telefono: '69225140' },
    { nombres: 'Jhon Jhon', apellidos: 'Doe Doe', correo: 'jhondoe@email.com', telefono: '69225140' },
    { nombres: 'Jhon Jhon', apellidos: 'Doe Doe', correo: 'jhondoe@email.com', telefono: '69225140' },
  ];

  return (
    <div style={{ 
      backgroundColor: '#f5ebe0', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{ width: '800px' }}>
        <PersonasTable data={tableData} />
      </div>
    </div>
  );
}

export default App;