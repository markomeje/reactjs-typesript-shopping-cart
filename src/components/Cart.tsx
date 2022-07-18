import { Offcanvas, Stack, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import products from '../data/products.json';
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
                    {cartItems.map(item => {
                        const { id, quantity } = item;
                        const product = products.find(product => product.id === id);
                        return product ? (
                            <Stack key={id} direction="horizontal" gap={3} className="d-flex align-items-center">
                                <img src={product.imageUrl} style={{ width: '125px', height: '75px', objectFit: 'cover' }} />
                                <div className="me-auto">
                                    <div className="text-muted">
                                        {product.name} {quantity > 1 &&<span className="text-muted" style={{ fontSize: ".65rem" }}>
                                            {quantity}X
                                        </span>}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: ".75rem" }}>
                                        {currency(product.price)}
                                    </div>
                                </div>
                                <div className="text-muted">
                                    {currency(product.price * quantity)}
                                </div>
                                <Button variant="outline-danger"  size="sm" onClick={() => removeFromCart(product.id)}>&times;</Button>
                            </Stack>
                        ) : null;
                    })}
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