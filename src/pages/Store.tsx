import products from '../data/products.json';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components/Product';

export function Store() {
    return (
        <Row md="3" lg="4" sm="6" className="">
            {products.map((product) => (
                <Col key={product.id} className="mb-2">
                    <Product {...product} />
                </Col>
            ))}
        </Row>
    )
}