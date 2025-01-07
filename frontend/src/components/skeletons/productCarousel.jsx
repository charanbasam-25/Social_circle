const ProductSkeleton = () => {
  return (
    <div className="carousel-container skeleton hidden md:block">
      <div className="carousel-content skeleton flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="product-item skeleton bg-gray-200 p-2 rounded-md ml-4 mr-4 mt-4"
          >
            <div className="flex gap-1">
              <div className="skeleton w-10 h-20 bg-gray-300 rounded-md"></div>

              <div className="flex flex-col gap-1 w-full">
                <div className="skeleton h-4 w-2/3 rounded-md"></div>
                <div className="skeleton h-4 w-1/2 rounded-md"></div>

                <div className="skeleton h-10 w-24 rounded-md bg-gray-300"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSkeleton;
