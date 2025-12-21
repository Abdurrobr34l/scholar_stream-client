// import Lottie from "lottie-react";
// import forbiddenAnimation from "../assets/forbidden.json";
import { Link } from "react-router";
import SecondaryButton from "../../Utilities/SecondaryButton";
import PrimaryButton from "../../Utilities/PrimaryButton";
const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: forbiddenAnimation,
        }}
        height={200}
        width={200}
      ></Lottie> */}
      <h1 className="text-3xl font-bold text-error!">
        You Are Forbidden to Access This Page
      </h1>
      <p className="text-lg mt-2">
        Please contact the administrator if you believe this is an error.
      </p>
      <div className="my-3 space-x-3">
        <PrimaryButton path="/" buttonName="Go to Home"/>

        <SecondaryButton path="/dashboard" buttonName="Go to Dashboard"/>
      </div>
    </div>
  );
};

export default Forbidden;