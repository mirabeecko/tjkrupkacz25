import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  sale_price: number | null;
  sku: string;
  stock_quantity: number;
  category: string;
  type: string;
  images: string[];
  metadata: any;
  is_active: boolean;
  featured: boolean;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);

  // Načtení košíku při načtení komponenty
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);

      // Získat nebo vytvořit session ID
      let sessionId = localStorage.getItem('cart_session_id');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('cart_session_id', sessionId);
      }

      // Zkontrolovat, jestli uživatel není přihlášený
      const { data: { user } } = await supabase.auth.getUser();

      // Načíst košík z DB
      const { data: cartData, error: cartError } = await supabase
        .from('tjkshop_cart')
        .select('id')
        .or(user ? `user_id.eq.${user.id}` : `session_id.eq.${sessionId}`)
        .single();

      if (cartError && cartError.code !== 'PGRST116') {
        console.error('Error loading cart:', cartError);
        return;
      }

      let currentCartId = cartData?.id;

      // Pokud košík neexistuje, vytvořit nový
      if (!currentCartId) {
        const { data: newCart, error: createError } = await supabase
          .from('tjkshop_cart')
          .insert({
            user_id: user?.id || null,
            session_id: sessionId,
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 dní
          })
          .select('id')
          .single();

        if (createError) {
          console.error('Error creating cart:', createError);
          return;
        }

        currentCartId = newCart.id;
      }

      setCartId(currentCartId);

      // Načíst položky košíku
      if (currentCartId) {
        const { data: items, error: itemsError } = await supabase
          .from('tjkshop_cart_items')
          .select(`
            id,
            quantity,
            price,
            product:tjkshop_products (*)
          `)
          .eq('cart_id', currentCartId);

        if (itemsError) {
          console.error('Error loading cart items:', itemsError);
          return;
        }

        setCart(items || []);
      }
    } catch (error) {
      console.error('Error in loadCart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    try {
      setLoading(true);

      if (!cartId) {
        await loadCart();
        return;
      }

      // Zkontrolovat, jestli produkt už není v košíku
      const existingItem = cart.find(item => item.product.id === product.id);

      if (existingItem) {
        // Aktualizovat množství
        await updateQuantity(existingItem.id, existingItem.quantity + quantity);
      } else {
        // Přidat novou položku
        const { data, error } = await supabase
          .from('tjkshop_cart_items')
          .insert({
            cart_id: cartId,
            product_id: product.id,
            quantity,
            price: product.sale_price || product.price
          })
          .select(`
            id,
            quantity,
            price,
            product:tjkshop_products (*)
          `)
          .single();

        if (error) throw error;

        setCart([...cart, data]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('tjkshop_cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setCart(cart.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      setLoading(true);

      if (quantity <= 0) {
        await removeFromCart(itemId);
        return;
      }

      const { error } = await supabase
        .from('tjkshop_cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;

      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);

      if (!cartId) return;

      const { error } = await supabase
        .from('tjkshop_cart_items')
        .delete()
        .eq('cart_id', cartId);

      if (error) throw error;

      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
