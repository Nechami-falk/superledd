import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import companyService from "../services/companyService";
import categoryService from "../services/categoryService";
import productService from "../services/productService";
import productOrderService from "../services/productOrderService";
import{ useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import locationService from '../services/locationService';

function AddProductQuote() {
  
    useEffect( () => {
      
      getProducts();
      getCompanies();
      getCategories();
      getOrderDetails();
      getLocations();
      getCatalogNumber();

    }, []);

    const getProducts = async() =>{
      console.log();
      try{
      let data = await productService.getProducts();
      setProducts(data.data);
      console.log(data.data);
    }
      catch(ex){
      console.log(ex.response);
    }
  }

  let location = useLocation();

    const getOrderDetails= () =>{
      console.log('ggg');
      console.log(location.state);
      setOrderDetails(location.state);
    }

  /*   const getDate = () =>{
    let curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0,10);
    settDate(date);
    } */

    const getCompanies = async ()=>{
      try{
      let data = await companyService.getCompany();
      let comp = data;
      setCompanies(comp.data);
    }
    catch(ex){
      console.log(ex.response);
    }
    
  }

  const getLocations = async ()=>{
    try{
      let data = await locationService.getLocations();
      setLocations(data.data);
      console.log(data.data);
    }
    catch(ex){
      console.log(ex);
    }
  }

  const getCategories = async () =>{
    try{
    let data = await categoryService.getCategory();
    let categoriesData =data;
    setCategories(categoriesData.data);
  }
  catch(ex){
    console.log(ex.response);
  }
}
  const navigate = useNavigate();

  const shadesLight = ['C.C.T', '4000k', '3000k', '6000k' ];

  const [locations, setLocations ] = useState();
  const [orderDetails, setOrderDetails] = useState();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [currentProd, setCurrentProd] = useState();
  const [image, setImage] = useState('');
  const [price, setPrice] = useState();
  const [productName,setProductName] = useState();
  const [quantity, setQuantity] = useState(1);
  const [catalogNumber, setCatalogNumber] = useState();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ });
  
  function handleFileChange(e) {
    const img = {
      data: e.target.files[0],
    };
    console.log(img);
    setImage(img);
  }

  const getCatalogNumber = async() =>{
    console.log('11111');
    try{
    let newCatalogNumber = await productService.getCatalogNumber();
    newCatalogNumber = (newCatalogNumber.data[0].catalogNumber)+1;
    console.log(newCatalogNumber);
    setCatalogNumber(newCatalogNumber);
    console.log(newCatalogNumber);
    reset({
      catalogNumber:newCatalogNumber
    })
    }
  catch(ex){
    console.log(ex.response);
    if(ex.response === undefined){
      setCatalogNumber(100);
    }
  }
}

