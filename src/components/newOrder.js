import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';

import AddProduct from './addProduct';

function NewOrder() {
useEffect( () => {
  let curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0,10);
  settDate(date);
}, []);


const { register, formState: { errors } } = useForm(); 
const [tdate, settDate] = useState();
const[counter,setCounter]=useState(1);
const[product, setProduct] = useState([]);
const[formInputProduct, setFormInputProduct] = useState({
  productName:'',
  company:'',
  catalogNumber:'',
  model:'',
  productColor:'',
  price:'',
  image:'',
  remarks:''
}); 

const getData = (data) =>{
    
  console.log(data);
  
}

/* const onInput =(data)=>{
  let nameField = data.target.name;
  let valueField = data.target.value;
  let newProd = {...formInputProduct,
    [nameField]:valueField}
  setFormInputProduct(newProd);
  console.log(newProd);
    }  */

const handleInputChange =(e)=>{
  const inputFieldValue = e.target.value;
  const inputFieldName = e.target.name;
  const newInputValue = {
    ...formInputProduct, [inputFieldName]:inputFieldValue}
  setFormInputProduct(newInputValue);
  console.log(newInputValue);

}

const[newOrder, setNewOrder] = useState([<AddProduct key={counter} counter={counter} handleInputChange={handleInputChange} />]);
const errorStyle = {
    color:"red"
   }

const addProductField = (e)=>{
  e.preventDefault();
  console.log(newOrder);
  setCounter(counter+1);
  setNewOrder([...newOrder,<AddProduct key={counter+1} counter={counter+1} handleInputChange={handleInputChange} />]);
}

const removeProductField=(e)=>{
  e.preventDefault();
  console.log('del');
  console.log(newOrder);
  setCounter(counter-1);
  let newNewOrder = newOrder.slice(0, -1);
  setNewOrder(newNewOrder);
  console.log(newNewOrder);
}


/* const onInput = (e) =>{
  const productName=e.target.value;
  const company=e.target.value;
  catalogNumber:'',
  model:'',
  productColor:'',
  price:'',
  image:''
} */

  return (
    <React.Fragment>
    <div className="container col-lg-5 mt-4 text-end">
      
        <h1>טופס הזמנה</h1>
        <form>
        
          <div className="border p-2">
          <h4>פרטי המזמין</h4>
          <label className="form-label">תאריך</label>
            <input className="form-control" type="date" defaultValue={tdate} name="name"{...register("date",{required:true})}/>
            <label className="form-label">שם</label>
            <input className="form-control" type="text" name="name"{...register("name",{required:true})}/>
            {errors.name && errors.name.type === "required" && (
            <p className="errorMsg" style={errorStyle}>חובה להזין שם</p>
          )}
            <label className="form-label">טלפון נייד</label>
            <input className="form-control" type="text" name="phone"{...register("phone",{required:true, minLength:9, maxLength:10})}/>
            {errors.phone && errors.phone.type === "required" && (
            <p className="errorMsg" style={errorStyle}>מספר טלפון חובה</p>
          )}
          {errors.phone && (errors.phone.type === "maxLength" || errors.phone.type === "minLength") && (
            <p className="errorMsg" style={errorStyle}>מספר טלפון לא תקין</p>
          )}
            <label className="form-label">טלפון בית</label>
            <input className="form-control" name="phone2"{...register("phone2",{minLength:9, maxLength:10})}/>
            {errors.phone2 && (errors.phone2.type === "maxLength" || errors.phone.type === "minLength") && (
            <p className="errorMsg" style={errorStyle}>מספר טלפון לא תקין</p>
          )}
          {errors.phone2 && errors.phone2.type === "minLenght" && (
            <p className="errorMsg" style={errorStyle}>מספר טלפון לא תקין</p>
          )}
            <label className="form-label">מייל</label>
            <input className="form-control" type="email" name="email"{...register("email",{pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})}/>
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg" style={errorStyle}>מייל לא חוקי</p>
          )}
            <label className="form-label">כתובת</label>
            <input className="form-control" type="adress" name="adress"/>
        
          <hr/>
          <h4 className="mt-3">פרטי הזמנה</h4>
          {newOrder}
          <button className="btn btn-warning m-3" onClick={removeProductField}>מחיקת מוצר -</button>
          <button className="btn btn-danger m-3" onClick={addProductField}>הוספת מוצר +</button>
          <hr/> 

          </div>

          <button className="btn btn-success mt-3" type="submit" onClick={getData}>שלח</button>
        </form>
    </div>
    </React.Fragment>
  )
}

export default NewOrder;