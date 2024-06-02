"use client";

import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import SearchBar from "./components/SearchBar";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-300  text-black">
      <header className="bg-gray-700 shadow ">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center text-white">
            Product Listing Page
          </h1>
        </div>
        <main className="container  mx-auto px-4 py-8">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

        {isLoading ? (
          <div className="text-center text-white">Please Wait🫷..</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-white">
            Sorry😔! No Product Found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      </header>

     
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}