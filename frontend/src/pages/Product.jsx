import React from "react";
import { Header, Footer, Content } from "../components/index";
import PgFrontend from "../components/PgFrontend";
import "../style/Chrcts.scss"
const Product = () => {
  return (
    <>
      <div className="chrcts-container">
        <Header/>
        <PgFrontend/>
        <Footer/>
      </div>
    </>
  );
};

export default Product;
