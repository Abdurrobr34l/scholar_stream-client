import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxios();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      axiosSecure
        .get(`/payment-success?session_id=${sessionId}`)
        .then(() => {
          console.log("Payment verified & DB updated");
        })
        .catch((err) => {
          console.error("Payment verification failed", err);
        });
    }
  }, [searchParams, axiosSecure]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-green-600 mb-2">
        🎉 Payment Successful
      </h2>
      <p className="text-gray-600">
        Your scholarship application has been submitted successfully.
      </p>
    </div>
  );
};

export default PaymentSuccess;
