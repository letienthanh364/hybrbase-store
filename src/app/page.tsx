"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const { data: products } = useQuery(api.product.getProducts, {}) || {
    data: [],
    total: 0,
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      {products?.map((product) => <div key={product.id}>{product.name}</div>)}
    </main>
  );
}
