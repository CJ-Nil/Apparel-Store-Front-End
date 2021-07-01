import React from "react";

import Directory from '../../components/directory/directory.component'
import S from "../../components/Slider/S";

import "./homepage.styles.scss";

const HomePage = () => (
  <div className="homepage">
    <S />
    <Directory />
  </div>
);

export default HomePage;
