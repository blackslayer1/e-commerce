import './Home.scss';
import Display from './Display';
import { useState, useEffect ,MouseEvent } from 'react';
import Navbar from './Navbar';
import Product from './Product';
import ProductIT from './Interface';

const Home = () => {
  const [data, setData] = useState<any>([]);
  const [products, setProducts] = useState<ProductIT[]>([]);
  const [display, setDisplay] = useState<ProductIT[]>([]);

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
      p.push({id: data[i].id, title: data[i].title, price: data[i].price, description: data[i].description, category: data[i].category, imageUrl: data[i].image, rating: {rate: data[i].rate, total: data[i].count}});
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

  useEffect(()=>{
      
  }, [display])

  const active = (e: MouseEvent)=>{
    const link = e.target as HTMLAnchorElement;
    const links = Array.from(document.getElementsByClassName('links2'));
    links.map((elem)=>{
    elem.classList.remove("active2")
    })
    link.classList.add("active2");
}

  return (
    <div className="home">
      <Navbar />
      <div className="display-container">
      <Display />
      <Display />
      <Display />
      </div>
      <h2>POPULAR PRODUCTS</h2>
      <header>
        <ul>
          <li className="links2 active2" onClick={active}>Clothing</li>
          <li className="links2" onClick={active}>Electronics</li>
          <li className="links2" onClick={active}>Others</li>
        </ul>
      </header>
      <div className="popular-products">
        {display.map((obj)=>{
          return <Product  id={obj.id} title={obj.title} price={obj.price} description={obj.description} category={obj.category} imageUrl={obj.imageUrl} rating={obj.rating} />
        })}
      </div>
      <button id="activate" onClick={activateDisplay}>activate</button>
      </div>
  )
}

export default Home
