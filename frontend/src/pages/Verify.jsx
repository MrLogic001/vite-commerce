import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"


/* Note that this verification method is a simplified and insecure Stripe Verification.
Web Hooks is the recommended and secure means for Stripe verification. That process, however,
is quite longer. 
*/
const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const { token, navigate, setCartItems, backendUrl } = useContext(ShopContext)

  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const verifyPayment = async () => {

    try {
      if (!token) {
        return null
      }

      const response = await axios.post(`${backendUrl}/api/order/verify`, {success, orderId}, {headers: {token}})
      if (response.data.success) {
        setCartItems({})
        navigate('/orders')
      } else {
        navigate('/cart')
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message)     
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [token, success, orderId])

  return (
    <div>Verify</div>
  )
}

export default Verify;

/**
import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const { token, navigate, setCartItems, backendUrl } = useContext(ShopContext);

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/order/verify`, { success, orderId }, { headers: { token } });
      if (response.data.success) {
        setCartItems({});
        navigate('/orders');
      } else {
        toast.error("Payment verification failed. Redirecting to cart.");
        navigate('/cart');
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      toast.error("An error occurred during payment verification. Please try again.");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token, success, orderId]); // Include success and orderId

  return <div>Verifying Payment...</div>;
};

export default Verify;

 */