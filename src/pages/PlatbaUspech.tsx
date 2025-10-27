import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Download, Package, Mail } from 'lucide-react';
import { supabase } from '@/supabaseClient';
import { useCart } from '@/context/CartContext';

const PlatbaUspech: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart();

  const orderId = searchParams.get('order_id');

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  useEffect(() => {
    const loadOrderDetails = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const { data: order, error } = await supabase
          .from('tjkshop_orders')
          .select(`
            *,
            items:tjkshop_order_items(*)
          `)
          .eq('id', orderId)
          .single();

        if (error) throw error;

        setOrderDetails(order);

        // Clear cart after successful payment
        await clearCart();
      } catch (error) {
        console.error('Error loading order:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrderDetails();
  }, [orderId]);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Platba úspěšná | Tělovýchovná jednota Krupka"
        description="Vaše objednávka byla úspěšně vytvořena"
      />
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1 bg-gray-50">
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-tjk-blue mx-auto"></div>
                <p className="mt-4 text-gray-600">Načítám údaje o objednávce...</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                  <h1 className="font-montserrat font-black text-4xl md:text-5xl text-tjk-blue mb-4">
                    Děkujeme za objednávku!
                  </h1>
                  <p className="text-xl text-gray-600">
                    Vaše platba byla úspěšně zpracována
                  </p>
                </div>

                {orderDetails && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-2xl text-tjk-blue">
                        Objednávka #{orderDetails.order_number}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-bold text-gray-700 mb-2">Kontaktní údaje</h3>
                          <p className="text-gray-600">
                            {orderDetails.first_name} {orderDetails.last_name}
                          </p>
                          <p className="text-gray-600">{orderDetails.email}</p>
                          {orderDetails.phone && (
                            <p className="text-gray-600">{orderDetails.phone}</p>
                          )}
                        </div>

                        {orderDetails.shipping_address_line1 && (
                          <div>
                            <h3 className="font-bold text-gray-700 mb-2">Dodací adresa</h3>
                            <p className="text-gray-600">{orderDetails.shipping_address_line1}</p>
                            {orderDetails.shipping_address_line2 && (
                              <p className="text-gray-600">{orderDetails.shipping_address_line2}</p>
                            )}
                            <p className="text-gray-600">
                              {orderDetails.shipping_postal_code} {orderDetails.shipping_city}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="border-t pt-4">
                        <h3 className="font-bold text-gray-700 mb-3">Objednané položky</h3>
                        <div className="space-y-2">
                          {orderDetails.items?.map((item: any) => (
                            <div key={item.id} className="flex justify-between items-center py-2 border-b">
                              <div>
                                <p className="font-semibold">{item.product_name}</p>
                                <p className="text-sm text-gray-600">Množství: {item.quantity}</p>
                              </div>
                              <p className="font-bold text-tjk-blue">
                                {item.total_price.toLocaleString('cs-CZ')} Kč
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between text-xl font-bold text-tjk-blue">
                          <span>Celkem:</span>
                          <span>{orderDetails.total.toLocaleString('cs-CZ')} Kč</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Mail className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                      <h3 className="font-bold mb-2">E-mail s potvrzením</h3>
                      <p className="text-sm text-gray-600">
                        Potvrzení objednávky jsme vám zaslali na e-mail
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Package className="h-10 w-10 text-green-600 mx-auto mb-3" />
                      <h3 className="font-bold mb-2">Zpracování</h3>
                      <p className="text-sm text-gray-600">
                        Objednávku zpracujeme do 1-2 pracovních dnů
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Download className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                      <h3 className="font-bold mb-2">Vstupenky</h3>
                      <p className="text-sm text-gray-600">
                        Digitální vstupenky najdete ve vašem účtu
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/eshop">
                    <Button size="lg" variant="outline">
                      Pokračovat v nákupu
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button size="lg" className="bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90">
                      Zpět na hlavní stránku
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PlatbaUspech;
