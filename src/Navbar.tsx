import './Navbar.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';

const Navbar = ({numberOfItems}: {numberOfItems: number}) => {

    useEffect(()=>{
      let path = window.location.pathname.replace(/\\|\//g,'');
      document.getElementById(path + "link")!.classList.add('active');
    }, [])

    useEffect(()=>{
      const number = document.getElementById('numberOfItems')!;
      if(numberOfItems === 0){
        number.style.display="none";
      } else {
        if(number.style.display === "none"){
          number.style.display="block";
        }
      }
    }, [numberOfItems])
    
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
    <div id="numberOfItems" className="numberOfItems">
    {numberOfItems}
    </div>
    <ShoppingCartIcon onClick={()=>{document.getElementById('cartModal')!.style.display="block"}} className="shopping-cart" />
    </div>
    </div>
    </nav>
  )
}

export default Navbar
