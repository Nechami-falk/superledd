
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import locationService from '../services/locationService';

function AddLocation() {

    const { register, handleSubmit, resetField  } = useForm(); 

    const onSubmit = async (data) => {
        console.log(data);
        try{
            await locationService.addLocation(data);
            toast.success('המיקום נוספה בהצלחה')
            
        }
        catch(ex){
            console.log(ex.response);
        }  
        resetField("locationName");  
    }

    

  return (
    <div className="container col-lg-5 text-end">
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>הוספת מיקום</h1>
            <lable className="form-label">מיקום</lable>
            <input className="form-control text-end" type="text" name="locationName" {...register("locationName")}/>
            <input type="submit" className="btn btn-success mt-3"/>
        </form>
    </div>

    
  )
}

export default AddLocation;