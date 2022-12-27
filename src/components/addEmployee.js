import React from 'react'
import { useForm } from 'react-hook-form';
import employeeService from '../services/employeeService';
import {toast} from 'react-toastify'; 

function AddEmployee() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm(); 

    const onSubmit = async (data) => {
        console.log(data);
        try{
            await employeeService.addEmployee(data);
            reset();
            toast.success('העובדת נוספה בהצלחה!');
          
          }
        catch(ex){
            console.log(ex.response);
        }       
    }

    const errorStyle = {
      color:"red"
     }

  return (
    <div className="container col-lg-5 text-end">
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>הוספת עובד</h1>
            <lable className="form-label">שם העובד</lable>
            <input className="form-control text-end" type="text" name="employeeName" {...register("employeeName", {required:true})}/>
            {errors.employeeName && errors.employeeName.type === "required" && (
              <p className="errorMsg" style={errorStyle}>שדה חובה</p>
            )}
            <label className="form-label">מייל</label>
            <input className="form-control" type="text" name="employeeEmail"{...register("employeeEmail",{pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, required:true})} noValidate/>
            {errors.employeeEmail && errors.employeeEmail.type === "pattern" && (
            <p className="errorMsg" style={errorStyle}>מייל לא חוקי</p>
          )}
            <lable className="form-label">סיסמא</lable>
            <input className="form-control text-end" type="text" name="employeePas" {...register("employeePas",{minLength:4, maxLength:10})}/>
            {errors.employeePas && (errors.employeePas.type === "maxLength" || errors.employeePas.type === "minLength") && (
            <p className="errorMsg" style={errorStyle}>חייב להכיל מינימום 4 מקסימום 10 תווים</p>
          )}
            
            <input type="submit" className="btn btn-success mt-3"/>
        </form>

       
    </div>

    
  )
}

export default AddEmployee;