import './Product.scss';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useEffect } from 'react';

interface ProductIT{
  id: number,
  title: string,
  price: string,
  description: string,
  category: string,
  imageUrl: string,
  rating: {rate: number, total: number}
}

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const Product = ({ id, title, price, description, category, imageUrl, rating }: ProductIT) => {
  return (
    <div id="product" className="product">
      <img src={imageUrl} alt={title} className="product-image" />
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
      <span className="category">{toTitleCase(category)}</span>
        </div>
      </div>
    </div>
  )
}

export default Product
