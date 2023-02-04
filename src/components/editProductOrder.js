import React, { useEffect, useState, useCallback } from 'react';
import{useNavigate, useLocation } from "react-router-dom";
import {ProductOrderService} from '../services/productOrderService';
import {CompanyService} from "../services/companyService";
import {CategoryService} from "../services/categoryService";
import {LocationService} from '../services/locationService';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { ProductService } from '../services/productService';

function EditProductOrder() {

  const navigate = useNavigate();

  const location = useLocation();
  const shadesLight = ['בחר','C.C.T', '4000k', '3000k', '6000k' ];
  const [product, setProduct] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [locations, setLocations ] = useState();
  const [error, setError] = useState();
  const { register, handleSubmit, reset, setValue } = useForm({ });
  

  const getProductDetails = useCallback(
   async() =>{
    let prodId = location.state;
    console.log(prodId);
    try{
      let details = await ProductOrderService.getProductById(prodId);
      setProduct(details.data);
      console.log(details.data);
      
      console.log(details.data.image);
      setValue('name', details.data.name);
      setValue('category', details.data.category);
      setValue('company', details.data.company);
      setValue('location', details.data.location);
      setValue('shadeLight', details.data.shadeLight);
      setValue('model',details.data.model);
      setValue('color', details.data.color);
      setValue('agentPrice', details.data.agentPrice);
      setValue('price', details.data.price);
      setValue('remarks', details.data.remarks)
      setValue('image', details.data.image);
      setValue('quantity', details.data.quantity);
      setValue('catalogNumber', details.data.catalogNumber);
    }
    catch(ex){
      console.log(ex);
    }
  },[location.state, setValue]);



  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  useEffect(() => {
    getCompanies();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getLocations();
  }, [])
  
  


  
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
    let agentPrice=e.target.value;
    setValue('agentPrice',agentPrice )
    if(agentPrice <= 500){
     let newPrice = parseFloat(agentPrice*1.8).toFixed(2);
     console.log('קטן מחמש מאות',newPrice);
     setValue('price',newPrice);
    }
    if(agentPrice > 500 && agentPrice < 1000){
      let newPrice = parseFloat(agentPrice * 1.7).toFixed(2);
      console.log('קטן מאלף ',newPrice);
      setValue('price',newPrice);
    }
    if(agentPrice >= 1000){
      let newPrice = parseFloat(agentPrice * 1.65).toFixed(2);
      console.log('גדול מאלף ',newPrice);
      setValue('price',newPrice);
    }
  }

  const onSubmit=async(data)=>{
    console.log(data);
    console.log(product);
    const newData = data;
    newData._id = product._id;
    if(!image){
    console.log(data);
    newData.image = product.image;
    console.log(newData);
    try{
      await ProductOrderService.updateProductById(newData._id , newData);
      toast.success('המוצר עודכן בהצלחה!');
      let numberOrder = {numberOrder: product.numberOrder};

      console.log(numberOrder);
      navigate('/showOrder', {state:numberOrder})
    }
    catch(ex){
      setError('בעיה בעדכון המוצר');
    }
  }
  else{
   console.log('immageee!');
    console.log(newData);
    const img = Date.now();
    console.log(img);
    newData.image = img;
    newData.imageNum = img;
    console.log(newData);
   const formData = new FormData();
   formData.append('data', JSON.stringify(newData));
   formData.append('image',image);
   const config = {
  
    headers: {
        'content-type': 'multipart/form-data'
    },
  };
  try{
    const prod = await ProductOrderService.updateProductById(newData._id , newData);
    console.log(prod);
    console.log(formData);
    await ProductService.addImage(formData, config);
    toast.success('המוצר עודכן בהצלחה!');
    console.log(product.numberOrder);
    navigate('/showOrder', {state:product})
  }
  catch(ex){
    console.log(ex);
      }
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
    
   {/*<input
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
        </datalist>*/}

   <label className="form-label">שם המוצר</label>
   <input className="form-control text-end" type="text" name="name" {...register('name')} />

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
          {product && <option className="option-form text-end"  key={product.id} >{product.location}</option>}
          {locations && locations.map((location) => (
          <option className="option-form text-end" key={location.id} >{location.locationName}</option>
            ))};
        </select>

          <label className="form-label">דגם</label>
            <input className="form-control text-end"  type="text" name="model" defaultValue ={product && product.model} {...register('model')} />
            
          <label className="form-label">גוון אור</label>
        <select className="form-select text-end" name="shadeLight" {...register("shadeLight")}>
          
             {shadesLight && shadesLight.map((shade, i) => (
          <option className="option-form text-end" key={i}>{shade}</option>
            ))};
        </select>

          <label className="form-label">מק"ט</label>
            <input className="form-control text-end" type="text" {...register('catalogNumber')} />
          
          <label className="form-label">צבע</label>
            <input className="form-control text-end"  type="text" name="color" {...register('color')}/>
          
            <label className="form-label">מחיר סוכן</label>
            <input className="form-control text-end" name="agentPrice" onKeyUp={(e)=>caculatePrice(e)} type="text" {...register('agentPrice')}/>        

          <label className="form-label">מחיר</label>
            <input className="form-control text-end" name="price" type="text"  {...register('price')}/>        
          
          <label className="form-label">תמונה</label>
          
            <input className="form-control text-end" title="Choose a video please" onInput={onChange} type="file"  onChange={handleFileChange}  {...register('image')}/>
            
          <label className="form-label">כמות</label>
          <input className="form-control text-end"  type="number" step="any" name="quantity"  {...register('quantity')}/> 

          <label className="form-label">הערות</label>
            <input className="form-control text-end"  type="text" name ="remarks"  {...register('remarks')}/> 
          
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

export default EditProductOrder;