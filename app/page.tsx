export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Product Showcase</h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Discover amazing products from our curated collection
              </p>
            </div>
          </div>
        </div>
      </header>

      
    </div>
  );
}
