import React from "react";
import { Header, Footer, Content } from "../components/index";
import '../style/home.scss'

const Home = () => {
  return (
    <>
      <div className="home-container">
        <Header />
        <Content />
        <Footer />
      </div>
    </>
  );
};

export default Home;
