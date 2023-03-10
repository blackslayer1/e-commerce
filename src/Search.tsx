import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Search.scss';
import ProductIT from './Interface';
import Product from './Product';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Search = ({cart, setCart, numberOfItems, setNumberOfItems, total, setTotal}: {cart: ProductIT[], setCart: any, numberOfItems: number, setNumberOfItems: any, total: number, setTotal: any}) => {
  const [ret, setRet] = useState<string>((window.location.pathname).replace('/search/',''));
  const [data, setData] = useState<any>([]);
  const [products, setProducts] = useState<ProductIT[]>([]);
  const [results, setResults] = useState<ProductIT[]>([]);

  async function fetchData(){
    await fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => setData(data));
  }

  useEffect(()=>{
    fetchData();
  }, [])

  const activate = () => {
    let p = [];
    for(var i=0; i<data.length; i++){
      p.push({id: data[i].id, title: data[i].title, price: data[i].price, description: data[i].description, category: data[i].category, imageUrl: data[i].image, rating: {rate: Math.round(data[i].rating.rate), total: data[i].rating.count}});
    }
    setProducts(p);
  }

  useEffect(()=>{
    activate();
  }, [data])

  const activate2 = () => {
    let arr: ProductIT[] = [];
    products.map((obj)=>{
        if(((obj.title).toUpperCase()).includes(ret.toUpperCase())){
            arr.push(obj);
        }
    })
    setResults(arr);
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
    setTimeout(()=>{
      document.getElementById('activate2')!.click();
    }, 500)
  }, [])

  return (
    <div className="search-page">
    <Navbar numberOfItems={0} />
    <h4>Showing results for {ret}</h4>
    <button style={{display: "none"}} id='activate2' onClick={activate2}>activate</button>
    <div className="result-container">
    {results.map((obj)=>{
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
    </div>
  )
}

export default Search
