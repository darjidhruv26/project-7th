import React from "react";
import ResetEmail from "../features/auth/components/ResetEmail";
import { Helmet } from "react-helmet";

const ResetEmailPage = () => {
  return (
    <>
      <Helmet>
        <title>Reset Email</title>
        <meta
          name="description"
          content="coursefinity are here to meet indian educators with the student from every corner of india"
        />
      </Helmet>
      <ResetEmail />
    </>
  );
};

export default ResetEmailPage;
