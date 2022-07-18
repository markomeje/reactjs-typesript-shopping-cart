import { createContext, useContext, ReactNode, useState } from "react";
import { Cart } from '../components/Cart';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartProps = {
    getItemQuantity: (id: number) => number,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    cartQuantity: number,
    openCart: () => void,
    closeCart: () => void,
    cartItems: CartItem[]
}

type ChildrenProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

const CartContext = createContext({} as CartProps);
export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }: ChildrenProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('CART_ITEMS', []);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currentItem => {
            if(currentItem.find(item => item.id === id)) {
                return currentItem.map(item => {
                    if(item.id == id) {
                        return {...item, quantity: item.quantity + 1}
                    }else {
                        return item;
                    }
                });
            } else {
                return [...currentItem, { id, quantity: 1 }];
            }
        });
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currentItem => {
            if(currentItem.find(item => item.id === id)?.quantity === 1) {
                return currentItem.filter(item => item.id !== id);
            }else {
                return currentItem.map(item => {
                    return item.id === id ? {... item, quantity: item.quantity - 1} : item;
                });
            }
        });
    }

    function removeFromCart(id: number) {
        setCartItems(currentItem => {
            return currentItem.filter(item => item.id !== id);
        });
    }

    return (
        <CartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart }}>
            {children}
            <Cart isOpen={isOpen} />
        </CartContext.Provider>
    )
}