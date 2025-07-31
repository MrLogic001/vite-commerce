import { useEffect, useState } from "react";
//import backendUrl from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { currency } from '../App'

const List = ({ token }) => {
  const [listProds, setListProds] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/product/list"
      );

      if (response.data.success) {
        setListProds(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const remove = async (id) => {
    try {
      const response = await axios.post("http://localhost:4000/api/product/remove", {id}, {headers: {token}})

      if (response.data.success) {
        toast.success(response.data.message)

        await fetchList()
      } else {
      toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message)
    }
  } 

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>

      <div className="flex flex-col gap-2">
        {/*----------List Table Title-------------*/}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/*------------List Product------------*/}
        {
          listProds.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
            <img className="w-12" src={item.image[0]} alt="product_image" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={() => remove(item._id)} className="text-right md:text-center cursor-pointer text-lg">X</p>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default List;
