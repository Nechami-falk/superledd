import React,{useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import customerService from '../services/customerService';




function AddCustomer(props) {



    useEffect( () => {
        getDate();
    },[]);

    const getDate = () =>{
        let curr = new Date();
        console.log(curr);
        curr.setDate(curr.getDate());
        var date = curr.toISOString().substring(0,10);
        settDate(date);
        reset({
          date:tdate,
        })
        console.log(date);
        }

    
        const [tdate, settDate]= useState();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({});
    
    
    const [customer, setCustomer] = useState('name');

    
    const navigate = useNavigate();
    
    const onSubmit = async (data) => {
        console.log(data);
        setCustomer(data);
        try{
        let customer = await customerService.addCustomer(data);
        let customerId= customer.data;
        console.log(customerId);
        setCustomer(customerId);
        toast.success('הלקוח נוסף בהצלחה!');
        reset();
        }
        catch(ex){
          if(ex.response){
            console.log(ex.response);
          }
        }
      }

    const errorStyle = {
        color:"red"
       }
  return (
    <React.Fragment>
    <div className="container col-lg-5 mt-4 text-end">
      <h1>טופס הוספת לקוח</h1>
      {/* <Headers
        renderCount={renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      /> */}

      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border p-2">
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
            {errors.phone2 && (errors.phone2.type === "maxLength" || errors.phone2.type === "minLength") && (
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
            <input className="form-control" type="adress" name="adress" {...register("adress")}/>
            <div className="text-center">
            <input type="submit" className="btn btn-success mt-3"/>
            
            </div>
        </div>
        </form>
        </div>
        </React.Fragment>
            
  )
}

export default AddCustomer;