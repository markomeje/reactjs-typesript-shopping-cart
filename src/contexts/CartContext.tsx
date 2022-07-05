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
    id: number,
    quantity: number
}

const CartContext = createContext({} as CartProps);
export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }: ChildrenProps) {
    const [cartItems, setCartItems] = useState<CartItem>([]);

    // console.log(cartItems, setCartItems);

    function getItemQuantity(id: number) {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: number) {
        setCartItems((currentItems) => {
            if(currentItems.find((item) => item.id === id) === null) {
                return [...currentItems, {id, quantity: 1}];
            } else {
                return currentItems.map((item) => {
                    if(item.id === id) {
                        return {... item, quantity: item.quantity + 1}
                    }else {
                        return item;
                    }
                });
            });
        }); 
    }

    function decreaseCartQuantity(id: number) {
        setCartItems((currentItems) => {
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
        setCartItems((currentItems) => {
            return currentItems.filter((item) => item.id !== id);
        });
    }

    return (
        <CartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}