const onChange = (e)=>{
  console.log('imageeeee');
  const img =e.target.files[0];
  setImage(img);
  console.log(img);
}


  const addProductToDB = async(data) => {
    console.log(data);
    const newData = {
      name:data.name,
      company:data.company,
      catalogNumber:data.catalogNumber,
      model:data.model,
      color:data.color,
      price:data.price,
      agentPrice:data.agentPrice,
      category:data.category,
      remarks:data.remarks,
      location:data.location
    }
    console.log(newData);
    console.log(image);
    const formData = new FormData();
    formData.append('data', JSON.stringify(newData));
    formData.append('image',image);
    const config = {
  
      headers: {
          'content-type': 'multipart/form-data'
      },
    };
    try{
      await productService.addProduct(formData, config);
      setPrice('');
      toast.success('המוצר התווסף בהצלחה!');
      reset();    
      getCatalogNumber();
    }
    catch(ex){
      console.log(ex.response.data);
    }
  }


 /*  const onSubmit = async(data) => {
    
     addProductToDB(data); 
    if(data.category === 'בחר'){
      data.category = '';
    }
    if(data.company === 'בחר'){
      data.company = '';
    }
    if(data.location === 'בחר'){
      data.location = '';
    }
    console.log(data);
  console.log('123');
   
    let details = {
      ...orderDetails,
      ...data,
     }
   console.log(details);
   const formData = new FormData();
   console.log(details.image);
   let img = image ? image : details.image;
   console.log(img);
   formData.append('image', img);
   formData.append('details', JSON.stringify(details));
    console.log(formData);
    const config = {

      headers: {
          'content-type': 'multipart/form-data'
      },
    }
   
    try{
      await productOrderService.addProductToOrder(formData, config);
      toast.success('המוצר התווסף להזמנה');
      reset();
      setCurrentProd();

    }
    catch(ex){
      if(ex.response.status === 400){
        setError('חסרים פרטים להוספת המוצר!')
      }
      console.log(ex.response);
    }
  } 
}*/

 const onSubmit = async(data) => {
    
   if(data.category === 'בחר'){
     data.category = '';
   }
   if(data.company === 'בחר'){
     data.company = '';
   }
   if(data.location === 'בחר'){
     data.location = '';
   }
   addProductToDB(data);
   console.log(data);
 console.log('123'); 
 let newOrderDetails = {
  customerName:orderDetails.customerName,
  customerId:orderDetails.customerId,
  byEmployee:orderDetails.byEmployee,
  designer:orderDetails.designer,
  numberOrder:orderDetails.numberOrder,
  status:orderDetails.status
 }
  data.image = `http://superled-api.onrender.com/uploads/${orderDetails.name}.png`;
   let details = {
     ...newOrderDetails,
     ...data,
     
    }
  console.log(details);
   try{
     await productOrderService.addProductToOrder(details);
     toast.success('המוצר התווסף להזמנה');
     reset(); 
     setCurrentProd();
     getCatalogNumber();

   }
   catch(ex){
     if(ex.response.status === 400){
       setError('חסרים פרטים להוספת המוצר!')
     }
     console.log(ex.response);
   }
 } 
 
  /* const items =  products.map((prod) => ({ 
    id:prod._id,
    value: prod.name
  })); */

  const onSelect = async(e) =>{
    console.log('111111');
    setError('');
    let name = e.target.value;
    setProductName(name);
    try{
    let data = await productService.getProductByName(name);
    console.log(data);
    setCurrentProd(data.data);
    setImage(data.data.image);
    console.log(data.data.image);
    setCatalogNumber(data.data.catalogNumber);
    reset({});
  }
    catch(ex){
      if(ex){
        console.log('no');
        getCatalogNumber();
        setCurrentProd();
        setImage();
      }
      console.log(ex);
    }
   
  } 

  const onCompletionOrder= (data)=>{
    console.log();
    if(data){
      onSubmit(data);
    }
    toast.success('ההזמנה נשלחה בהצלחה');
    navigate('/showOrder', {state:orderDetails});   
  }

  const handleChange = (event) => {
    console.log('3333');
    if (!event.nativeEvent.inputType) {
      event.target.blur();
    }
  };

  const caculatePrice = (e) =>{
    console.log(e.target.value);
    let price=e.target.value;
    if(price <= 500){
     let newPrice = parseFloat(price*1.8).toFixed(2);
     console.log('קטן מחמש מאות');
     setPrice(newPrice);
     reset({price:newPrice})
    }
    if(price > 500 && price < 1000){
      let newPrice = parseFloat(price * 1.7).toFixed(2);
      console.log('קטן מאלף ');
      setPrice(newPrice);
      reset({price:newPrice})
    }
    if(price >= 1000){
      let newPrice = parseFloat(price * 1.65).toFixed(2);
      console.log('גדול מאלף ');
      setPrice(newPrice);
      reset({price:newPrice})
    }
    
  }
   

  return (
    <React.Fragment>
    <div className="container col-lg-5 mt-4 text-end">
      <h1>הוספת מוצרים</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border p-2">
      <lable className="form-label">שם המוצר</lable>
            <br></br>

     <input
      className="form-control text-end"
        type="input"
        list="optionsList"
        onChange={handleChange} 
        onClick={onSelect}
        /* onFocus={clear} */
        /* onSelect={onSelect} */
        {...register('name')}
        onBlur={onSelect}
        name='name'
      />
      <datalist id="optionsList">
        {products.map((o) => (
          <option key={o.id} >{o.name}</option>
        ))} 
        </datalist>

          <label className="form-label">חברה</label>
            <select className="form-select" name="company"{...register('company')}>
              {currentProd && <option className="option-form text-end"  key={currentProd.id}  selected defaultValue={currentProd.company}>{currentProd.company}</option>}
              <option>בחר</option>
              {companies && companies.map((comp) => (
            <option className="option-form text-end" key={comp.id}  defaultValue={ currentProd && currentProd.company}>{comp.companyName}</option>
              ))};
            </select>
          
          <label className="form-label">קטגוריה</label>
            <select className="form-select"  name="category" {...register('category')}>
              {currentProd && <option className="option-form text-end"  key={currentProd.id} selected defaultValue={currentProd.category}>{currentProd.category}</option>}
              <option>בחר</option>
              {categories && categories.map((category) => (
            <option className="option-form text-end" key={category.id} defaultValue={ currentProd && currentProd.category}>{category.categoryName}</option>
  
              ))};
            </select>

        <label className="form-label">מיקום</label>
          <select className="form-select text-end"  name="location" {...register("location")}>
            {currentProd && <option className="option-form text-end"  key={currentProd.id} selected defaultValue={currentProd.location}>{currentProd.location}</option>}
            <option>בחר</option>
            {locations && locations.map((location) => (
            <option className="option-form text-end" key={location.id} defaultValue={ currentProd && currentProd.location}>{location.locationName}</option>
              ))};
          </select>
            
        <label className="form-label">גוון אור</label>
          <select className="form-select text-end"  name="shadeLight" {...register("shadeLight")}>
            {currentProd && <option className="option-form text-end"  key={currentProd.shadeLight} selected defaultValue={currentProd.shadeLight}>{currentProd.shadeLight}</option>}
            <option>בחר גוון</option>
              {shadesLight && shadesLight.map((shade, i) => (
            <option className="option-form text-end" key={i} defaultValue={currentProd && currentProd.shadeLight}>{shade}</option>
              ))}; 
          </select>

        <label className="form-label">דגם</label>
            <input className="form-control text-end"  type="text" defaultValue ={currentProd && currentProd.model} {...register('model')} />

          <label className="form-label">מק"ט</label>
            <input className="form-control text-end" type="text" value={catalogNumber} {...register('catalogNumber')} />
          
          <label className="form-label">צבע</label>
            <input className="form-control text-end"  type="text" defaultValue={ currentProd && currentProd.color} {...register('color')}/>
          
            <label className="form-label">מחיר סוכן</label>
            <input className="form-control text-end" onKeyUp={(e)=>caculatePrice(e)} type="text" defaultValue={ currentProd && currentProd.agentPrice} {...register('agentPrice')}/>        

          <label className="form-label">מחיר</label>
            <input className="form-control text-end"  type="text" name='price' defaultValue={ currentProd ? currentProd.price : price} {...register('price')}/>        
          
          <label className="form-label">תמונה</label>
            <input className="form-control text-end" onInput={onChange} type="file" defaultValue={ currentProd && currentProd.image} onChange={handleFileChange}  {...register('image')}/> 
          
          <label className="form-label">כמות</label>
          <input className="form-control text-end"  type="number" defaultValue={quantity} {...register('quantity')}/> 

          <label className="form-label">הערות</label>
            <input className="form-control text-end"  type="text" defaultValue={ currentProd? currentProd.remarks : ''} {...register('remarks')}/> 
          
        <h3 style={{color:"red"}}>{error && error}</h3>

        <div className="container col-lg-12 d-flex justify-content-around">
        <button type="submit" className="btn btn-warning mt-3">הוסף מוצר</button>
        <button className="btn btn-info mt-3" type="button" onClick={onCompletionOrder}>סיום הזמנה</button>
{/*<button className = "btn btn-success mt-3" type="button" onClick={onAddProduct}>הוסף מוצר </button> */}
        
        
        </div>
        </div>
      </form>
      </div>
   
    </React.Fragment>
  );
}

export default AddProductQuote;