import React from 'react';
import Header from '../component/Home/Header';
import TenCryptoNewses from '../component/Home/TenCryptoNewses';
import TenCryptos from '../component/Home/TenCryptos';

const Home = () => {
  return (
    <>
      <Header />
      <TenCryptos />
      <TenCryptoNewses />
    </>
  );
};

export default Home;
