import Navbar from './Navbar';
import './ProductPage.scss';
import { MouseEvent } from 'react';

const ProductPage = () => {

  const active = (e: MouseEvent)=>{
    const link = e.target as HTMLAnchorElement;
    const links = Array.from(document.getElementsByClassName('links2'));
    links.map((elem)=>{
    elem.classList.remove("active2")
    })
    link.classList.add("active2");
}

  return (
    <div className="product-page">
      <Navbar numberOfItems={0} />
      <header>
        <ul>
          <li className="links2 active2" onClick={active}>All</li>
          <li className="links2" onClick={active}>Electronics</li>
          <li className="links2" onClick={active}>Clothing</li>
        </ul>
      </header>
    </div>
  )
}

export default ProductPage
