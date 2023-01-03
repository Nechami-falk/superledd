import React, { useEffect, useState } from 'react';
import{ useLocation } from "react-router-dom";
import productOrderServices from '../services/productOrderService';
import companyService from "../services/companyService";
import categoryService from "../services/categoryService";
import locationService from '../services/locationService';
import { useForm } from "react-hook-form";

function EditProduct() {

  useEffect(() => {
    getProductDetails();
    getCompanies();
    getCategories();
    getLocations();
  }, []);

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

  const location = useLocation();
  const shadesLight = ['C.C.T', '4000k', '3000k', '6000k' ];
  const [product, setProduct] = useState();
  const [price, setPrice] = useState();
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [locations, setLocations ] = useState();
  const [error, setError] = useState();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ });
  
  const getProductDetails = async() =>{
    let prodId = location.state;
    try{
      let details = await productOrderServices.getProductDetailsById(prodId);
      setProduct(details.data);
      console.log(details.data);
      reset({
        name:product.name,
        category:product.category
      },{});
    }
    catch(ex){
      console.log(ex);
    }
  }


  
  const caculatePrice = (e) =>{
    console.log(e.target.value);
    let price=e.target.value;
    if(price < 500){
     let newPrice = parseFloat(price*1.8).toFixed(2);
     console.log('קטן מחמש מאות');
     setPrice(newPrice);
    }
    if(price > 500 && price < 1000){
      let newPrice = parseFloat(price * 1.7).toFixed(2);
      console.log('קטן מאלף ');
      setPrice(newPrice);
    }
    if(price > 1000){
      let newPrice = parseFloat(price * 1.65).toFixed(2);
      console.log('גדול מאלף ');
      setPrice(newPrice);
    }
  }

  const onSubmit=()=>{
    console.log(onsubmit);
  }

  return (
    
    <React.Fragment>
    <div className="container col-lg-5 mt-4 text-end">
      <h1>עדכון</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border p-2">
    
            

    {/*  <input
      className="form-control text-end"
        type="input"
        list="optionsList"
        onChange={handleChange} 
        onClick={onSelect}
        {...register('name')}
        onBlur={onSelect}
        name='name'
      />
      <datalist id="optionsList">
        {products.map((o) => (
          <option key={o.id} >{o.name}</option>
        ))} 
        </datalist> */}

   <label className="form-label">שם המוצר</label>
   <input className="form-control text-end" type="text" name="name" defaultValue={product && product.name} {...register('name')} />

          <label className="form-label">חברה</label>
            <select className="form-select" defaultValue={product && product.company} name="company"{...register('company')}>
              {product && <option className="option-form text-end"  key={product.id}>{product.company}</option>}
              <option>בחר</option>
              {companies && companies.map((comp) => (
            <option className="option-form text-end" key={comp.id} >{comp.companyName}</option>
              ))};
            </select>
          
            <label className="form-label">קטגוריה</label>
            <select className="form-select"  name="category" defaultValue={product && product.category} {...register('category')}>
              {product && <option className="option-form text-end"  key={product.id} >{product.category}</option>}
              <option>בחר</option>
              {categories && categories.map((category) => (
            <option className="option-form text-end" key={category.id} >{category.categoryName}</option>
  
              ))};
            </select>

            <label className="form-label">מיקום</label>
        <select className="form-select text-end"  name="location" defaultValue={product && product.location} {...register("location")}>
          {product && <option className="option-form text-end"  key={product.id} >{product.location}</option>}
          <option>בחר</option>
          {locations && locations.map((location) => (
          <option className="option-form text-end" key={location.id} >{location.locationName}</option>
            ))};
        </select>

          <label className="form-label">דגם</label>
            <input className="form-control text-end"  type="text" /* defaultValue ={product && product.model} */ {...register('model')} />
            
          <label className="form-label">גוון אור</label>
        <select className="form-select text-end" /* value={product && product.shadeLight} */ name="shadeLight" {...register("shadeLight")}>
          <option>בחר גוון</option>
             {shadesLight && shadesLight.map((shade, i) => (
          <option className="option-form text-end" key={i} value={shade}>{shade}</option>
            ))};
        </select>

          <label className="form-label">מק"ט</label>
            <input className="form-control text-end" type="text" /* defaultValue={product && product.catalogNumber} */ {...register('catalogNumber')} />
          
          <label className="form-label">צבע</label>
            <input className="form-control text-end"  type="text" /* defaultValue={ product && product.color} */ {...register('color')}/>
          
            <label className="form-label">מחיר סוכן</label>
            <input className="form-control text-end" onKeyUp={(e)=>caculatePrice(e)} type="text" defaultValue={ product && product.agentPrice} {...register('agentPrice')}/>        

          <label className="form-label">מחיר</label>
            <input className="form-control text-end"  type="text" defaultValue={ product ? product.price : price} {...register('price')}/>        
          
          {/* <label className="form-label">תמונה</label>
            <input className="form-control text-end" onInput={onChange} type="file" defaultValue={ product && product.image} onChange={handleFileChange}  {...register('image')}/>  */}
          
          <label className="form-label">כמות</label>
          <input className="form-control text-end"  type="number" /* defaultValue={product && product.quantity} */ {...register('quantity')}/> 

          <label className="form-label">הערות</label>
            <input className="form-control text-end"  type="text" /* defaultValue={ product? product.remarks : ''} */ {...register('remarks')}/> 
          
        <h3 style={{color:"red"}}>{error && error}</h3>

        <div className="container col-lg-12 d-flex justify-content-around">
        <button type="submit" className="btn btn-warning mt-3">הוסף מוצר</button>
       {/*  <button className="btn btn-info mt-3" type="button" onClick={onCompletionOrder}>סיום הזמנה</button> */}
        
        
        </div>
        </div>
      </form>
      </div>
   
    </React.Fragment>
  )
}

export default EditProduct