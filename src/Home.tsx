import './Home.scss';
import Display from './Display';
import { useState, useEffect ,MouseEvent } from 'react';
import Navbar from './Navbar';
import Product from './Product';
import ProductIT from './Interface';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Home = () => {
  const [data, setData] = useState<any>([]);
  const [products, setProducts] = useState<ProductIT[]>([]);
  const [display, setDisplay] = useState<ProductIT[]>([]);
  const [cart, setCart] = useState<ProductIT[]>([]);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);

  async function fetchData(){
    await fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => setData(data));
  }

  useEffect(()=>{
    fetchData();
  }, [])

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const activate = () => {
    let p = [];
    for(var i=0; i<data.length; i++){
      p.push({id: data[i].id, title: data[i].title, price: data[i].price, description: data[i].description, category: data[i].category, imageUrl: data[i].image, rating: {rate: Math.round(data[i].rating.rate), total: data[i].rating.count}});
    }
    setProducts(p);
  }

  const activateDisplay = () => {
    let d: any = [];
    let numbers: number[] = [];
    
    for(var i=0; i<6; i++){
      let randomNumber = randomIntFromInterval(0, 19);
      if(numbers.includes(randomNumber)){
        while(numbers.includes(randomNumber)){
          randomNumber = randomIntFromInterval(0, 19);
        }
      }
      numbers.push(randomNumber);
      d.push(products[randomNumber]);
    }
    setDisplay(d);
  }

  useEffect(()=>{
    activate();
  }, [data])

  const active = (e: MouseEvent)=>{
    const link = e.target as HTMLAnchorElement;
    const links = Array.from(document.getElementsByClassName('links2'));
    links.map((elem)=>{
    elem.classList.remove("active2")
    })
    link.classList.add("active2");
}

  const addToCart = (id: number, item: ProductIT) => {
    const text = document.getElementById('addedToBasket' + id)! as HTMLHeadingElement;
    const button = document.getElementById('addToCart' + id)! as HTMLButtonElement;
    if(button.innerHTML=== "Add To Cart"){
      button.style.background="#f54343";
      button.innerHTML="Remove Item";
      text.style.display="inline";
      setCart([...cart, item]);
      setNumberOfItems(numberOfItems+1);
    } else {
      button.style.background="#00a851";
      button.innerHTML="Add To Cart";
      text.style.display="none";
      setCart(cart.filter((item)=>{
        return item.id !== id
      }))
      setNumberOfItems(numberOfItems-1);
    }
  }

 /* useEffect(()=>{
    setTimeout(()=>{
      document.getElementById('activate')!.click()
    }, 1000)
  }, []) */

  return (
    <div className="home">
      <Navbar numberOfItems={numberOfItems} />
      <div className="display-container">
      <Display text={"30% OFF"} img={1} />
      <Display text={"Black Friday Deals"} img={2} />
      <Display text={"Only $49.99"} img={3} />
      </div>
      <h2>POPULAR PRODUCTS</h2>
      <header>
        <ul>
          <li className="links2 active2" onClick={active}>All</li>
          <li className="links2" onClick={active}>Electronics</li>
          <li className="links2" onClick={active}>Clothing</li>
        </ul>
      </header>
      <div className="popular-products">
        {display.map((obj)=>{
          return <>
          <Product  id={obj.id} title={obj.title} price={obj.price} description={obj.description} category={obj.category} imageUrl={obj.imageUrl} rating={obj.rating} />
          <div id={"modal" + obj.id} className="modal">
          <div className="modal-content">
            <h3 className="addedToBasket" id={'addedToBasket'+obj.id}>Item has been added to basket</h3>
          <span onClick={()=>{document.getElementById('modal' + obj.id)!.style.display="none"}} className="close">&times;</span>
          <div style={{display: "flex"}}>
          <div style={{height: "300px", width: "40%"}}>
          <h4>{obj.title}</h4>
          <img style={{height: "80%", width: "80%"}} src={obj.imageUrl} alt={obj.title} />
          </div>
          <div style={{width: "55%"}}>
          <p className="description" style={{fontWeight: "400"}}>{obj.description}</p>
            <div style={{position: "relative", float: "left"}}>
              <h4>Price: <span>${obj.price}</span></h4>
              <h4>Category: <span>{obj.category}</span></h4>
              <ul className="ratings">
            <li>{obj.rating.rate >= 1 ? <StarIcon /> : <StarBorderIcon />}</li>
            <li>{obj.rating.rate >= 2 ? <StarIcon /> : <StarBorderIcon />}</li>
            <li>{obj.rating.rate >= 3 ? <StarIcon /> : <StarBorderIcon />}</li>
            <li>{obj.rating.rate >= 4 ? <StarIcon /> : <StarBorderIcon />}</li>
            <li>{obj.rating.rate === 5 ? <StarIcon /> : <StarBorderIcon />}</li>
            </ul>
            <div className="buttons">
            <button onClick={()=>{addToCart(obj.id, obj)}} id={"addToCart" + obj.id} className="addToCart">Add To Cart</button>
            <button className="buy">Checkout Now</button>
            </div>
            </div>
          </div>
          </div>
          </div>
          </div>
          </>
          
        })}
      </div>
      <button style={{position: "absolute", top: "0", left: "0", visibility: "visible"}} id="activate" onClick={activateDisplay}>activate</button>
      </div>
  )
}

export default Home