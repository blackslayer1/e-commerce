import './Navbar.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { MouseEvent } from 'react';

const Navbar = () => {

    const active = (e: MouseEvent)=>{
        const link = e.target as HTMLAnchorElement;
        const links = Array.from(document.getElementsByClassName('links'));
        links.map((elem)=>{
        elem.classList.remove("active")
        })
        link.classList.add("active");
    }
    
  return (
    <nav>
    <div className="header">
    <ul>
        <li><a href="#" className="links active" onClick={active}>Home</a></li>
        <li><a href="#" className="links" onClick={active}>Product</a></li>
        <li><a href="#" className="links" onClick={active}>About</a></li>
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
