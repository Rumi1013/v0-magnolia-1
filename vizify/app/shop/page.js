export default function Shop() {
  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-heading font-bold text-midnight-blue mb-6">
        Midnight Magnolia Shop
      </h1>
      <p className="text-xl text-midnight-teal mb-8">
        Explore our digital products for creativity, healing, and resilience.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Product grid will be populated dynamically */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-heading font-bold">Product Coming Soon</h2>
          <p className="mt-2 text-midnight-blue/80">Our products are being prepared for your journey.</p>
        </div>
      </div>
    </main>
  );
}