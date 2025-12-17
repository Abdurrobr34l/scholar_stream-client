import { useEffect } from "react";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import { useSearchParams } from "react-router";

const PaymentCancelled = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId || !user?.uid) return;

    // Call backend to save cancelled application as unpaid
    axiosSecure.get(`/payment-cancelled?session_id=${sessionId}`)
      .then(res => {
        console.log(res.data.message);
      })
      .catch(err => console.error(err));
  }, [searchParams, axiosSecure, user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-red-600 mb-2">❌ Payment Cancelled</h2>
      <p className="text-gray-600">
        Your application is saved as unpaid. You can retry payment from your dashboard.
      </p>
    </div>
  );
};

export default PaymentCancelled;
