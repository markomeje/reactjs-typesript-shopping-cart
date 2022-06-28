import Products from '../data/products.json';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components/Product';

export function Store() {
    return (
        <Row md="3" lg="4" sm="6" className="g-4">
            {Products.map((product) => (
                <Col key={product.id}>
                    <Product {...product} />
                </Col>
            ))}
        </Row>
    )
}