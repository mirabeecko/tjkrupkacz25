import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const Kosik: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, loading } = useCart();
  const navigate = useNavigate();

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Nepodařilo se aktualizovat množství');
    }
  };

  const handleRemoveItem = async (itemId: number, productName: string) => {
    try {
      await removeFromCart(itemId);
      toast.success(`${productName} byl odebrán z košíku`);
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Nepodařilo se odebrat produkt');
    }
  };

  const handleCheckout = () => {
    navigate('/pokladna');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Košík | TJ Krupka"
        description="Váš nákupní košík v TJ Krupka e-shopu"
      />
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-tjk-blue via-blue-900 to-tjk-blue text-white py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
                <ShoppingCart className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-semibold">Váš košík</span>
              </div>

              <h1 className="font-montserrat font-black text-4xl md:text-5xl mb-4">
                Nákupní košík
              </h1>

              <p className="text-lg md:text-xl text-white/90">
                {cartCount > 0 ? `${cartCount} ${cartCount === 1 ? 'položka' : cartCount < 5 ? 'položky' : 'položek'} v košíku` : 'Váš košík je prázdný'}
              </p>
            </div>
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            {cartCount === 0 ? (
              <div className="text-center py-20">
                <ShoppingCart className="h-32 w-32 text-gray-300 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-700 mb-4">Váš košík je prázdný</h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Přidejte si do něj produkty z našeho e-shopu
                </p>
                <Link to="/eshop">
                  <Button size="lg" className="bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Přejít do e-shopu
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-tjk-blue">
                      Položky v košíku ({cartCount})
                    </h2>
                    <Link to="/eshop">
                      <Button variant="outline" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Pokračovat v nákupu
                      </Button>
                    </Link>
                  </div>

                  {cart.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-lg bg-gray-100 overflow-hidden">
                              {item.product.images && item.product.images.length > 0 ? (
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                  <ShoppingCart className="h-8 w-8" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-lg font-bold text-tjk-blue mb-1">
                                  {item.product.name}
                                </h3>
                                {item.product.short_description && (
                                  <p className="text-sm text-gray-600 line-clamp-1">
                                    {item.product.short_description}
                                  </p>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(item.id, item.product.name)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                disabled={loading}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">Množství:</span>
                                <div className="flex items-center gap-2 border rounded-lg">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    disabled={loading || item.quantity <= 1}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <Input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const value = parseInt(e.target.value);
                                      if (!isNaN(value) && value > 0) {
                                        handleQuantityChange(item.id, value);
                                      }
                                    }}
                                    className="w-16 h-8 text-center border-0 focus-visible:ring-0"
                                    min="1"
                                    disabled={loading}
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    disabled={loading}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <div className="text-xl font-bold text-tjk-blue">
                                  {(item.price * item.quantity).toLocaleString('cs-CZ')} Kč
                                </div>
                                <div className="text-sm text-gray-500">
                                  {item.price.toLocaleString('cs-CZ')} Kč / ks
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-4">
                    <CardHeader>
                      <CardTitle className="text-2xl text-tjk-blue">Souhrn objednávky</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-gray-700">
                          <span>Mezisoučet:</span>
                          <span className="font-semibold">{cartTotal.toLocaleString('cs-CZ')} Kč</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>Doprava:</span>
                          <span className="font-semibold text-green-600">Zdarma</span>
                        </div>
                        <div className="border-t pt-3 mt-3">
                          <div className="flex justify-between text-xl font-bold text-tjk-blue">
                            <span>Celkem:</span>
                            <span>{cartTotal.toLocaleString('cs-CZ')} Kč</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                        <p className="font-semibold mb-1">Doprava zdarma!</p>
                        <p>Pro všechny objednávky nad 500 Kč</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-3">
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90 text-lg py-6"
                        onClick={handleCheckout}
                        disabled={loading}
                      >
                        Přejít k pokladně
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Link to="/eshop" className="w-full">
                        <Button variant="outline" size="lg" className="w-full">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Pokračovat v nákupu
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  {/* Trust Badges */}
                  <Card className="mt-4">
                    <CardContent className="p-6">
                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-start gap-3">
                          <div className="text-green-600 text-xl">✓</div>
                          <div>
                            <p className="font-semibold text-gray-800">Bezpečná platba</p>
                            <p>Stripe & ComGate zabezpečení</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="text-green-600 text-xl">✓</div>
                          <div>
                            <p className="font-semibold text-gray-800">Rychlé doručení</p>
                            <p>Do 3 pracovních dnů</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="text-green-600 text-xl">✓</div>
                          <div>
                            <p className="font-semibold text-gray-800">14denní vrácení</p>
                            <p>Zboží bez problémů vrátíte</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Kosik;
