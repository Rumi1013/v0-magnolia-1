import { ProductCatalog } from "@/components/product-catalog"

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-[#FAF3E0] mb-4">Our Products</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore our collection of Southern-inspired digital and physical products designed to enhance your life and
          business.
        </p>
      </div>

      <ProductCatalog />
    </div>
  )
}
