import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ScrollAnimation from '@/components/ScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Search, Filter, Star, TrendingUp } from 'lucide-react';
import { supabase } from '@/supabaseClient';
import { useCart, type Product } from '@/context/CartContext';
import { toast } from 'sonner';

const Eshop: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { addToCart, cartCount } = useCart();

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('tjkshop_products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Nepodařilo se načíst produkty');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product, 1);
      toast.success(`${product.name} byl přidán do košíku`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Nepodařilo se přidat produkt do košíku');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'Vše' },
    { value: 'merch', label: 'Merch' },
    { value: 'equipment', label: 'Vybavení' },
    { value: 'ticket', label: 'Jízdenky' },
    { value: 'membership', label: 'Členství' },
  ];

  const getCategoryBadge = (category: string) => {
    const badges = {
      merch: { color: 'bg-purple-100 text-purple-700', label: 'Merch' },
      equipment: { color: 'bg-blue-100 text-blue-700', label: 'Vybavení' },
      ticket: { color: 'bg-green-100 text-green-700', label: 'Jízdenka' },
      membership: { color: 'bg-amber-100 text-amber-700', label: 'Členství' },
    };
    return badges[category as keyof typeof badges] || { color: 'bg-gray-100 text-gray-700', label: category };
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="E-shop | TJ Krupka"
        description="Nakupujte merch, vybavení, jízdenky a členství v TJ Krupka. Online platby kartou i bankovním převodem."
      />
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-tjk-blue via-blue-900 to-tjk-blue text-white py-20">
          <div className="container px-4 mx-auto">
            <ScrollAnimation animation="fade-up">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
                  <ShoppingCart className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm font-semibold">TJ Krupka E-shop</span>
                </div>

                <h1 className="font-montserrat font-black text-4xl md:text-6xl mb-6">
                  Nakupujte online
                </h1>

                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  Merch, vybavení, jízdenky a členství. Vše na jednom místě.
                </p>

                {cartCount > 0 && (
                  <Link to="/kosik">
                    <Button size="lg" className="bg-white text-tjk-blue hover:bg-gray-100 font-bold">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Košík ({cartCount})
                    </Button>
                  </Link>
                )}
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-96">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Hledat produkty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <Filter className="h-5 w-5 text-gray-600" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Kategorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingCart className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">Žádné produkty</h3>
                <p className="text-gray-600">Zkuste změnit filtr nebo vyhledávání</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => {
                  const categoryBadge = getCategoryBadge(product.category);

                  return (
                    <ScrollAnimation key={product.id} animation="fade-up" delay={index * 50}>
                      <Card className="group h-full flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <CardHeader className="p-0">
                          <div className="relative h-64 overflow-hidden rounded-t-lg bg-gray-100">
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-400">
                                <ShoppingCart className="h-16 w-16" />
                              </div>
                            )}

                            {product.featured && (
                              <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                                <Star className="h-3 w-3 mr-1" />
                                Doporučujeme
                              </Badge>
                            )}

                            <Badge className={`absolute top-2 left-2 ${categoryBadge.color}`}>
                              {categoryBadge.label}
                            </Badge>

                            {product.sale_price && (
                              <Badge className="absolute bottom-2 right-2 bg-red-500 text-white font-bold">
                                SLEVA
                              </Badge>
                            )}
                          </div>
                        </CardHeader>

                        <CardContent className="p-6 flex-1 flex flex-col">
                          <CardTitle className="text-xl font-bold text-tjk-blue mb-2 group-hover:text-tjk-orange transition-colors">
                            {product.name}
                          </CardTitle>

                          {product.short_description && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {product.short_description}
                            </p>
                          )}

                          <div className="mt-auto">
                            <div className="flex items-baseline gap-2 mb-4">
                              {product.sale_price ? (
                                <>
                                  <span className="text-2xl font-bold text-tjk-orange">
                                    {product.sale_price.toLocaleString('cs-CZ')} Kč
                                  </span>
                                  <span className="text-lg text-gray-400 line-through">
                                    {product.price.toLocaleString('cs-CZ')} Kč
                                  </span>
                                </>
                              ) : (
                                <span className="text-2xl font-bold text-tjk-blue">
                                  {product.price.toLocaleString('cs-CZ')} Kč
                                </span>
                              )}
                            </div>

                            {product.stock_quantity > 0 || product.type !== 'physical' ? (
                              <Button
                                className="w-full bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90"
                                onClick={() => handleAddToCart(product)}
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Do košíku
                              </Button>
                            ) : (
                              <Button className="w-full" disabled>
                                Vyprodáno
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollAnimation>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Eshop;
