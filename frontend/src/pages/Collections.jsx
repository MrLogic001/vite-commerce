import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collections = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
        setSubCategory((prev) => {
            const newSubCategories = prev.filter((item) => item !== e.target.value);
            console.log("Updated SubCategories:", newSubCategories);
            return newSubCategories;
        });
    } else {
        setSubCategory((prev) => {
            const newSubCategories = [...prev, e.target.value];
            console.log("Updated SubCategories:", newSubCategories);
            return newSubCategories;
        });
    }
};


/*   const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));

       console.log("SubCategories Selected:", subCategory);
    console.log("Current Item SubCategory:", item.subCategory);
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);

       console.log("SubCategories Selected:", subCategory);
    console.log("Current Item SubCategory:", item.subCategory);
    }

   
  }; */

  const applyFilter = () => {
    let prodsCopy = products.slice();

    prodsCopy = prodsCopy.filter((item) => {
      let matchesSearch = true;
      let matchesCategory = true;
      let matchesSubCategory = true;

      if (search && showSearch) {
        matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      }

      if (category.length > 0) {
        matchesCategory = category.includes(item.category);
      }

      if (subCategory.length > 0) {
        matchesSubCategory = subCategory.includes(item.subCategory);
      }

      return matchesSearch && matchesCategory && matchesSubCategory;
    });

    setFilterProducts(prodsCopy);
    console.log("Filtered Products Count:", filterProducts.length);

  };

  /*  const applyFilter = () => {
    let prodsCopy = products.slice();

    if (search && showSearch) {
      prodsCopy = prodsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      prodsCopy = prodsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      prodsCopy = prodsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(prodsCopy);
  }; */

  const sortProducts = () => {
    let filtProducts = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(filtProducts.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(filtProducts.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
          />
        </p>
        {/* Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>

        {/* Subcategory Filter*/}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Top-wear"}
                onChange={toggleSubCategory}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottom-wear"}
                onChange={toggleSubCategory}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winter-wear"}
                onChange={toggleSubCategory}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product sort */}
          <label htmlFor="productSort">Sort products</label>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
