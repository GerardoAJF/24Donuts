import React from 'react';
import DaySelector from './componentsPrivate/DaySelector/daySelector';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#f5ebe0', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <DaySelector />
    </div>
  );
}

export default App;