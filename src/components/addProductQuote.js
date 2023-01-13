import React, {useState, useEffect, useMemo, useCallback} from "react";
import { useForm } from "react-hook-form";
import {ProductService} from "../services/productService";
import {ProductOrderService} from "../services/productOrderService";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useGetStaticData} from '../hooks/staticData';


function AddProductQuote() {

  const navigate = useNavigate();
  const location = useLocation();
  
  const [orderDetails, setOrderDetails] = useState();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [error2, setError2] = useState();
  const [currentProd, setCurrentProd] = useState();
  const [image, setImage] = useState('');
  const [price, setPrice] = useState();
  const [numOfImage, setNumOfImage] =useState();
  const [productName,setProductName] = useState();
/*   const [quantity, setQuantity] = useState(1); */
  const [catalogNumber, setCatalogNumber] = useState();
  const [companyInput, setCompanyInput] = useState(false);
  const [categoryInput, setCategoryInput] = useState(false);
  const [locationInput, setLocationInput] = useState(false);
  const { register, handleSubmit, reset } = useForm({ });
  
  /* const getOrderDetails= () =>{
    console.log('ggg');
    console.log(location.state);
    setOrderDetails(location.state);
} */

const getProducts = async() =>{
  console.log();
  try{
  const data = await ProductService.getProducts();
  setProducts(data.data);
  console.log(data.data);
}
catch(ex){
  console.log(ex.response);
}
}

  useEffect(() => {
    setOrderDetails(location.state);
  }, [location.state]);

  useEffect(() => {
    getProducts();
  }, []);

 useEffect(() => {
    const num = Date.now().toString();
    console.log('numOfImage',num);
    setNumOfImage(num);
  }, [])
  

  const getCatalogNumber = useCallback(
    async() =>{
    console.log('11111');
    try{
    let newCatalogNumber = await ProductService.getCatalogNumber();
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
},[reset])

  useEffect(() => {
    getCatalogNumber();
  }, [getCatalogNumber]);
  

  const {categories, companies, locations, isLoding} = useGetStaticData();
  
  const companiesOptions = useMemo(() =>  companies && companies.map((comp) => (
    <option className="option-form text-end" key={comp.id}  defaultValue={ currentProd && currentProd.company}>{comp.companyName}</option>
      )),[companies, currentProd]);

  const categoriesOptions = useMemo(() => categories && categories.map((category) => (
    <option className="option-form text-end" key={category.id} defaultValue={ currentProd && currentProd.category}>{category.categoryName}</option>
      )),[categories, currentProd]); 
      
  const locationOptions = useMemo(() => locations && locations.map((location) => (
    <option className="option-form text-end" key={location.id} defaultValue={ currentProd && currentProd.location}>{location.locationName}</option>
      )),[locations, currentProd]); 

  const shadesLight = useMemo (() => ['C.C.T', '4000k', '3000k', '6000k' ],[]);
  const shadeLightOption = useMemo(() => shadesLight && shadesLight.map((shade, i) => (
    <option className="option-form text-end" key={i} defaultValue={currentProd && currentProd.shadeLight}>{shade}</option>
      )),[currentProd, shadesLight]);

  function handleFileChange(e) {
    const img = {
      data: e.target.files[0],
    };
    console.log(img);
    setImage(img);
  }



const onChange = (e)=>{
  console.log('imageeeee');
  const img =e.target.files[0];
  setImage(img);
  console.log(img);
}


  const addProductToDB = async(data) => {
    console.log(data);
    console.log('numofimage',numOfImage);
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
      location:data.location,
      imageNum:numOfImage,
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
      await ProductService.addProduct(formData, config);
      setPrice('');
      toast.success('המוצר התווסף בהצלחה!');
      reset();    
      setCatalogNumber('');
      setPrice();
    }
    catch(ex){
      console.log(ex.response.data);
    }
  }


 const onSubmit = async(data) => {
 
  if(data.name){
    console.log(data.name);
  }
  else{
    onCompletionOrder();
    return
  }

  if(data.company === 'אחר'){
  data.company = data.company2;
  delete data.company2;
    }
  if(data.category === 'אחר'){
    data.category = data.category2;
    delete data.category2;
    }
  if(data.location === 'אחר'){
    data.location = data.location2;
    delete data.location2;
    }
  let details = '';
  console.log(data);
   if(data.category === 'בחר'){
     data.category = '';
   }
   if(data.company === 'בחר'){
     data.company = '';
   }
   if(data.location === 'בחר'){
     data.location = '';
   }

   if(!currentProd){
    console.log('current prod yes');
    console.log('data', data);
    addProductToDB(data);
    let newOrderDetails = {
      customerName:orderDetails.customerName,
      customerId:orderDetails.customerId,
      byEmployee:orderDetails.byEmployee,
      designer:orderDetails.designer,
      numberOrder:orderDetails.numberOrder,
      status:orderDetails.status,
      }
      data.image = numOfImage;
      details = {
        ...newOrderDetails,
        ...data,
       }
     console.log(details);
  }
  else{
 
 console.log(data);
 console.log('123'); 
 let newOrderDetails = {
  customerName:orderDetails.customerName,
  customerId:orderDetails.customerId,
  byEmployee:orderDetails.byEmployee,
  designer:orderDetails.designer,
  numberOrder:orderDetails.numberOrder,
  status:orderDetails.status,
  }
  data.image = image;
   details = {
     ...newOrderDetails,
     ...data,
    }
  }
   try{
     await ProductOrderService.addProductToOrder(details);
     toast.success('המוצר התווסף להזמנה');
     reset(); 
     setCurrentProd();
     getCatalogNumber();
     setPrice();

   }
   catch(ex){
     if(ex){
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
      
      console.log('befor', Date.now());
      setError('');
      let name = e.target.value;
      setProductName(name);
      console.log(name);
      try{
      let data = await ProductService.getProductByName(name);
      console.log('after');
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
          console.log(ex);
          getCatalogNumber();
          setCurrentProd();
        }
        console.log(ex.response.data);
        setError2(ex.response.data);
      }
    };
   

  const onCompletionOrder= ()=>{
    console.log('gggjjjj');
    toast.success('ההזמנה נשלחה בהצלחה');
    navigate('/showOrder', {state:orderDetails}); 
    }

  /* const handleChange = (event) => {
    console.log('3333');
    if (!event.nativeEvent.inputType) {
      event.target.blur();
    }
  }; */

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

  const onChangeCompany =(e)=>{
    console.log(e.target.value);
    if(e.target.value === "אחר"){
      setCompanyInput((current) => !current);
    }
    if(e.target.value !== "אחר"){
      setCompanyInput(false);
    }
  }

  const onChangeCategory = (e)=>{
    console.log(e.target.value);
    if(e.target.value === "אחר"){
    setCategoryInput((current) => !current);
    }
    if(e.target.value !== "אחר"){
      setCategoryInput(false);
    }
  }

  const onChangeLocation =(e)=>{
    console.log(e.target.value);
    if(e.target.value === "אחר"){
    setLocationInput((current) => !current);
  }
  if(e.target.value !== "אחר"){
    setLocationInput(false);
  }
  }

 

  return (
    <React.Fragment>
      {isLoding && 
      <div className="container text-center">
        <div className="spinner-border text-primary" role="status">
        <span className="sr-only"></span>
      </div>
      </div>}
    <div className="container col-lg-5 mt-4 text-end">
      
      <h1>הוספת מוצרים</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border p-2">
      {error2 && 
      <p className="h4" style={{color:"red"}}>{error2}</p>}
      <lable className="form-label">שם המוצר</lable>
            <br></br>

     <input
      className="form-control text-end"
        type="input"
        list="optionsList"
       onChange={onSelect}
        /* onClick={onSelect} */
        /* onFocus={clear} */
        /* onSelect={onSelect} */
        onKeyUp={()=>{setError2('')}}
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
            <select className="form-select" name="company"{...register('company')} onChange={onChangeCompany}>
              {currentProd && <option className="option-form text-end"  key={currentProd.id}  selected defaultValue={currentProd.company}>{currentProd.company}</option>}
              <option>בחר</option>
              {companiesOptions}
            </select>
          {companyInput && 
          <input className="form-control text-end mt-2" placeholder="חברה אחרת" type="text" name="company2" {...register('company2')} />}
          
          <label className="form-label">קטגוריה</label>
            <select className="form-select"  name="category" {...register('category')} onChange={onChangeCategory}>
              {currentProd && <option className="option-form text-end"  key={currentProd.id} selected defaultValue={currentProd.category}>{currentProd.category}</option>}
              <option>בחר</option>
              {categoriesOptions}
            </select>
            {categoryInput && 
          <input className="form-control text-end mt-2" placeholder="קטגוריה אחרת" type="text" name="category2" {...register('category2')} />}

        <label className="form-label">מיקום</label>
          <select className="form-select text-end"  name="location" {...register("location")} onChange={onChangeLocation}>
            {currentProd && <option className="option-form text-end"  key={currentProd.id} selected defaultValue={currentProd.location}>{currentProd.location}</option>}
            <option>בחר</option>
            {locationOptions}
          </select>
          {locationInput && 
          <input className="form-control text-end mt-2" placeholder="מיקום אחר" type="text" name="location2" {...register('location2')} />}
            
        <label className="form-label">גוון אור</label>
          <select className="form-select text-end"  name="shadeLight" {...register("shadeLight")}>
            {currentProd && <option className="option-form text-end"  key={currentProd.shadeLight} selected defaultValue={currentProd.shadeLight}>{currentProd.shadeLight}</option>}
            <option>בחר גוון</option>
             {shadeLightOption}
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
            <input className="form-control text-end" onInput={onChange} type="file" name="image" defaultValue={ currentProd && currentProd.image} onChange={handleFileChange}  {...register('image')}/> 
          
          <label className="form-label">כמות</label>
          <input className="form-control text-end"  type="number" step="any" defaultValue={1} {...register('quantity')}/> 

          <label className="form-label">הערות</label>
            <input className="form-control text-end"  type="text" defaultValue={ currentProd? currentProd.remarks : ''} {...register('remarks')}/> 
          
        <h3 style={{color:"red"}}>{error && error}</h3>

        <div className="container col-lg-12 d-flex justify-content-around">
        <button type="submit" className="btn btn-warning mt-3">הוסף מוצר</button>
        <button className="btn btn-info mt-3" type="דונצןא" onClick={onCompletionOrder}>סיום הזמנה</button>
{/*<button className = "btn btn-success mt-3" type="button" onClick={onAddProduct}>הוסף מוצר </button> */}
        
        
        </div>
        </div>
      </form>
      
      </div>
   
    </React.Fragment>
  );
}

export default AddProductQuote;