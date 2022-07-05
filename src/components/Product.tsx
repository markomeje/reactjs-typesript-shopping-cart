import { Card, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import { currency } from '../utilities/currency';

type ProductProps = {
    id: number,
    price: number,
    name: string,
    imageUrl: string,
};

export function Product({ id, price, name, imageUrl }: ProductProps) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useCart();
    const quantity = getItemQuantity(id);
    // console.log(quantity);

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
                        <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add to Cart</Button>
                    ) : (
                        <div className="">
                            <div className="d-flex justify-content-between mb-4" style={{ gap: ".5rem"}}>
                                <Button className="" onClick={() => decreaseCartQuantity(id)}>-</Button>
                                <Button className="">{quantity} Added</Button>
                                <Button className="" onClick={() => increaseCartQuantity(id)}>+</Button>
                                <Button variant="danger" onClick={() => removeFromCart(id)}>
                                    <i className="bi bi-trash3"></i>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Card.Body> 
        </Card>
    )
}