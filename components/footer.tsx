import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AI Shop</h3>
            <p className="text-gray-600">Enhancing your shopping experience with artificial intelligence.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-primary">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-600 hover:text-primary">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/new" className="text-gray-600 hover:text-primary">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-gray-600 hover:text-primary">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-600 hover:text-primary">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-gray-600 hover:text-primary">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/recommendations/user123" className="text-gray-600 hover:text-primary">
                  Recommendations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} AI Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

