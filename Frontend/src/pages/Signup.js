import React from "react";
import { Helmet } from "react-helmet";

import SignupForm from "../features/auth/SignupForm";

const SignupPage = () => {
  return (
    <>
      <Helmet>
        <title>Coursefinity - Get started</title>
        <meta
          name="description"
          content="coursefinity are here to meet indian educators with the student from every corner of india"
        />
      </Helmet>
      <SignupForm />
    </>
  );
};

export default SignupPage;
