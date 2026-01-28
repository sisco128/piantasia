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
      {/* <Hero /> */}

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2B5142] mb-4">Unwind with Botanical Blends</h2>
            <p className="text-lg text-[#2B5142]/70 max-w-2xl mx-auto">
              Explore our collection of premium herbal smoking blends, each thoughtfully created to provide a unique experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[#2B5142] mb-4">Why Choose Piantasia?</h2>
            <p className="text-lg text-[#2B5142]/70 max-w-2xl mx-auto">
              We're committed to providing the highest quality herbal alternatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div 
                key={benefit.id} 
                className="bg-white p-8 rounded-2xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8B7BA8]/20 rounded-full text-[#2B5142] mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl text-[#2B5142] mb-2">{benefit.title}</h3>
                <p className="text-[#2B5142]/70">{benefit.description}</p>
              </div>
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
              <p className="text-lg text-[#2B5142]/80 mb-6">
                Each blend is a result of extensive research and traditional herbal knowledge, 
                combined with modern craftsmanship to ensure the perfect balance of flavor and quality.
              </p>
              <button className="bg-[#2B5142] text-white px-8 py-4 rounded-full hover:bg-[#1F3B2F] transition-all transform hover:scale-105">
                Our Story
              </button>
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