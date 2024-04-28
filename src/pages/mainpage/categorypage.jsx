import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../../products';
import { Product } from './product';
import { Row, Col } from 'react-bootstrap'; 
import { Button } from 'react-bootstrap'; 
import "./categorypage.css";

export const CategoryPage = () => {
  const { name } = useParams();
  
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const categoryProducts = PRODUCTS.filter(product => product.category === name);

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Orderly Menu</h1>
      </div>

      <h2 className='categoryName'>{capitalizeFirstLetter(name)} Category</h2>

      <Link to="/" className="returnButton">
        <Button className='returnBtn'>Go Back</Button>
      </Link>
     
      <Row xs={1} md={2} lg={3} className="g-4">
        {categoryProducts.map((product) => (
          <Col key={product.id}>
            <Product data={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}