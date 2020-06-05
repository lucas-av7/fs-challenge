import React from 'react';

import './styles.css';

import Header from './components/Header';
import Routes from './routes';
import Footer from './components/Footer';

const App = () => (
  <div className="App">
      <Header />
      <Routes />
      <Footer />
  </div>
);

export default App;