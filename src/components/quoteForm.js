import React, {useState, useEffect} from 'react';
import orderService from '../services/orderService';
import {Link, useNavigate} from 'react-router-dom';

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
      <div className="row">
        {qoutesPrice && qoutesPrice.map((quote)=>(
          <React.Fragment>
          <div className="card col-lg-5 m-3">
          
            <div className="card-body">
            <h4><span className="me-5">{quote.date}</span>  {quote.customerName}</h4>
           
            <button to='#' onClick={()=>{goShowProduct(quote)}} className="btn btn-primary">פרטים</button>
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