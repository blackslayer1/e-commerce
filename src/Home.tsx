import './Home.scss';
import Display from './Display';
import { useState, useEffect ,MouseEvent, ChangeEvent } from 'react';
import Navbar from './Navbar';
import Product from './Product';
import ProductIT from './Interface';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LockIcon from '@mui/icons-material/Lock';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CheckIcon from '@mui/icons-material/Check';

const Home = ({cart, setCart, numberOfItems, setNumberOfItems, total, setTotal}: {cart: ProductIT[], setCart: any, numberOfItems: number, setNumberOfItems: any, total: number, setTotal: any}) => {
  const [data, setData] = useState<any>([]);
  const [products, setProducts] = useState<ProductIT[]>([]);
  const [display, setDisplay] = useState<ProductIT[]>([]);
  const [tax, setTax] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [paymentOption, setPaymentOption] = useState<string>('');
  const [checkMarkChangeHandler, setCheckMarkChangeHandler] = useState<number>(0);
  const [paypalEmail, setPaypalEmail] = useState<string>('');
  const [cardInput, setCardInput] = useState<string>('');
  const [hover, setHover] = useState<boolean>(false);

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
      var newPrice = price * (parseFloat(select.value)-1);
      setTotal((total-counter)+newPrice);
      setCounter(newPrice);
  }

  const checkBox = (number: number, check: boolean) => {
    if(check){
      document.getElementById('checkmark' + number)!.style.background="#00a851";
      document.getElementById('checkIcon' + number)!.style.visibility="visible";
      setCheckMarkChangeHandler(checkMarkChangeHandler+1);
    } else {
      document.getElementById('checkmark' + number)!.style.background="gray";
      document.getElementById('checkIcon' + number)!.style.visibility="hidden";
      setCheckMarkChangeHandler(checkMarkChangeHandler-1);
    }
  }

  const enableButton = (enable: boolean) => {
    const button = document.getElementById('placeOrder')! as HTMLButtonElement;
    if(enable){
      button.style.pointerEvents = 'all';
      button.style.opacity = "100%";
    } else {
      button.style.pointerEvents = 'none';
      button.style.opacity = "50%";
    }
  }

  useEffect(()=>{
    const paypalInfo = document.getElementById('paypalInfo')!;
    const cardInfo = document.getElementById('cardInfo')!;

    switch(paymentOption){
      case 'paypal':
      paypalInfo.style.visibility="visible";
      cardInfo.style.visibility="hidden";
      checkBox(3, false);
      break;
      case 'cash':
        paypalInfo.style.visibility="hidden";
        cardInfo.style.visibility="hidden";
        checkBox(3, true);
      break;
      case 'creditCard':
      cardInfo.style.visibility="visible";
      paypalInfo.style.visibility="hidden";
      checkBox(3, false);
      break;
    }
  }, [paymentOption])

  const inputChangeHandler = () => {
    const container = document.getElementsByClassName('billingAddress')[0] as HTMLDivElement;
    const inputElements = Array.from(container.querySelectorAll("input"));
    var shouldRun = true;
    inputElements.map((input)=>{
      if(input.value === ''){
        shouldRun = false;
      }
    })
    if(shouldRun){
      checkBox(1, true);
    } else {
      checkBox(1, false);
    }
  }

    useEffect(()=>{
      if(paymentOption === 'paypal'){
        if(paypalEmail === ''){
          enableButton(false);
        } else {
          enableButton(true);
        }
      }
    }, [paypalEmail])

    useEffect(()=>{
      const cardInfo = document.getElementById('cardInfo')! as HTMLDivElement;
      const inputs = Array.from(cardInfo.querySelectorAll('input'));
      var shouldRun = true;

      if(paymentOption === 'creditCard'){
      inputs.map((input)=>{
        if((input as HTMLInputElement).value === ''){
          shouldRun = false;
        }
      })
        if(shouldRun){
          enableButton(true);
        } else {
          enableButton(false);
        }
      }
    }, [cardInput])

    useEffect(()=>{
      const checkmarks = Array.from(document.getElementsByClassName('checkmark'));
      var shouldRun = true;
      checkmarks.map((checkmark)=>{
        if((checkmark as HTMLDivElement).style.background === 'gray'){
          shouldRun = false;
        }
      })
      if(shouldRun){
        enableButton(true);
      } else {
        enableButton(false);
      }
    }, [checkMarkChangeHandler])

    const reset = () => {
      cart.map((item)=>{
        const button = document.getElementById('addToCart' + item.id)! as HTMLButtonElement;
        const text = document.getElementById('addedToBasket' + item.id)! as HTMLHeadingElement;
        button.style.background="#00a851";
        button.innerHTML="Add To Cart";
        text.style.display="none";
      })
      setCart([]);
      setNumberOfItems(0);
      setTotal(0);
    }

    const placeOrder = () => {
      const lockIcon = (document.getElementsByClassName('lockIcon')[0] as HTMLDivElement)
      const spinner = document.getElementById('spinner')!;
      lockIcon.style.visibility="hidden";
      spinner.style.display="block";
      setTimeout(()=>{
        document.getElementById('orderPlacedModal')!.style.display="block";
        lockIcon.style.visibility="visible";
        spinner.style.display="none";
        reset();
      }, 3000)
    }

    useEffect(()=>{
      const button = document.getElementsByClassName('checkout-button')[0] as HTMLButtonElement;
      if(cart.length > 0){
        button.style.opacity="100%";
        button.style.pointerEvents="all";
      } else {
        button.style.opacity="50%";
        button.style.pointerEvents="none";
      }
    }, [cart])

    const deleteItem = (id: number, price: number) => {
      const button = document.getElementById('addToCart' + id)! as HTMLButtonElement;
      const text = document.getElementById('addedToBasket' + id)! as HTMLHeadingElement;
      button.style.background="#00a851";
      button.innerHTML="Add To Cart";
      setCart(cart.filter((item)=>{
        return item.id !== id
      }))
      setNumberOfItems(numberOfItems-1);
      setTotal(total-price);
      text.style.display="none";
    }

  useEffect(() => {
    const container = document.getElementById('display-container')!;
    var scrollCounter = 0;
    var scrollRight = true;
    const intervalID = setInterval(() =>  {
      if(scrollRight){
        container.scrollBy({
          left: 400,
          behavior: "smooth"
        });
        scrollCounter += 1;
        if(scrollCounter % 3 === 0){
          scrollRight = false;
        }
        } else {
          container.scrollBy({
            left: -400,
            behavior: "smooth"
          });
          scrollCounter += 1;
          if(scrollCounter % 3 === 0){
            scrollRight = true;
          }
        }

    }, 3000);

    return () => clearInterval(intervalID);
}, []);

  useEffect(()=>{
    setTimeout(()=>{
      document.getElementById('activate')!.click()
    }, 1000)
  }, []) 

  return (
    <div className="home">
      <Navbar numberOfItems={numberOfItems} />
      <div id="display-container" className="display-container" style={{transition: "0.3s all"}}>
      <Display text={"30% OFF"} img={1} background={'rgba(0, 0, 0, 0.651)'} />
      <Display text={"Black Friday Deals"} img={2} background={'rgba(0, 0, 0, 0.651)'} />
      <Display text={"Only $49.99"} img={3} background={'rgb(252, 82, 52)'} />
      </div>
      <header style={{borderBottom: "1px solid #a3a3a3"}}>
      <h2>POPULAR PRODUCTS</h2>
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
              <h4 style={{position: "relative", right: "40px"}}>Price: <span>${obj.price}</span></h4>
              <h4>Category: <span>{obj.category}</span></h4>
              <ul className="ratings" id="ratings" style={{position: "relative", right: "40px"}} onMouseOver={()=>{setHover(true)}}>
            <li>{obj.rating.rate >= 1 ? <StarIcon /> : <StarBorderIcon />}</li>
            <li>{obj.rating.rate >= 2 ? <StarIcon /> : <StarBorderIcon />}</li>
            <li>{obj.rating.rate >= 3 ? <StarIcon /> : <StarBorderIcon />}</li>
            <li>{obj.rating.rate >= 4 ? <StarIcon /> : <StarBorderIcon />}</li>
            <li>{obj.rating.rate === 5 ? <StarIcon /> : <StarBorderIcon />}</li>
            </ul>
            {
              hover &&             
              <ul className="hover" id="hover" onMouseLeave={()=>{setHover(false)}}>
              <li><StarIcon /></li>
              <li><StarIcon /></li>
              <li><StarIcon /></li>
              <li><StarIcon /></li>
              <li><StarIcon /></li>
            </ul>
            }
            <span style={{color: "rgb(255, 217, 0)", position: "relative", bottom: "43px", left: '110px'}}>Total ratings: {obj.rating.total}</span>
            <span style={{color: "green", position: "absolute", width: "300px", left: '-10px', bottom: "80px", visibility: "hidden"}}>Thank you for your feedback</span>
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
      <button style={{position: "absolute", top: "0", left: "0", visibility: "hidden"}} id="activate" onClick={activateDisplay}>activate</button>
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
        <button className='checkout-button' onClick={()=>{document.getElementById('buyModal')!.style.display="block"}}><span>Checkout</span><ArrowRightAltIcon className="arrow-icon" /></button>
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
              <button className="delete" onClick={()=>{deleteItem(obj.id, parseFloat(obj.price))}}>Delete</button>
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
    <div id="buyModal" className="modal">
  <div className="modal-content">
    <span className="close" onClick={()=>{
      document.getElementById('buyModal')!.style.display="none";
      document.getElementById('cartModal')!.style.display="none";
      }}>&times;</span>
      <header>
        <div style={{position: "relative", right: "330px", height: "50px"}}>
        <h3 style={{position: "relative", right: "157px", bottom: "20px"}}>Checkout</h3>
   <p style={{position: "relative", bottom: '35px'}}>Please enter your details below to complete your purchase.</p>
        </div>
      </header>
      <div className="details">
      <div className="billingAddress">
      <div style={{display: "flex"}}>
      <h3>BILLING ADDRESS</h3>
      <div className="checkmark" id="checkmark1" >
        <CheckIcon className="checkIcon" id="checkIcon1" />
      </div>
      </div>
      <input placeholder="First Name" onChange={inputChangeHandler} />
      <input placeholder="Last Name" onChange={inputChangeHandler} />
      <input type="email" placeholder="Email Address" onChange={inputChangeHandler} />
      <input type="number" placeholder="Telephone"  onChange={inputChangeHandler}/>
      <input placeholder="Address" onChange={inputChangeHandler} />
      <br />
      <div style={{position: "relative", marginBottom: "10px", right: "60px"}}>
      <label style={{marginRight: '5px'}}>Country</label>
      <select style={{padding: "5px", cursor: "pointer", outline: "none"}}>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
      </select>
      </div>
      <input placeholder="State" onChange={inputChangeHandler} />
      <input placeholder='City' onChange={inputChangeHandler} />
      <input type="number" placeholder="Zip Code" onChange={inputChangeHandler} />
      </div>
      <div className="shippingMethod">
      <div style={{display: "flex"}}>
      <h3>SHIPPING METHOD</h3>
      <div className="checkmark" id="checkmark2" >
      <CheckIcon className="checkIcon" id="checkIcon2" />
      </div>
      </div>
      <label>Free Shipping <span style={{color: "green", fontWeight: "600"}}>Arriving In 5-7 Business Days</span></label>
      <div style={{position: "relative", right: "135px", marginTop: "5px"}}>
      <input name="shipping" value="free" type="radio" onClick={()=>{checkBox(2, true)}} />
      <label style={{position: "relative", right: "120px", bottom: "1px"}}>Free</label>
      </div>
      <label style={{position: "relative", right: "17px"}}>Flat Rate <span style={{color: "green", fontWeight: "600"}}>Arriving In 2-3 Business Days</span></label>
      <div style={{position: "relative", right: "127px", marginTop: "5px"}}>
      <input name="shipping" value="flatRate" type="radio" onClick={()=>{checkBox(2, true)}} />
      <label style={{position: "relative", right: "120px", bottom: "1px"}}>$10.00</label>
      </div>
      </div>
      <div className="paymentMethod">
      <div style={{display: "flex"}}>
      <h3>PAYMENT METHOD</h3>
      <div className="checkmark" id="checkmark3" >
      <CheckIcon className="checkIcon" id="checkIcon3" />
      </div>
      </div>
      <label>Paypal</label>
      <input style={{position: "relative", left: "17px"}} type="radio" name="payment" value="paypal" id="paypal" onChange={()=>{setPaymentOption("paypal")}} />
      <br />
      <label style={{position: "relative", right: "75px"}}>Invoice with the package</label>
      <input style={{position: "relative", bottom: "20px", left: "40px"}} type="radio" name="payment" value="cash" id="cash" onChange={()=>{setPaymentOption("cash")}} />
      <br />
      <div style={{position: "relative", bottom: "17px"}}>
      <label style={{position: "relative", left: "17px"}}>Credit Card</label>
      <input type="radio" name="payment" value="creditCard" id="creditCard" onChange={()=>{setPaymentOption("creditCard")}} />
      </div>
       <div id="paypalInfo" style={{visibility: "hidden"}}>
        <label>Paypal Email</label>
        <br />
        <input type="email" placeholder="Email" onChange={(e: ChangeEvent<HTMLInputElement>)=>{setPaypalEmail(e.target.value)}} />
       </div>
       <div id="cardInfo" style={{visibility: "hidden"}}>
        <label>Card Number</label>
        <br />
        <input style={{marginTop: "5px"}} type="number" placeholder="Card Number"onChange={(e: ChangeEvent<HTMLInputElement>)=>{setCardInput(e.target.value)}} />
        <br />
        <label style={{marginRight: "10px"}}>Expiration Date</label>
        <input style={{width: "35px", padding: "5px"}} type="number"onChange={(e: ChangeEvent<HTMLInputElement>)=>{setCardInput(e.target.value)}} />
        <span style={{marginLeft: "5px", marginRight: '5px'}}>/</span>
        <input style={{width: "35px", padding: "5px"}} type="number"onChange={(e: ChangeEvent<HTMLInputElement>)=>{setCardInput(e.target.value)}} />
        <br />
        <label style={{marginRight: "10px"}}>Security Code</label>
        <input style={{width: "20%", padding: "5px"}} type="number" min="0"onChange={(e: ChangeEvent<HTMLInputElement>)=>{setCardInput(e.target.value)}} />
        <br />
        <label style={{marginRight: '10px'}}>Name</label>
        <input style={{padding: "5px", width: "40%"}}onChange={(e: ChangeEvent<HTMLInputElement>)=>{setCardInput(e.target.value)}}/>
        <br />
        <label style={{marginRight: '10px'}}>Last Name</label>
        <input style={{padding: "5px", width: "40%"}}onChange={(e: ChangeEvent<HTMLInputElement>)=>{setCardInput(e.target.value)}}/>
       </div>
      </div>
      <button id="placeOrder" onClick={placeOrder}><span>Place Order</span> <LockIcon className="lockIcon" /></button>
      </div>
      <div className="three-quarter-spinner" id="spinner"></div>
  </div>
</div>
<div id="orderPlacedModal" className="modal">
  <div className="modal-content">
  <span className="close" onClick={()=>{
      document.getElementById('buyModal')!.style.display="none";
      document.getElementById('cartModal')!.style.display="none";
      document.getElementById('orderPlacedModal')!.style.display="none";
      }}>&times;</span>
      <h1>Order Placed!</h1>
      <h2>Please check your email for confirmation.</h2>
  </div>
  </div>
      </div>
  )
}

export default Home