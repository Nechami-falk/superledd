import React from 'react';
import {useState, useEffect, useMemo, useCallback} from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {ProductService} from '../services/productService';
import { useGetStaticData } from '../hooks/staticData';


function AddProduct (props) {
 
  const shadesLight = ['C.C.T', '4000k', '3000k', '6000k' ];
 /*  const status = ['הצעת מחיר', 'אושר להזמנה', 'הוזמן', 'סופק']; */
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
  }); 
  const [catalogNumber, setCatalogNumber] = useState();
  const [price, setPrice] = useState();
  const [error, setError] = useState('');
  const [image, setImage] = useState({});


  const {categories, companies, locations, isLoding} = useGetStaticData();

  const getCatalogNumber = useCallback(
    async() =>{
    console.log('getCatalogNumber');
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
  },[reset]);

  useEffect( () => { 
    getCatalogNumber();
  },[getCatalogNumber])

 


  

  const companiesOption = useMemo(() =>
  companies && companies.map((company,id) => (
    <option className="option-form" key={id}>{company.companyName}</option>
    )),[companies]);

  const categoriesOption = useMemo(() => 
  categories && categories.map((category) => (
    <option className="option-form text-end" key={category.id} value={category.categoryName}>{category.categoryName}</option>
    )),[categories]);

  const locationOption = useMemo(() =>
  locations && locations.map((location) => (
    <option className="option-form text-end" key={location.id} value={location.locationName}>{location.locationName}</option>
      )),[locations])


const onChange = (e)=>{
  const img =e.target.files[0];
  setImage(img);
  console.log(img);
}



const onSubmit = async(data)=> {

  const newData = {
    ...data,
    imageNum:Date.now(),
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
    setError('');  
    getCatalogNumber();
    
  }
  catch(ex){
    console.log(ex.response.data);
    if(ex){
      setError(ex.response.data);
    }
  }
}
  
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
    let newPrice = parseFloat(price*1.7).toFixed(2);
    console.log('קטן מאלף ');
    setPrice(newPrice);
    reset({price:newPrice})
  }
  if(price >= 1000){
    let newPrice = parseFloat(price*1.65).toFixed(2);
    console.log('גדול מאלף ');
    setPrice(newPrice);
    reset({price:newPrice})
  }
}


const errorStyle = {
        color:"red"
       }




  return (
   
    
    <React.Fragment>
      {isLoding && 
      <div className="container text-center">
        <div className="spinner-border text-primary" role="status">
        <span className="sr-only"></span>
      </div>
      </div>}
      <div className="container text-end col-lg-5">
        
      <h4>הוספת מוצר</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="text-end">
        <label className="form-label">שם המוצר</label>
            <input className="form-control text-end" type="text" name="name"{...register("name",{required:true})}/>
            {errors.productName && errors.productName.type === "required" && (
            <p className="errorMsg" style={errorStyle}>חובה להזין שם</p>
          )}

      <label className="form-label">חברה</label>
        <select className="form-select text-end"  name="company" {...register("company")}>
        <option>בחר חברה</option>
        {companiesOption}
        </select>

        <label className="form-label">קטגוריה</label>
            <select className="form-select text-end"  name="category" {...register("category")}>
            <option>בחר קטגוריה</option>
              {categoriesOption}
            </select>

      <label className="form-label">מיקום</label>
        <select className="form-select text-end"  name="location" {...register("location")}>
          <option>בחר מיקום</option>
          {locationOption}
        </select>
               
        <label className="form-label">מק"ט</label>
            <input className="form-control text-end" type="text" defaultValue={catalogNumber} name="catalogNumber"{...register("catalogNumber")}/>
        
        <label className="form-label">דגם</label>
            <input className="form-control text-end" type="text"  name="model"{...register("model")}/>
           
            <label className="form-label">גוון אור</label>
        <select className="form-select text-end"  name="shadeLight" {...register("shadeLight")}>
          <option>בחר גוון</option>
             {shadesLight && shadesLight.map((shade, i) => (
          <option className="option-form text-end" key={i} value={shade}>{shade}</option>
            ))};
        </select>
               

        <label className="form-label">צבע</label>
            <input className="form-control text-end" type="text"  name="color"{...register("color")}/>

            <label className="form-label">מחיר עלות</label>
            <input className="form-control text-end" type="text"  name="agentPrice" onKeyUp={(e)=>caculatePrice(e)} {...register("agentPrice", /* {onBlur:(e)=>
            setPrice(e.target.value * 1.8)} */)}/>        

        <label className="form-label">מחיר</label>
            <input className="form-control text-end" type="text"  name="price" defaultValue={price} {...register("price")}/> 

        <label className="form-label">תמונה</label>
            <input className="form-control text-end" type="file" onInput={onChange} name="image"{...register("image")}/> 
        
     {/*    <label className="form-label">סטטוס</label>
          <select className="form-select text-end"  name="status" {...register("status")}>
          {status && status.map((sta,i) => (
              <option className="option-form" key={i} value={sta}>{sta}</option>
      ))};
          </select> */}

        <label className="form-label">הערות</label>
           <input className="form-control text-end" type="text" name="remarks"{...register("remarks")}/> 
           <h3 style={errorStyle}>{error}</h3>
        <input type="submit" className="btn btn-success mt-3"/>
        
        </form>
        </div>
    </React.Fragment>
  )
}

export default AddProduct;