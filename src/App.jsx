import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Header() {
  return (
    <header className="relative z-10 py-10">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 font-bold shadow-[0_0_30px_rgba(59,130,246,0.35)]">Bb</div>
          <span className="text-white text-2xl font-semibold tracking-tight">Bb Fitness Store</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-blue-200/80">
          <a className="hover:text-white transition" href="#strength">Strength</a>
          <a className="hover:text-white transition" href="#cardio">Cardio</a>
          <a className="hover:text-white transition" href="#mobility">Mobility</a>
          <a className="hover:text-white transition" href="#accessories">Accessories</a>
        </nav>
      </div>
    </header>
  )
}

function ProductCard({ title, description, price, category }) {
  return (
    <div className="group rounded-2xl border border-slate-700/60 bg-slate-800/40 hover:bg-slate-800/60 transition p-5 shadow-xl">
      <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(147,197,253,0.25),transparent_45%)]" />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold tracking-tight">{title}</h3>
          {category && <p className="text-xs text-blue-300/70 mt-0.5">{category}</p>}
        </div>
        <div className="text-blue-300 font-semibold">${price.toFixed(2)}</div>
      </div>
      {description && (
        <p className="text-blue-100/80 text-sm mt-3 line-clamp-3">{description}</p>
      )}
      <button className="mt-4 w-full py-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 text-white text-sm font-medium transition">Add to cart</button>
    </div>
  )
}

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError('')
        // Attempt to seed first (no-op if already seeded)
        await fetch(`${API_BASE}/api/seed`, { method: 'POST' })
        const res = await fetch(`${API_BASE}/api/products`)
        const data = await res.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (e) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_10%_-10%,rgba(59,130,246,0.12),transparent),radial-gradient(600px_300px_at_90%_110%,rgba(147,197,253,0.12),transparent)]" />

      <Header />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <section className="text-center py-6 sm:py-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">Premium Gym Equipment</h1>
          <p className="mt-4 text-blue-200/80 text-lg">Curated gear for strength, cardio, and recovery — welcome to Bb.</p>
        </section>

        {loading ? (
          <div className="text-center text-blue-200">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-300">{error}</div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="products">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </section>
        )}
      </main>

      <footer className="relative z-10 border-t border-slate-800/60 py-8 mt-10">
        <div className="max-w-6xl mx-auto px-6 text-blue-300/70 text-sm flex items-center justify-between">
          <span>© {new Date().getFullYear()} Bb Fitness</span>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </footer>
    </div>
  )
}

export default App
