import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import Confetti from "react-confetti";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order || {};
  const [count, setCount] = useState(10);
  const query = new URLSearchParams(useLocation().search);
  const paymentId = query.get("paymentId");
  const payerId = query.get("payerId");
  const orderId = query.get("orderId");

  useEffect(() => {
    // Countdown logic
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000); // Decrease count every second
      return () => clearTimeout(timer); // Cleanup timer on unmount
    } else {
      navigate("/shop/account"); // Redirect when count reaches 0
    }
  }, [count, navigate]);

  return (
    <div className="relative h-[90vh]">
      <Confetti />
      <Card className="p-10 flex flex-col items-center justify-center h-full">
        <CardHeader className="p-0">
          <CardTitle className="text-4xl text-green-600">
            Payment is Successful!
          </CardTitle>
        </CardHeader>
        <p className="mt-4 text-lg text-gray-600">Payment ID: {paymentId}</p>
        <p className="text-lg text-gray-600">Payer ID: {payerId}</p>
        <p className="text-lg text-gray-600">Order ID: {orderId}</p>
        <p className="mt-4 text-gray-500">
          Redirecting you to your orders in {count} seconds...
        </p>
        <Button className="mt-5" onClick={() => navigate("/shop/account")}>
          View Orders Now
        </Button>
        <Button className="mt-2" onClick={() => navigate("/shop/listing")}>
          Continue Shopping
        </Button>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
