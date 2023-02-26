import './Product.scss';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface ProductIT{
  id: number,
  title: string,
  price: string,
  description: string,
  category: string,
  imageUrl: string,
  rating: {rate: number, total: number}
}

const Product = ({ id, title, price, description, category, imageUrl, rating }: ProductIT) => {
  return (
    <div className="product">
      <div className="info">
        <div className="info-content">
        <h5 className="title">{title}</h5>
      <ul className="ratings">
        <li><StarBorderIcon /></li>
        <li><StarBorderIcon /></li>
        <li><StarBorderIcon /></li>
        <li><StarBorderIcon /></li>
        <li><StarBorderIcon /></li>
      </ul>
      <h3 className="price">{"$" + price}</h3>
      <span className="category">Men's Clothing</span>
        </div>
      </div>
    </div>
  )
}

export default Product
