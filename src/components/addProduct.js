import React from 'react';
import {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
//import { useQuery } from 'react-query'
//import fetchCompanies from '../services/fetchApiCompany';
import companyService from '../services/companyService';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import locationService from '../services/locationService';



function AddProduct (props) {
 
  useEffect( () => {
    getCompanies();
    getCategories();
    getCatalogNumber();
    getLocations();
  },[])
  /* const companyData = useQuery('company', fetchCompanies);
  const companies = companyData.data;
  console.log(companies);
 */

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
/* window.location='/addProduct'; */
/* window.location.reload(false); */
}

  const getCategories = async () =>{
    console.log('category....');
    try{
    let data = await categoryService.getCategory();
    let categoriesData =data;
    setCategories(categoriesData.data);
  }
  catch(ex){
    console.log(ex.response);
  }
}

  const status = ['הצעת מחיר', 'אושר להזמנה', 'הוזמן', 'סופק'];
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
  }); 
  //const {onBlur} = register('price');
  const [companies,setCompanies] = useState([]);
  const [catalogNumber, setCatalogNumber] = useState();
  const [price, setPrice] = useState();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [image, setImage] = useState({});
  const [locations, setLocations ] = useState();

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

const onChange = (e)=>{
  const img =e.target.files[0];
  setImage(img);
  console.log(img);
}
/* const getPrice = (e) => {
  console.log(e);
} */
const onSubmit = async(data)=> {
  const newData = {
    ...data,
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
    if(ex){
      setError(ex.response.data);
    }
  }
}
  
const caculatePrice = (e) =>{
  console.log(e.target.value);
  let price=e.target.value;
  if(price < 500){
   let newPrice = price*1.8;
   console.log('קטן מחמש מאות');
   setPrice(newPrice);
  }
  if(price > 500 && price < 1000){
    let newPrice = price * 1.7;
    console.log('קטן מאלף ');
    setPrice(newPrice);
  }
  if(price > 1000){
    let newPrice = price * 1.65;
    console.log('גדול מאלף ');
    setPrice(newPrice);
  }
}


const errorStyle = {
        color:"red"
       }




  return (
   
    
    <React.Fragment>
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
        {companies && companies.map((company,id) => (
        <option className="option-form" key={id}>{company.companyName}</option>
    ))};
        </select>

        <label className="form-label">קטגוריה</label>
            <select className="form-select text-end"  name="category" {...register("category")}>
            <option>בחר קטגוריה</option>
              {categories && categories.map((category) => (
            <option className="option-form text-end" key={category.id} value={category.categoryName}>{category.categoryName}</option>
              ))};
            </select>

      <label className="form-label">מיקום</label>
        <select className="form-select text-end"  name="location" {...register("location")}>
          <option>בחר מיקום</option>
             {locations && locations.map((location) => (
          <option className="option-form text-end" key={location.id} value={location.locationName}>{location.locationName}</option>
            ))};
        </select>
               
        <label className="form-label">מק"ט</label>
            <input className="form-control text-end" type="text" defaultValue={catalogNumber} name="catalogNumber"{...register("catalogNumber")}/>
        
        <label className="form-label">דגם</label>
            <input className="form-control text-end" type="text"  name="model"{...register("model")}/>
        
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