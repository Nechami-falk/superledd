import React from 'react'
import { useForm } from 'react-hook-form';
import companyService from '../services/companyService';
import{useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function AddCompany() {

    const navigate = useNavigate();
    const { register, handleSubmit, resetField } = useForm(); 

    const onSubmit = async (data) => {
        console.log(data);
        try{
            await companyService.addCompany(data);
            toast.success('החברה נוספה לרשימה');
        }
        catch(ex){
            console.log(ex.response);
        }   
        resetField('companyName');
    }
    

  return (
    <div className="container col-lg-5 text-end">
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>הוספת חברה</h1>
            <lable className="form-label">שם החברה</lable>
            <input className="form-control text-end" type="text" name="companyName" {...register("companyName")}/>
            <input type="submit" className="btn btn-success mt-3"/>
        </form>

       
    </div>

    
  )
}

export default AddCompany;