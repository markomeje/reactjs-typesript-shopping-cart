import { Card, Button } from 'react-bootstrap';
import { useShoppingCart } from '../contexts/CartContext';
import { currency } from '../utilities/currency';

type ProductProps = {
    id: number,
    price: number,
    name: string,
    imageUrl: string,
};

export function Product({ id, price, name, imageUrl }: ProductProps) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
    let quantity = getItemQuantity(id);

    return (
        <Card className="h-100 bg-transparent border-0">
            <Card.Img variant="top" src={imageUrl} height="200px" style={{ objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column px-0">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-4">{name}</span>
                    <span className="ms-2 text-muted">
                        { currency(price) }
                    </span>
                </Card.Title>
                <div className="">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={(e) => increaseCartQuantity(id)}>
                            <small>
                                + Add to Cart
                            </small>
                        </Button>
                    ) : (
                        <div className="d-flex justify-content-between m-0" style={{ gap: "1rem"}}>
                            <Button className="w-100" onClick={(e) => decreaseCartQuantity(id)}>-</Button>
                            <Button className="">
                                <small>
                                    {quantity}
                                </small>
                            </Button>
                            <Button className="w-100" onClick={(e) => increaseCartQuantity(id)}>+</Button>
                            <Button className="w-100" variant="danger" onClick={(e) => removeFromCart(id)}>
                                <small>
                                    <i className="bi bi-trash3"></i>
                                </small>
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body> 
        </Card>
    )
}