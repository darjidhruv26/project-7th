import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import icon1 from "../assets/icons/i-back.svg";
import cartoon from "../assets/server-cartoon.svg";

function ErrorPage() {
  return (
    <>
      <Helmet>
        <title>404 - Coursefinity</title>
        <meta
          name="description"
          content="coursefinity are here to meet indian educators with the student from every corner of india"
        />
      </Helmet>
      <div className="h-[100dvh] flex items-center justify-center flex-col bg-[#212121]">
        <img src={cartoon} alt="cartoon" className="w-[250px]" />
        <Link
          to="/"
          className="flex items-center justify-center gap-2 bg-[#E9CCFF] text-black font-bold py-2 px-3 rounded-md mt-6 w-[360px] focus:outline-none"
        >
          <span>
            <img src={icon1} alt="back" className="w-5" />
          </span>
          Home
        </Link>
      </div>
    </>
  );
}

export default ErrorPage;
