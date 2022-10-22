import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import FourOFour from './pages/FourOFour';
import Home from './pages/Home';
import News from './pages/News';
import Ranking from './pages/Ranking';
import SingleCrypto from './pages/SingleCrypto';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/newses" element={<News />} />
        <Route path="/crypto/:cryptoId" element={<SingleCrypto />} />
        <Route path="*" element={<FourOFour />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
