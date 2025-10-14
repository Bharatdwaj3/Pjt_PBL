import React from "react";
import { Header, Footer, Content } from "../components/index";
import "../style/Chrcts.scss"
import LocationMap from "../components/LocationMap";
const Product = () => {
  return (
    <>
      <div className="chrcts-container">
        <Header/>
        <LocationMap/>
        <Footer/>
      </div>
    </>
  );
};

export default Product;
