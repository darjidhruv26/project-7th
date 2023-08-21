import React from "react";
import { Helmet } from "react-helmet";

import SigninForm from "../features/auth/SigninForm";

const SigninPage = () => {
  return (
    <>
      <Helmet>
        <title>Coursefinity - Login</title>
        <meta
          name="description"
          content="coursefinity are here to meet indian educators with the student from every corner of india"
        />
      </Helmet>
      <SigninForm />
    </>
  );
};

export default SigninPage;
