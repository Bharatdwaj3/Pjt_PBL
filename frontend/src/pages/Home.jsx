import React from "react";
import { Header, Footer, Content,Slider } from "../components/index";
import '../style/home.scss'

const Home = () => {
  return (
    <>
      <div className="home-container">
        <Slider />
        <Header/>
        <Content />
        <Footer />
      </div>
    </>
  );
};

export default Home;