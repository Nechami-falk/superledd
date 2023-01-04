import React, {useState, useEffect} from 'react';
import orderService from '../services/orderService';
import {Link, useNavigate} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';



function QuoteForm() {

  useEffect( () => {
    getAllQuotePrices();
  },[])

  const[qoutesPrice, setQuotesPrice] = useState()
   const navigate = useNavigate();

  const getAllQuotePrices = async()=>{
    console.log('12345');
    try{
  let quotes = await orderService.getQuotePriceOrders();
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
  await orderService.deleteOrder(quote._id);
}
  /* const formatDate = (tdate) =>{
    let curr = new Date(tdate);
        curr.setDate(curr.getDate());
        let date = curr.toISOString().substring(0,10);
        console.log(date);


  }
 */
  const goShowProduct = (numberOrder) =>{
    navigate('/showOrder',{state:numberOrder});
  }


  

  return (
    <React.Fragment>
    <div className="container col-lg-12 mt-4 text-end">
  
      <h1 className='text-center'>הצעות מחיר</h1>
      
      <div className="row">
        {qoutesPrice && qoutesPrice.map((quote)=>(
          <React.Fragment>
          <div className="card col-lg-5 m-3">
          
            <div className="card-body">
            <h4><span className="me-5">{quote.date}</span>  {quote.customerName}</h4>
            <div className ="d-flex justify-content-between">
            <button  onClick={()=>{goShowProduct(quote)}} className="btn btn-primary">פרטי ההזמנה </button>
            <button  onClick={()=>{onDeleteOrder(quote)}} className="btn btn-danger">מחיקת ההזמנה</button>
            </div>
          </div>
          </div>
        
        </React.Fragment>
        ))};
        </div>
      </div>
    </React.Fragment>
  )
}

export default QuoteForm;