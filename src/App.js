import React from 'react';
import GlobalStyles from './styles/global'
import Routes from './routes';
import AppProvider from './hooks'

function App() {
  return (
    <AppProvider>
      <Routes />
      <GlobalStyles />
    </AppProvider>
  );
}

export default App;
