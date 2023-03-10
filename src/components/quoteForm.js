import React, {useState, useEffect} from 'react';
import {OrderService} from '../services/orderService';
import {useNavigate} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ProductOrderService } from '../services/productOrderService';
import { QuotePriceService } from '../services/quotePriceService';



function QuoteForm() {

  useEffect( () => {
    getAllQuotePrices();
  },[])

  const [error, setError] = useState();
  const[qoutesPrice, setQuotesPrice] = useState()
   const navigate = useNavigate();

  const getAllQuotePrices = async()=>{
    console.log('12345');
    try{
  let quotes = await OrderService.getQuotePriceOrders();
  setQuotesPrice(quotes.data);
  console.log(quotes.data);
  }
  catch(ex){
    console.log(ex.message);
  }
  }


const onDeleteOrder = (quote)=>{
  console.log(quote);
  
  confirmAlert({
    title: 'מחיקת ההזמנה',
    message: 'בטוח שאת/ה רוצ/ה למחוק את ההזמנה?',
    buttons: [
      {
        label: 'כן',
        onClick: ()=> deleteOrder(quote)
      },
      {
        label: 'לא',
      }
    ],
    overlayClassName: ".react-confirm-alert-overlay"
  }); 
  getAllQuotePrices();
};

const deleteOrder = async(quote)=>{
  await OrderService.deleteOrder(quote._id); 
  await ProductOrderService.deleteProductsOrder(quote.numberOrder);
  getAllQuotePrices();
}
  
const goShowProduct = (numberOrder) =>{
    navigate('/showOrder',{state:numberOrder});
  }


const onSearchSubmit = async (e)=>{
  console.log('ggg');
  const data =e.target.value;
  try{
    const orders = await OrderService.getSearchOrder(data);
    console.log(orders);
    setQuotesPrice(orders.data);
    setError('');
    if(orders.data.length < 1){
      console.log('hhh');
    setError('אין תוצאות');
    }
  }
  catch(ex){
    console.log(ex);
  }
}

  return (
    <React.Fragment>
    <div className="container col-lg-12 mt-4 text-end">
      <h1 className='text-center'>הצעות מחיר</h1>
      <div className='row'>
      <form className="col-lg-4" role="search">
        <input className="form-control" type="search" placeholder="חיפוש..." aria-label="Search" onKeyUp={(e) => {onSearchSubmit(e)}} />
      </form>
      <h3 className='col-lg-8'>{error}</h3>
      </div>
      <div className="row">
        {qoutesPrice && qoutesPrice.map((quote)=>(
          <React.Fragment>
          <div className="card col-lg-5 m-3">
          
            <div className="card-body">
            <h4>{quote.customerName} {quote.title && `- ${quote.title}`}</h4>
            <h4 className="me-5">{quote.date}</h4>
            <div className ="d-flex justify-content-between">
            <button  onClick={()=>{goShowProduct(quote)}} className="btn btn-primary">פרטי ההזמנה </button>
            <button  onClick={()=>{onDeleteOrder(quote)}} className="btn btn-danger">מחיקת ההזמנה</button>
            </div>
          </div>
          </div>
        
        </React.Fragment>
        ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default QuoteForm;