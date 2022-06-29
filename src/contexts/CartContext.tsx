import { createContext, useContext, ReactNode, useState } from "react";

type CartProps = {
    getItemQuantity: (id: number) => number,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
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
    const [cartItems, setCartItems] = useState([] as any);

    function getItemQuantity(id: number) {
        console.log(id);
        return cartItems.find((item: { id: number; }) => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: number) {
        setCartItems((currentItems: { id: number; quantity: number; }[]) => {
            return (currentItems.find((item: { id: number; }) => item.id === id) === null) ? [...currentItems, {id, quantity: 1}] : currentItems.map((item: { id: number; quantity: number; }) => item.id === id ? (item.quantity + 1) : item);
        }); 
    }

    function decreaseCartQuantity(id: number) {
        setCartItems((currentItems: any[]) => {
            if(currentItems.find((item) => item.id === id)?.quantity === 1) {
                return currentItems.filter((item) => item.id !== id);
            }else {
                return currentItems.map((item) => {
                    return item.id === id ? (item.quantity - 1) : item;
                });
            }
        });
    }

    function removeFromCart(id: number) {
        setCartItems((currentItems: any[]) => {
            return currentItems.filter((item) => item.id !== id);
        });
    }

    return (
        <CartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}