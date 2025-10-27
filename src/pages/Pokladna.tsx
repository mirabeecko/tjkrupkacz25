import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ShoppingCart, CreditCard, Building2, Loader2, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import { PAYMENT_METHODS, type PaymentMethod } from '@/config/payment';

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddressLine1: string;
  shippingAddressLine2: string;
  shippingCity: string;
  shippingPostalCode: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingCity: string;
  billingPostalCode: string;
  billingCompany: string;
  billingIco: string;
  billingDic: string;
  customerNote: string;
}

const Pokladna: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [needsInvoice, setNeedsInvoice] = useState(false);

  const { cart, cartCount, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CheckoutForm>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    shippingAddressLine1: '',
    shippingAddressLine2: '',
    shippingCity: '',
    shippingPostalCode: '',
    billingAddressLine1: '',
    billingAddressLine2: '',
    billingCity: '',
    billingPostalCode: '',
    billingCompany: '',
    billingIco: '',
    billingDic: '',
    customerNote: '',
  });

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  useEffect(() => {
    if (cartCount === 0) {
      navigate('/kosik');
    }
  }, [cartCount, navigate]);

  useEffect(() => {
    // Load user data if logged in
    const loadUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setFormData(prev => ({
          ...prev,
          email: user.email || '',
          firstName: user.user_metadata?.first_name || '',
          lastName: user.user_metadata?.last_name || '',
        }));
      }
    };
    loadUserData();
  }, []);

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast.error('Vyplňte prosím všechna povinná pole');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Zadejte platnou e-mailovou adresu');
      return false;
    }

    // Check if cart contains physical products that need shipping
    const hasPhysicalProducts = cart.some(item => item.product.type === 'physical');

    if (hasPhysicalProducts) {
      if (!formData.shippingAddressLine1 || !formData.shippingCity || !formData.shippingPostalCode) {
        toast.error('Vyplňte prosím dodací adresu');
        return false;
      }
    }

    if (needsInvoice) {
      if (!formData.billingCompany || !formData.billingIco) {
        toast.error('Vyplňte prosím fakturační údaje');
        return false;
      }
    }

    return true;
  };

  const createOrder = async () => {
    try {
      setLoading(true);

      if (!validateForm()) {
        setLoading(false);
        return;
      }

      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('tjkshop_orders')
        .insert({
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone || null,
          shipping_address_line1: formData.shippingAddressLine1 || null,
          shipping_address_line2: formData.shippingAddressLine2 || null,
          shipping_city: formData.shippingCity || null,
          shipping_postal_code: formData.shippingPostalCode || null,
          shipping_country: 'CZ',
          billing_address_line1: sameAsShipping ? formData.shippingAddressLine1 : formData.billingAddressLine1 || null,
          billing_address_line2: sameAsShipping ? formData.shippingAddressLine2 : formData.billingAddressLine2 || null,
          billing_city: sameAsShipping ? formData.shippingCity : formData.billingCity || null,
          billing_postal_code: sameAsShipping ? formData.shippingPostalCode : formData.billingPostalCode || null,
          billing_country: 'CZ',
          billing_company: formData.billingCompany || null,
          billing_ico: formData.billingIco || null,
          billing_dic: formData.billingDic || null,
          subtotal: cartTotal,
          shipping_cost: 0,
          tax: 0,
          discount: 0,
          total: cartTotal,
          status: 'pending',
          payment_status: 'unpaid',
          payment_method: paymentMethod,
          customer_note: formData.customerNote || null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_sku: item.product.sku,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('tjkshop_order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Process payment based on selected method
      if (paymentMethod === 'stripe') {
        await processStripePayment(order);
      } else if (paymentMethod === 'comgate') {
        await processComGatePayment(order);
      }

    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Nepodařilo se vytvořit objednávku');
      setLoading(false);
    }
  };

  const processStripePayment = async (order: any) => {
    try {
      // Call Stripe payment Edge Function
      const { data, error } = await supabase.functions.invoke('create-stripe-payment', {
        body: {
          orderId: order.id,
          orderNumber: order.order_number,
          amount: order.total,
          email: order.email,
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No payment URL returned');
      }
    } catch (error) {
      console.error('Stripe payment error:', error);
      toast.error('Nepodařilo se zahájit platbu kartou');
      setLoading(false);
    }
  };

  const processComGatePayment = async (order: any) => {
    try {
      // Call ComGate payment Edge Function
      const { data, error } = await supabase.functions.invoke('create-comgate-payment', {
        body: {
          orderId: order.id,
          orderNumber: order.order_number,
          amount: order.total,
          email: order.email,
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Redirect to ComGate payment gateway
        window.location.href = data.url;
      } else {
        throw new Error('No payment URL returned');
      }
    } catch (error) {
      console.error('ComGate payment error:', error);
      toast.error('Nepodařilo se zahájit platbu');
      setLoading(false);
    }
  };

  const hasPhysicalProducts = cart.some(item => item.product.type === 'physical');

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Pokladna | Tělovýchovná jednota Krupka"
        description="Dokončete nákup v e-shopu Tělovýchovné jednoty Krupka"
      />
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-tjk-blue via-blue-900 to-tjk-blue text-white py-12">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-montserrat font-black text-3xl md:text-4xl mb-2">
                Pokladna
              </h1>
              <p className="text-lg text-white/90">
                Už jen krůček k dokončení objednávky
              </p>
            </div>
          </div>
        </section>

        {/* Checkout Form */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-tjk-blue">Kontaktní údaje</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="vas@email.cz"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Jméno *</Label>
                        <Input
                          id="firstName"
                          placeholder="Jan"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Příjmení *</Label>
                        <Input
                          id="lastName"
                          placeholder="Novák"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+420 123 456 789"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                {hasPhysicalProducts && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-tjk-blue">Dodací adresa</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="shippingAddressLine1">Ulice a číslo popisné *</Label>
                        <Input
                          id="shippingAddressLine1"
                          placeholder="Hlavní 123"
                          value={formData.shippingAddressLine1}
                          onChange={(e) => handleInputChange('shippingAddressLine1', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="shippingAddressLine2">Další adresa (volitelné)</Label>
                        <Input
                          id="shippingAddressLine2"
                          placeholder="Byt 4"
                          value={formData.shippingAddressLine2}
                          onChange={(e) => handleInputChange('shippingAddressLine2', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shippingCity">Město *</Label>
                          <Input
                            id="shippingCity"
                            placeholder="Praha"
                            value={formData.shippingCity}
                            onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="shippingPostalCode">PSČ *</Label>
                          <Input
                            id="shippingPostalCode"
                            placeholder="110 00"
                            value={formData.shippingPostalCode}
                            onChange={(e) => handleInputChange('shippingPostalCode', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Invoice Option */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-tjk-blue">Fakturační údaje</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="needsInvoice"
                        checked={needsInvoice}
                        onCheckedChange={(checked) => setNeedsInvoice(checked as boolean)}
                      />
                      <Label htmlFor="needsInvoice" className="cursor-pointer">
                        Chci fakturu na firmu
                      </Label>
                    </div>

                    {needsInvoice && (
                      <>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="sameAsShipping"
                            checked={sameAsShipping}
                            onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                          />
                          <Label htmlFor="sameAsShipping" className="cursor-pointer">
                            Fakturační adresa stejná jako dodací
                          </Label>
                        </div>

                        <div>
                          <Label htmlFor="billingCompany">Název firmy *</Label>
                          <Input
                            id="billingCompany"
                            placeholder="Moje firma s.r.o."
                            value={formData.billingCompany}
                            onChange={(e) => handleInputChange('billingCompany', e.target.value)}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="billingIco">IČO *</Label>
                            <Input
                              id="billingIco"
                              placeholder="12345678"
                              value={formData.billingIco}
                              onChange={(e) => handleInputChange('billingIco', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="billingDic">DIČ</Label>
                            <Input
                              id="billingDic"
                              placeholder="CZ12345678"
                              value={formData.billingDic}
                              onChange={(e) => handleInputChange('billingDic', e.target.value)}
                            />
                          </div>
                        </div>

                        {!sameAsShipping && (
                          <>
                            <div>
                              <Label htmlFor="billingAddressLine1">Ulice a číslo popisné</Label>
                              <Input
                                id="billingAddressLine1"
                                placeholder="Hlavní 123"
                                value={formData.billingAddressLine1}
                                onChange={(e) => handleInputChange('billingAddressLine1', e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="billingCity">Město</Label>
                                <Input
                                  id="billingCity"
                                  placeholder="Praha"
                                  value={formData.billingCity}
                                  onChange={(e) => handleInputChange('billingCity', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="billingPostalCode">PSČ</Label>
                                <Input
                                  id="billingPostalCode"
                                  placeholder="110 00"
                                  value={formData.billingPostalCode}
                                  onChange={(e) => handleInputChange('billingPostalCode', e.target.value)}
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-tjk-blue">Způsob platby</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="stripe" id="stripe" className="mt-1" />
                          <Label htmlFor="stripe" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2 mb-1">
                              <CreditCard className="h-5 w-5 text-blue-600" />
                              <span className="font-bold text-lg">{PAYMENT_METHODS.stripe.name}</span>
                            </div>
                            <p className="text-sm text-gray-600">{PAYMENT_METHODS.stripe.description}</p>
                            <div className="flex gap-2 mt-2">
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Visa</span>
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Mastercard</span>
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Apple Pay</span>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="comgate" id="comgate" className="mt-1" />
                          <Label htmlFor="comgate" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2 mb-1">
                              <Building2 className="h-5 w-5 text-green-600" />
                              <span className="font-bold text-lg">{PAYMENT_METHODS.comgate.name}</span>
                            </div>
                            <p className="text-sm text-gray-600">{PAYMENT_METHODS.comgate.description}</p>
                            <div className="flex gap-2 mt-2">
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Bankovní převod</span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">QR platba</span>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Customer Note */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-tjk-blue">Poznámka k objednávce</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label htmlFor="customerNote">Máte nějaké speciální přání?</Label>
                    <textarea
                      id="customerNote"
                      rows={4}
                      className="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tjk-blue"
                      placeholder="Napište nám..."
                      value={formData.customerNote}
                      onChange={(e) => handleInputChange('customerNote', e.target.value)}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-2xl text-tjk-blue">Souhrn objednávky</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Cart Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3 pb-3 border-b">
                          <div className="w-16 h-16 rounded bg-gray-100 flex-shrink-0 overflow-hidden">
                            {item.product.images && item.product.images.length > 0 ? (
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-400">
                                <ShoppingCart className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-gray-500">Množství: {item.quantity}</p>
                            <p className="text-sm font-bold text-tjk-blue mt-1">
                              {(item.price * item.quantity).toLocaleString('cs-CZ')} Kč
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Summary */}
                    <div className="space-y-3 pt-3 border-t">
                      <div className="flex justify-between text-gray-700">
                        <span>Mezisoučet:</span>
                        <span className="font-semibold">{cartTotal.toLocaleString('cs-CZ')} Kč</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Doprava:</span>
                        <span className="font-semibold text-green-600">Zdarma</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between text-xl font-bold text-tjk-blue">
                          <span>Celkem:</span>
                          <span>{cartTotal.toLocaleString('cs-CZ')} Kč</span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90 text-lg py-6 mt-4"
                      onClick={createOrder}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Zpracovávám...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-5 w-5" />
                          Dokončit objednávku
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Kliknutím na tlačítko souhlasíte s našimi{' '}
                      <a href="/podminky-pouziti" className="text-tjk-blue hover:underline">
                        obchodními podmínkami
                      </a>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pokladna;
