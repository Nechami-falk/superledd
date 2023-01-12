import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CustomerService } from '../services/customerService';


function EditCustomer() {

    const location = useLocation();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({});

    useEffect(() =>{

     const data = location.state;
     setCustomer(data);
     console.log(data);
     reset({});
      
    }, []);

    const errorStyle = {
        color:"red"
       }

    const onSubmit = async(data)=>{
        try{
            const newData = data;
            newData._id = customer._id;
        console.log('hhh');
        console.log(data);
        await CustomerService.editCustomer(newData._id , newData);   
        console.log('ewgg');
        navigate('/myCustomers');
    }
        catch(ex){
            console.log(ex);
        }
          
    }    

  return (
    <>
     <div className="container col-lg-5 mt-4 text-end">
      <h1>טופס עדכון פרטי לקוח</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border p-2">
          
            <label className="form-label">שם</label>
            <input className="form-control" type="text" name="name" defaultValue={customer && customer.name} {...register("name",{required:true})}/>
            {errors.name && errors.name.type === "required" && (
            <p className="errorMsg" style={errorStyle}>חובה להזין שם</p>
          )}
            <label className="form-label">טלפון נייד</label>
            <input className="form-control" type="text" name="phone" defaultValue={customer && customer.phone} {...register("phone",{required:true, minLength:9, maxLength:10})}/>
            {errors.phone && errors.phone.type === "required" && (
            <p className="errorMsg" style={errorStyle}>מספר טלפון חובה</p>
          )}
          {errors.phone && (errors.phone.type === "maxLength" || errors.phone.type === "minLength") && (
            <p className="errorMsg" style={errorStyle}>מספר טלפון לא תקין</p>
          )}
            <label className="form-label">טלפון בית</label>
            <input className="form-control" name="phone2" defaultValue={customer && customer.phone2} {...register("phone2",{minLength:9, maxLength:10})}/>
            {errors.phone2 && (errors.phone2.type === "maxLength" || errors.phone2.type === "minLength") && (
            <p className="errorMsg" style={errorStyle}>מספר טלפון לא תקין</p>
          )}
          {errors.phone2 && errors.phone2.type === "minLenght" && (
            <p className="errorMsg" style={errorStyle}>מספר טלפון לא תקין</p>
          )}
            <label className="form-label">מייל</label>
            <input className="form-control" type="email" name="email" defaultValue={customer && customer.email} {...register("email",{pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})}/>
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg" style={errorStyle}>מייל לא חוקי</p>
          )}
            <label className="form-label">כתובת</label>
            <input className="form-control" type="adress" name="adress" defaultValue={customer && customer.adress} {...register("adress")}/>
            <div className="text-center">
            <input type="submit" className="btn btn-success mt-3"/>
            
            </div>
        </div>
        </form>
        </div>
    </>
  )
}

export default EditCustomer