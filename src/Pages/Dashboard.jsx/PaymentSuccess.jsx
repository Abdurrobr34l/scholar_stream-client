import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import { motion } from "framer-motion";
import SecondaryButton from "../../Utilities/SecondaryButton";
import PrimaryButton from "../../Utilities/PrimaryButton";

const PaymentSuccess = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const [scholarshipName, setScholarshipName] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  useEffect(() => {
    if (!sessionId || !user?.uid) return;

    axiosSecure
      .get(`/payment-success?session_id=${sessionId}`)
      .then(res => {
        setScholarshipName(res.data.scholarshipName);
        setUniversityName(res.data.universityName);
        setAmountPaid(res.data.amountPaid);
      })
      .catch(err => {
        console.error("Payment success fetch failed", err);
      });
  }, [sessionId, axiosSecure, user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
    >
      <div className="sectionMargin sectionPadding flex flex-col items-center justify-center px-4 text-center rounded-xl bg-[#f8fafc] lg:w-[500px] lg:mx-auto">
        <h2 className="text-3xl font-bold text-success! mb-4">
          Payment Successful
        </h2>

        {/* Scholarship Name */}
        {scholarshipName && (
          <p className="text-lg font-semibold mb-2">
            Scholarship:{" "}
            <span className="text-primary">{scholarshipName}</span>
          </p>
        )}

        {/* University Name */}
        {universityName && (
          <p className="mb-2">
            University:{" "}
            <span className="font-medium text-primary">{universityName}</span>
          </p>
        )}

        {/* Amount Paid */}
        {amountPaid && (
          <p className="mb-6">
            Amount Paid:{" "}
            <span className="font-semibold text-primary">
              ${amountPaid}
            </span>
          </p>
        )}

        {/* Action Button */}
         <div className="flex gap-3">
        <PrimaryButton
          buttonName="Go to All Scholarships"
          path="/dashboard/all-scholarships"
        />
        <SecondaryButton
          buttonName="Go to My Applications"
          path="/dashboard/my-applications"
        />
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentSuccess;
