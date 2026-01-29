import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { ProductCard } from '@/app/components/ProductCard';
import { Footer } from '@/app/components/Footer';
import { products } from '@/data/products';
import { benefits } from '@/data/benefits';

export default function App() {

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <Header />
      <Hero />

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div 
                key={benefit.id} 
                className="bg-white p-4 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base text-[#2B5142] font-semibold">{benefit.title}</h3>
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-[#8B7BA8]/20 rounded-full text-[#2B5142] flex-shrink-0">
                    {benefit.icon}
                  </div>
                </div>
                <p className="text-sm text-[#2B5142]/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2B5142] mb-4">A blend for every ritual</h2>
            <p className="text-lg text-[#2B5142]/70 max-w-2xl mx-auto">
              Explore blends for different moments and intentions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-[#8B7BA8]/10 to-[#C67C4F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl text-[#2B5142] mb-6">
                Nature's Answer to Healthy Living
              </h2>
              <p className="text-lg text-[#2B5142]/80 mb-6">
                At Piantasia, we believe in the power of nature to provide healthier alternatives. 
                Our herbal smoking blends are crafted from carefully selected organic herbs and botanicals, 
                offering a satisfying experience without the harmful effects of tobacco and nicotine.
              </p>
              <p className="text-lg text-[#2B5142]/80">
                Each blend is a result of extensive research and traditional herbal knowledge, 
                combined with modern craftsmanship to ensure the perfect balance of flavor and quality.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1682845509612-57ffca78c0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwcGxhbnRzJTIwbGVhdmVzfGVufDF8fHx8MTc2ODkzNjc0OXww&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Natural herbs" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}