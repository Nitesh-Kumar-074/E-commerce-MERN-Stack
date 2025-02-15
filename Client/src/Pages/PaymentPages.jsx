import { Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

export const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <CheckCircle className="text-green-600 w-24 h-24 mb-4" />
      <h1 className="text-2xl font-bold text-green-700">Payment Successful</h1>
      <p className="text-gray-600 mt-2">Thank you for your purchase!</p>
      <Link to="/" className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition">
        Return to Home
      </Link>
    </div>
  );
};

export const PaymentFailure = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <XCircle className="text-red-600 w-24 h-24 mb-4" />
      <h1 className="text-2xl font-bold text-red-700">Payment Failed</h1>
      <p className="text-gray-600 mt-2">Something went wrong. Please try again.</p>
      <Link to="/checkout" className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition">
        Try Again
      </Link>
    </div>
  );
};
