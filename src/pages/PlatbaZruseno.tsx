import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle, ArrowLeft, ShoppingCart, HelpCircle } from 'lucide-react';

const PlatbaZruseno: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get('order_id');

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Platba zrušena | Tělovýchovná jednota Krupka"
        description="Platba byla zrušena"
      />
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1 bg-gray-50">
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
              <h1 className="font-montserrat font-black text-4xl md:text-5xl text-gray-800 mb-4">
                Platba byla zrušena
              </h1>
              <p className="text-xl text-gray-600">
                Vaše objednávka nebyla dokončena
              </p>
              {orderId && (
                <p className="text-gray-500 mt-2">
                  Číslo objednávky: #{orderId}
                </p>
              )}
            </div>

            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Co se stalo?</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-tjk-orange mt-1">•</span>
                    <span>Platba byla zrušena nebo vypršel časový limit pro dokončení platby</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-tjk-orange mt-1">•</span>
                    <span>Vaše objednávka zůstává v systému ve stavu "čeká na platbu"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-tjk-orange mt-1">•</span>
                    <span>Můžete se pokusit o platbu znovu nebo si produkty přidat znovu do košíku</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <ShoppingCart className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Zkuste to znovu</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Vraťte se do košíku a zkuste platbu znovu
                  </p>
                  <Link to="/kosik">
                    <Button className="w-full">
                      Zpět do košíku
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <HelpCircle className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Potřebujete pomoc?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Kontaktujte nás, rádi vám poradíme
                  </p>
                  <Link to="/kontakt">
                    <Button variant="outline" className="w-full">
                      Kontaktovat podporu
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/eshop">
                <Button size="lg" variant="outline">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Zpět do e-shopu
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90">
                  Zpět na hlavní stránku
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PlatbaZruseno;
