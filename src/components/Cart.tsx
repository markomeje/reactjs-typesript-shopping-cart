import { Offcanvas, Stack } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import products from '../data/products.json';
import { CartItem } from './CartItem';
import { currency } from '../utilities/currency';

type CartProps = {
    isOpen: boolean
}

export function Cart({ isOpen }: CartProps) {
    const { closeCart, cartItems, removeFromCart } = useCart();
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body> 
                <Stack gap={3}>
                    {cartItems.map((item: {id: number, quantity: number}) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <h4>Total {currency(
                        cartItems.reduce((total, cartItem) => {
                            const item = products.find(item => item.id === cartItem.id);
                            return total + (item?.price || 0) * cartItem.quantity
                        }, 0)
                    )}</h4>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}