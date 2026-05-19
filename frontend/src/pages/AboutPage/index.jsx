export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Hero Section */}

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About SnapBuy
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            SnapBuy is a production-style full stack ecommerce platform engineered with
            scalable backend architecture, secure authentication systems, responsive frontend
            engineering, and real-world ecommerce workflows. The project was designed and
            developed by <span className="font-semibold text-black">Ranjan Singh</span>
            {' '}with a strong focus on clean architecture, modular backend design,
            multi-vendor ecommerce systems, and modern responsive UI development.
          </p>
        </div>


        {/* Platform Architecture */}

        <div className="grid md:grid-cols-2 gap-8 mb-12">

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-6">
              Platform Architecture
            </h2>

            <ul className="space-y-4 text-gray-700 leading-relaxed">
              <li>
                • Production-style layered backend architecture
              </li>

              <li>
                • Routes → Controllers → Services → Database structure
              </li>

              <li>
                • Fully asynchronous FastAPI + MongoDB backend
              </li>

              <li>
                • Modular service-based backend engineering
              </li>

              <li>
                • Multi-vendor ecommerce workflow implementation
              </li>

              <li>
                • Public, customer, and merchant user flows
              </li>

              <li>
                • Snapshot-based order persistence system
              </li>
            </ul>
          </div>


          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-6">
              Tech Stack
            </h2>

            <ul className="space-y-4 text-gray-700 leading-relaxed">
              <li>
                <span className="font-semibold">Frontend:</span>{' '}
                React + Tailwind CSS
              </li>

              <li>
                <span className="font-semibold">Backend:</span>{' '}
                FastAPI (Async Python)
              </li>

              <li>
                <span className="font-semibold">Database:</span>{' '}
                MongoDB + Motor Async Driver
              </li>

              <li>
                <span className="font-semibold">State Management:</span>{' '}
                Zustand
              </li>

              <li>
                <span className="font-semibold">Authentication:</span>{' '}
                JWT + HTTP-only Cookie Sessions
              </li>

              <li>
                <span className="font-semibold">Payments:</span>{' '}
                Razorpay Integration
              </li>

              <li>
                <span className="font-semibold">Media Storage:</span>{' '}
                Cloudinary
              </li>
            </ul>
          </div>

        </div>


        {/* Core Features */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-12">

          <h2 className="text-3xl font-bold mb-8">
            Core Features
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-gray-700 leading-relaxed">

            <div>
              <h3 className="text-xl font-semibold mb-4 text-black">
                Customer Features
              </h3>

              <ul className="space-y-3">
                <li>• Secure authentication and protected routes</li>
                <li>• Dynamic product search and category filtering</li>
                <li>• Layered category + subcategory filtering</li>
                <li>• Responsive shopping cart system</li>
                <li>• Wishlist management system</li>
                <li>• Razorpay checkout integration</li>
                <li>• Persistent order history</li>
                <li>• Snapshot-based product storage in orders</li>
                <li>• Checkout success and failure handling</li>
                <li>• Dynamic profile and address management</li>
              </ul>
            </div>


            <div>
              <h3 className="text-xl font-semibold mb-4 text-black">
                Merchant Features
              </h3>

              <ul className="space-y-3">
                <li>• Multi-vendor product management</li>
                <li>• Product upload and deletion system</li>
                <li>• Cloudinary image upload handling</li>
                <li>• Merchant-specific dashboard analytics</li>
                <li>• Product ownership protection</li>
                <li>• Merchant order management workflow</li>
                <li>• Order fulfillment lifecycle handling</li>
                <li>• SEO-friendly slug generation</li>
                <li>• Responsive merchant dashboard UI</li>
                <li>• Secure role-based authorization</li>
              </ul>
            </div>

          </div>

        </div>


        {/* Engineering Highlights */}

        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-xl font-bold mb-4">
              Security
            </h3>

            <p className="text-gray-600 leading-relaxed">
              SnapBuy uses JWT authentication with secure HTTP-only cookie sessions,
              bcrypt password hashing, protected APIs, token verification middleware,
              role-based authorization, and environment-variable-based secret management.
            </p>
          </div>


          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-xl font-bold mb-4">
              Performance
            </h3>

            <p className="text-gray-600 leading-relaxed">
              The backend uses asynchronous MongoDB queries, lightweight response
              projections, optimized database operations, and modular service-layer
              architecture for scalable and maintainable backend engineering.
            </p>
          </div>


          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-xl font-bold mb-4">
              Frontend Engineering
            </h3>

            <p className="text-gray-600 leading-relaxed">
              The frontend was designed with responsive ecommerce layouts, reusable
              component systems, responsive sidebar architecture, dashboard-style UI,
              modern product cards, smooth transitions, and mobile-first design patterns.
            </p>
          </div>

        </div>


        {/* Final Section */}

        <div className="bg-gradient-to-r from-black to-zinc-800 text-white rounded-3xl p-10 shadow-lg text-center">

          <h2 className="text-4xl font-bold mb-5">
            Built by Ranjan Singh
          </h2>

          <p className="text-zinc-200 text-lg max-w-4xl mx-auto leading-relaxed">
            SnapBuy was developed as a real-world ecommerce engineering project focused
            on scalable backend systems, production-style architecture, secure authentication,
            async API development, responsive frontend engineering, and complete ecommerce
            workflow implementation using modern full stack technologies.
          </p>

        </div>

      </div>
    </div>
  )
}