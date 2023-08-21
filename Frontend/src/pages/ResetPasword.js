import { Helmet } from "react-helmet";
import ResetPassword from "../features/auth/components/ResetPassword";

function ResetPaswordPage() {
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta
          name="description"
          content="coursefinity are here to meet indian educators with the student from every corner of india"
        />
      </Helmet>
      <ResetPassword />
    </>
  );
}

export default ResetPaswordPage;
