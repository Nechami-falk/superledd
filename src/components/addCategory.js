
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {CategoryService} from '../services/categoryService';

function AddCategory() {

    const { register, handleSubmit, resetField } = useForm({
        defaultValue:{
            categoryName:''
        }
    }); 



    const onSubmit = async (data) => {
        console.log(data);
        try{
            await CategoryService.addCategory(data);
            toast.success('הקטגוריה נוספה בהצלחה')
            resetField("categoryName");
        }
        catch(ex){
            console.log(ex.response);
        }  
           
    }

    

  return (
    <div className="container col-lg-5 text-end">
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>הוספת קטגוריה</h1>
            <lable className="form-label">שם הקטגוריה</lable>
            <input className="form-control text-end" type="text" name="categoryName" {...register("categoryName")}/>
            <input type="submit" className="btn btn-success mt-3"/>
        </form>
    </div>
  )
}

export default AddCategory;