import React, { useState } from "react";
import { IProduct } from "../models";
import ErrorMessage from "./ErrorMessage";

const initialProductData: IProduct = {
  id: 7,
  title: "White Gold Plated Princess",
  price: 9.99,
  description:
    "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
  category: "jewelery",
  image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  rating: {
    rate: 3,
    count: 400,
  },
};

interface CreateProductProps {
  onCreate: (product: IProduct) => void;
}

export default function CreateProduct({ onCreate }: CreateProductProps) {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (value.trim().length === 0) {
      setError("Please enter a valid title");
      return;
    }

    const productData = { ...initialProductData, title: value };

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(productData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: IProduct) => {
        onCreate(data);
      })
      .catch((err) => {
        setError("An error occurred while creating the product.");
        console.error(err);
      });
  };

  return (
    <form className="max-w-md mx-auto p-4" onSubmit={submitHandler}>
      <div className="flex flex-col">
        <input
          type="text"
          className="border border-gray-500 py-2 px-4 mb-2 w-full"
          placeholder="Enter product title..."
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }}
          value={value}
        />
        <div className="mt-2">
          <ErrorMessage error={error} />
          <button type="submit" className="py-2 px-4 border bg-yellow-400">
            Create
          </button>
        </div>
      </div>
    </form>
  );
}
