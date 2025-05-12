export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-midnight-blue mb-6">
        Midnight Magnolia
      </h1>
      <p className="text-xl text-midnight-teal mb-8">
        A Southern Digital Sanctuary
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <a href="/pages" className="btn btn-primary px-8 py-3">
          Visit Pages Router Version
        </a>
      </div>
    </main>
  );
}