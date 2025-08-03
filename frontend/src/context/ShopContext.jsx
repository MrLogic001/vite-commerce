import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  //const backendUrl = import.meta.env.VITE_BACKEND_URL

  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select product size");
      return;
    }

    let cartData = structuredClone(cartItems);
    console.log("cartData of shopcontext: ", cartData);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    console.log("Context cartData: ", cartData);
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post("http://localhost:4000/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount = cartItems[items][item];
          } else {
            totalCount = 0;
          }
        } catch (error) {
          console.error(error.message);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
        "http://localhost:4000/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success(response.data.success);
        } else {
          toast.error(error.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);

      try {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const getUserCart = async (token) => {
  try {
    // 1. Input Validation: Check for a valid token.
    if (!token) {
      console.error("Error: No token provided.");
      toast.error("Authentication error: No token provided.");
      return; // Exit the function if no token is provided.
    }

    // 2. Making the API call with error handling
    const response = await axios.post(
      "http://localhost:4000/api/cart/get",
      {}, { headers:   {token}   }
    );

    // 3. Status code check
    if (response.status >= 200 && response.status < 300) {
      // 4. Success handling
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        // 5. Backend error handling
        console.error("Backend error:", response.data.message);
        toast.error(
          response.data.message || "Failed to fetch cart data."
        ); // Display the error message from the backend or a generic message.
      }
    } else {
      // 6. HTTP error handling
      console.error(
        `HTTP error: ${response.status} - ${response.statusText}`
      );
      toast.error(
        `Network error: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    // 7. Catch-all error handling
    console.error("An unexpected error occurred:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      toast.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || "Unknown error"
        }`
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request:", error.request);
      toast.error("Network error: Could not connect to the server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      toast.error("An unexpected error occurred.");
    }
  } finally {
    // 8. Optional: Handle loading state or cleanup here.
    // For example, set a loading state to false.
    // setLoading(false);
  }
};


  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem('token'))
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    setCartItems,
    addToCart,
    cartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
