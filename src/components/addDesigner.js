import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {DesignerService} from '../services/designerService';

function AddDesigner() {

    const { register, handleSubmit, resetField } = useForm(); 

    const onSubmit = async (data) => {
        console.log(data);
        try{
            await DesignerService.addDesigner(data);
            toast.success('המעצבת נוספה לרשימה');
            
        }
        catch(ex){
            console.log(ex.response);
        }  
        resetField("designerName");      
    }



  return (
    <div className="container col-lg-5 text-end">
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>הוספת מעצב/ת</h1>
            <lable className="form-label">שם המעצבת</lable>
            <input className="form-control text-end" type="text" name="designerName" {...register("designerName")}/>
            <input type="submit" className="btn btn-success mt-3"/>
        </form>

       
    </div>

    
  )
}

export default AddDesigner;