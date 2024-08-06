// src/hooks/useProducts.ts
import { useState, useEffect } from "react";
import { IProduct } from "../models";

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function addProduct(product: IProduct) {
    setProducts((prev) => [...prev, product]);
  }

  async function fetchProducts() {
    try {
      setError("");
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products?limit=6");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setProducts(json);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, error, loading, addProduct };
}
