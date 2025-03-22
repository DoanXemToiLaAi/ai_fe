import { getHomeData } from "@/services/api"
import Link from "next/link"
import Image from "next/image"

export default async function Home() {
  const data = await getHomeData()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI-Powered E-commerce</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.featured_products.map((product) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <div className="group relative h-80 overflow-hidden rounded-lg">
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-200">{product.category}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Recommended For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.recommended_products.map((product) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <div className="group bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative h-64 w-full">
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

