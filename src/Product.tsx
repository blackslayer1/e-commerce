import './Product.scss';
import { useEffect } from 'react';
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

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const Product = ({ id, title, price, description, category, imageUrl, rating }: ProductIT) => {
  
useEffect(()=>{
  console.log(rating)
}, []);

  return (
    <div id="product" className="product" onClick={()=>{document.getElementById('modal' + id)!.style.display="block"}}>
      <img src={imageUrl} alt={title} className="product-image" />
      <div className="info">
        <div className="info-content">
        <h5 className="title">{title}</h5>
      <ul className="ratings">
        <li>{rating.rate >= 1 ? <StarIcon /> : <StarBorderIcon />}</li>
        <li>{rating.rate >= 2 ? <StarIcon /> : <StarBorderIcon />}</li>
        <li>{rating.rate >= 3 ? <StarIcon /> : <StarBorderIcon />}</li>
        <li>{rating.rate >= 4 ? <StarIcon /> : <StarBorderIcon />}</li>
        <li>{rating.rate === 5 ? <StarIcon /> : <StarBorderIcon />}</li>
      </ul>
      <h3 className="price">{"$" + price}</h3>
      <span className="category">{toTitleCase(category)}</span>
        </div>
      </div>
    </div>
  )
}

export default Product
