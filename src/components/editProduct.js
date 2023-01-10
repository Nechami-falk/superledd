import React, { useEffect, useState, useCallback } from 'react';
import{useNavigate, useLocation } from "react-router-dom";
import {ProductOrderService} from '../services/productOrderService';
import {CompanyService} from "../services/companyService";
import {CategoryService} from "../services/categoryService";
import {LocationService} from '../services/locationService';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

function EditProduct() {

  const navigate = useNavigate();

  const location = useLocation();
  const shadesLight = ['C.C.T', '4000k', '3000k', '6000k' ];
  const [product, setProduct] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [locations, setLocations ] = useState();
  const [error, setError] = useState();
  const { register, handleSubmit, reset } = useForm({ });
  

  const getProductDetails = useCallback(
   async() =>{
    let prodId = location.state;
    try{
      let details = await ProductOrderService.getProductById(prodId);
      setProduct(details.data);
      console.log(details.data);
      setPrice(details.data.price);
      reset({});
    }
    catch(ex){
      console.log(ex);
    }
  },[location.state, reset]);



  useEffect(() => {
    getProductDetails();
    getCompanies();
    getCategories();
    getLocations();
  }, [getProductDetails]);

  const getCompanies = async ()=>{
    try{
    let data = await CompanyService.getCompany();
    let comp = data;
    setCompanies(comp.data);
  }
  catch(ex){
    console.log(ex.response);
  }
  
}

const getLocations = async ()=>{
  try{
    let data = await LocationService.getLocations();
    setLocations(data.data);
    console.log(data.data);
  }
  catch(ex){
    console.log(ex);
  }
}

const getCategories = async () =>{
  try{
  let data = await CategoryService.getCategory();
  let categoriesData =data;
  setCategories(categoriesData.data);
}
catch(ex){
  console.log(ex.response);
}
}


  
  
  const caculatePrice = (e) =>{
    console.log(e.target.value);
    let price=e.target.value;
    if(price <= 500){
     let newPrice = parseFloat(price*1.8).toFixed(2);
     console.log('קטן מחמש מאות');
     setPrice(newPrice);
    }
    if(price > 500 && price < 1000){
      let newPrice = parseFloat(price * 1.7).toFixed(2);
      console.log('קטן מאלף ');
      setPrice(newPrice);
    }
    if(price >= 1000){
      let newPrice = parseFloat(price * 1.65).toFixed(2);
      console.log('גדול מאלף ');
      setPrice(newPrice);
    }
  }

  const onSubmit=async(data)=>{
    console.log(data);
    const newData = data;
    newData.price = price;
    newData._id = product._id;
    console.log(newData);
    try{
      await ProductOrderService.updateProductById(newData);
      toast.success('המוצר עודכן בהצלחה!');
      let numberOrder = {numberOrder: product.numberOrder};

      console.log(numberOrder);
      navigate('/showOrder', {state:numberOrder})
    }
    catch(ex){
      setError('בעיה בעדכון המוצר');
    }
    
  }

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
              {companies && companies.map((comp) => (
            <option className="option-form text-end" key={comp.id} >{comp.companyName}</option>
              ))};
            </select>
          
            <label className="form-label">קטגוריה</label>
            <select className="form-select"  name="category" defaultValue={product && product.category} {...register('category')}>
              {product && <option className="option-form text-end"  key={product.id} >{product.category}</option>}
              {categories && categories.map((category) => (
            <option className="option-form text-end" key={category.id} >{category.categoryName}</option>
  
              ))};
            </select>

            <label className="form-label">מיקום</label>
        <select className="form-select text-end"  name="location"  {...register("location")}>
          {product && <option className="option-form text-end"  key={product.id} value={product.location}>{product.location}</option>}
          {locations && locations.map((location) => (
          <option className="option-form text-end" key={location.id} >{location.locationName}</option>
            ))};
        </select>

          <label className="form-label">דגם</label>
            <input className="form-control text-end"  type="text" name="model" defaultValue ={product && product.model} {...register('model')} />
            
          <label className="form-label">גוון אור</label>
        <select className="form-select text-end" name="shadeLight" {...register("shadeLight")}>
             {shadesLight && shadesLight.map((shade, i) => (
          <option className="option-form text-end" key={i} defaultValue={product && product.shadeLight} value={shade}>{shade}</option>
            ))};
        </select>

          <label className="form-label">מק"ט</label>
            <input className="form-control text-end" type="text" defaultValue={product && product.catalogNumber} {...register('catalogNumber')} />
          
          <label className="form-label">צבע</label>
            <input className="form-control text-end"  type="text" name="color" defaultValue={ product && product.color} {...register('color')}/>
          
            <label className="form-label">מחיר סוכן</label>
            <input className="form-control text-end" name="agentPrice" onKeyUp={(e)=>caculatePrice(e)} type="text" defaultValue={ product && product.agentPrice} {...register('agentPrice')}/>        

          <label className="form-label">מחיר</label>
            <input className="form-control text-end" name="price" type="text" defaultValue={price} {...register('price')}/>        
          
          <label className="form-label">תמונה</label>
            <input className="form-control text-end" onInput={onChange} type="file" defaultValue={ product && product.image} onChange={handleFileChange}  {...register('image')}/>
          
          <label className="form-label">כמות</label>
          <input className="form-control text-end"  type="number" step="any" name="quantity" defaultValue={product && product.quantity} {...register('quantity')}/> 

          <label className="form-label">הערות</label>
            <input className="form-control text-end"  type="text" name ="remarks" defaultValue={ product? product.remarks : ''} {...register('remarks')}/> 
          
        <h3 style={{color:"red"}}>{error && error}</h3>

        <div className="container col-lg-12 d-flex justify-content-around">
        <button type="submit" className="btn btn-warning mt-3">עדכן מוצר</button>
       {/*  <button className="btn btn-info mt-3" type="button" onClick={onCompletionOrder}>סיום הזמנה</button> */}
        
        
        </div>
        </div>
      </form>
      </div>
   
    </React.Fragment>
  )
}

export default EditProduct