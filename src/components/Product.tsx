import { useState } from "react";
import { IProduct } from "../models";

interface ProductProps {
  product: IProduct;
}

export function Product({ product }: ProductProps) {
  const [details, setDetails] = useState(false);
  const btnClassName = details ? "bg-yellow-400" : "bg-blue-400";
  const btnClasses = ["py-2 px-2 border", btnClassName];

  return (
    <div className="border py-4 px-4 rounded flex flex-col items-center mb-4 w-full">
      <h2 className="text-xl font-bold text-center mb-2 w-full">
        {product.title}
      </h2>
      <img
        src={product.image}
        alt={product.title}
        className="w-32 h-32 object-cover mb-4"
      />
      <button
        className={btnClasses.join(" ")}
        onClick={() => {
          setDetails((prev) => !prev);
        }}
      >
        {details ? "Hide details" : "Show details"}
      </button>
      {details && (
        <div className="w-full">
          <p className="text-gray-700 text-sm mb-2 text-center">
            {product.description}
          </p>
          <span className="text-green-500 font-semibold text-sm">
            ${product.price}
          </span>
          <div className="text-xs text-gray-500 mt-1">
            <span className="font-bold">Rating: {product.rating.rate}</span>
            <span> (count: {product.rating.count})</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
