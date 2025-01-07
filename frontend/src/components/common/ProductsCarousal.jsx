import React, { useReducer, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import ProductSkeleton from "../skeletons/productCarousel";
import { IoCartOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai"; 
import { useTranslation } from "react-i18next";


const initialState = { cart: [], showCart: false };

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "TOGGLE_CART":
      return { ...state, showCart: !state.showCart };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

const ProductsVerticalCarousel = () => {
const {t}= useTranslation()

  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["products", page],
    queryFn: () =>
      fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${
          (page - 1) * 10
        }&limit=3`
      ).then((res) => res.json()),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const products = data ? data : [];

  const handleNext = () => {
    if (currentIndex + 1 < data.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (hasMoreProducts) {
      setPage((prevPage) => prevPage + 1);
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    if (data && data.length < 3) {
      setHasMoreProducts(false);
    }
  }, [data]);

  if (isLoading)
    return (
      <div>
        <ProductSkeleton />
      </div>
    );
  if (error) return <div>Error fetching products: {error.message}</div>;

  const addToCart = (event, product) => {
    event.preventDefault();
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const toggleCart = () => {
    console.log("toggle cart");
    dispatch({ type: "TOGGLE_CART" });
  };

  const removeFromCart = (index) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: index });
  };
  console.log("state", state);

  return (
    <div
      className="carousel-container hidden lg:block my-4 ml-4 bg-[#4eb84c] rounded-md"
      style={{
        position: "relative",
        width: "310px",
        height: "300px",
        overflow: "hidden",
      }}
    >
      <div className="flex justify-between items-center bg-white shadow-md z-50 relative py-3 px-6">
        <p className="text-start font-bold text-lg text-gray-800">
          {t('shop_here')}
        </p>
        <div
          className="flex items-center cursor-pointer relative"
          onClick={toggleCart}
        >
          <IoCartOutline className="h-8 w-8 text-gray-700 hover:text-gray-900 transition-colors duration-200" />
          {state.cart.length > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-2 text-xs font-semibold">
              {state.cart.length}
            </span>
          )}
        </div>
      </div>

      <div className="bg-[#4eb84c] rounded-md h-auto">
        {data?.length > 0 && (
          <div
            className="carousel-content"
            style={{
              transform: `translateY(-${currentIndex * 33.33}%)`,
              transition: "transform 0.5s ease",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {data.map((product, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                  textAlign: "start",
                  backgroundColor: "transparent",
                  height: "33.33%",
                  width: "80%",
                }}
                className="border-2 border-[#ffffff] rounded-md my-2 mx-4"
              >
                <h3
                  className="text-black text-ellipsis pb-2"
                  style={{
                    width: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.title}
                </h3>
                <div className="flex gap-2 pb-2">
                  <div>
                    <img
                      src={product.images[0]}
                      loading="lazy"
                      alt={product.title}
                      style={{ width: "80px", height: "80px" }}
                      className="border-[#ffffff] border-2 rounded-md"
                    />
                  </div>
                  <p className="description text-white w-40 h-20 text-wrap overflow-hidden line-height-1">
                    {product.description}
                  </p>
                </div>
                <button
                  className="text-white mt-2 w-32 bg-gradient-to-r from-black to-white-700 hover:from-white-600 hover:to-green-800 rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                  onClick={(event) => addToCart(event, product)}
                >
                  <div className="flex items-center gap-2 border border-transparent hover:border-white rounded-md p-2 w-full justify-center">
                    <CiCirclePlus className="font-bold text-xl" />
                    <span className="to-cart font-medium text-sm uppercase">
                      {t('cart')}
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Arrow Buttons for Navigation */}
      <button
        onClick={handlePrev}
        className="carousel-arrow prev rounded-full"
        style={{
          position: "absolute",
          left: "50%",
          top: "10px",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          padding: "10px",
          border: "none",
          cursor: "pointer",
          zIndex: 500,
        }}
      >
        <FaArrowUp size={20} />
      </button>
      <button
        onClick={handleNext}
        className="carousel-arrow next rounded-full"
        style={{
          position: "absolute",
          left: "50%",
          bottom: "10px",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          padding: "10px",
          border: "none",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        {isFetching ? <span>Loading...</span> : <FaArrowDown size={20} />}
      </button>


      {state.showCart && (
        <div
          className="cart-slide-in"
          style={{
            position: "absolute", 
            top: 0,
            left: 0,
            width: "100%", 
            height: "100%",
            backgroundColor: "#fff",
            boxShadow: "2px 0 5px rgba(0,0,0,0.5)",
            zIndex: 500, 
            transform: "translateX(0)",
            transition: "transform 0.3s ease-in-out",
            overflowY: "hidden",
          }}
        >
          <div className="flex justify-between items-center bg-green-500 p-4">
            <h3 className="font-bold text-lg text-white-500">Cart</h3>
            <button onClick={toggleCart}>
              <AiOutlineClose size={24} className="text-orange-500" />
            </button>
          </div>
          <div className="p-4">
          <div className="cart-items flex flex-col mt-4 ">
            {state.cart.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              state.cart.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border-2 rounded-md my-1 border-[#4eb84c]"
                >
                  <p className="text-black text-start">{product.title}</p>
                  <button
                    className="text-red-500"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsVerticalCarousel;
