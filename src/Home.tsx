import './Home.scss';
import Display from './Display';
import { useState, useEffect ,MouseEvent, ChangeEvent } from 'react';
import Navbar from './Navbar';
import Product from './Product';
import ProductIT from './Interface';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const Home = () => {
  const [data, setData] = useState<any>([]);
  const [products, setProducts] = useState<ProductIT[]>([]);
  const [display, setDisplay] = useState<ProductIT[]>([]);
  const [cart, setCart] = useState<ProductIT[]>([]);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);

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
      setTotal(total+parseFloat(item.price));
    } else {
      button.style.background="#00a851";
      button.innerHTML="Add To Cart";
      text.style.display="none";
      setCart(cart.filter((item)=>{
        return item.id !== id
      }))
      setNumberOfItems(numberOfItems-1);
      setTotal(total-parseFloat(item.price));
    }
  }

  useEffect(()=>{
    setTax(total/10);
  }, [cart])

  const changeHandler = (price: number, id: number) => {
      const select = document.getElementById("select" + id)! as HTMLSelectElement;
      const number = price * parseFloat(select.value);
      
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
      <div id="cartModal" className="modal">
      <div className="modal-content">
        <span onClick={()=>{document.getElementById('cartModal')!.style.display="none"}} className="close">&times;</span>
        <h3>My Cart <LocalMallIcon /></h3>
        <hr />
        <div className="order-summary" style={{width: "30%", height: "87%", float: "right", marginTop: '20px', background: 'white'}}>
        <h3 style={{float: 'left', marginLeft: "10px"}}>ORDER SUMMARY:</h3>
        <div>
          <h4 className="products-number">{numberOfItems} {numberOfItems > 1 ? "PRODUCTS" : "PRODUCT"}</h4>
          <hr />
          <h4>Delivery</h4>
          <span>FREE</span>
          <hr />
          <h4>Tax ${tax.toFixed(2)}</h4>
          <hr />
          <h4 className="total">Total ${total.toFixed(2)}</h4>
          <span></span>
        </div>
        </div>
        <div style={{overflow: "auto", height: "95%", width: "70%"}}>
        {cart.map((obj)=>{
          return <>
          <div className="cart-item">
            <img src={obj.imageUrl} alt={obj.title} />
            <div className="left">
              <h4>{obj.title}</h4>
              <span>Price: ${obj.price}</span>
              <br />
              <span>Category: {obj.category}</span>
              <br /><br />
              <button className="delete">Delete</button>
            </div>
            <div className="right">
              <select id={"select" + obj.id} onChange={()=>{changeHandler(parseFloat(obj.price), obj.id)}}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <h3>${obj.price}</h3>
            </div>
          </div>
          </>
        })}
        </div>
      </div>
    </div>
      </div>
  )
}

export default Home