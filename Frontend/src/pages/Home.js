import React from "react";
import { Helmet } from "react-helmet";

import Landing from "../features/Home/Landing";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Coursefinity | Learn Best </title>
        <meta
          name="description"
          content="coursefinity are here to meet indian educators with the student from every corner of india"
        />
      </Helmet>

      <Landing />
    </>
  );
};

export default HomePage;
