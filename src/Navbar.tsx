import './Navbar.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, MouseEvent } from 'react';

const Navbar = () => {
    useEffect(()=>{
      let path = window.location.pathname.replace(/\\|\//g,'');
      document.getElementById(path + "link")!.classList.add('active');
    }, [])
    
  return (
    <nav>
    <div className="header">
    <ul>
        <li><a id="link" href="/" className="links">Home</a></li>
        <li><a id="productlink" href="/product" className="links">Product</a></li>
        <li><a id="aboutlink" href="/about" className="links">About</a></li>
    </ul>
    <div className="right">
    <input placeholder='Search products' />
    <SearchIcon className="searchIcon" />
    <AccountCircleIcon className="profile-icon" />
    <ShoppingCartIcon className="shopping-cart" />
    </div>
    </div>
    </nav>
  )
}

export default Navbar
