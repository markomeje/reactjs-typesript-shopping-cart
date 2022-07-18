import { useCart } from '../contexts/CartContext';
import products from '../data/products.json';
import { Stack, Button } from 'react-bootstrap';
import { currency } from '../utilities/currency';

type ItemProps = {
    id: number,
    quantity: number
}

export function CartItem({ id, quantity }: ItemProps) {
    const { removeFromCart } = useCart();
    const item = products.find(product => product.id === id);
    if(item == null) return null;

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imageUrl} style={{ width: '125px', height: '75px', objectFit: 'cover' }} />
            <div className="me-auto">
                <div className="text-muted">
                    {item.name} {quantity > 1 &&<span className="text-muted" style={{ fontSize: ".65rem" }}>
                        {quantity}X
                    </span>}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {currency(item.price)}
                </div>
            </div>
            <div className="text-muted">
                {currency(item.price * quantity)}
            </div>
            <Button variant="outline-danger"  size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
        </Stack>
    )
}