import { useEffect, useState } from "react";

const API_URL = "https://dummyjson.com/products";

export default function useProduct(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/${productId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product.");
        }

        const data = await response.json();

        setProduct(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [productId]);

  return {
    product,
    loading,
    error,
  };
}