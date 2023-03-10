import React,{useState, useEffect, useCallback} from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {CustomerService} from '../services/customerService';
import {OrderService} from '../services/orderService';
import {DesignerService} from '../services/designerService';
import {EmployeeService} from '../services/employeeService';


function AddCustomerQuote(props) {

  const [tdate, settDate]= useState();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
      defaultValues:{
        date:tdate,
      }
    });
    
    
    /* const [customer, setCustomer] = useState('name'); */
    const [bigOrderNumber,setBigOrderNumber] = useState();
    const [designers, setDesigner] = useState();
    const [employees, setEmployees] = useState();

    
    const navigate = useNavigate();

  const getDate = useCallback(
    () =>{
    let curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0,10);
    settDate(date);
    reset({
      date:tdate,
    },{
      keepErrors: true, 
      keepDirty: true,
    })
    },[reset, tdate]);

      useEffect(() => {
        getDate()
      }, [getDate]);
      
    useEffect( () => {
        getNumberOrder();
        getDesigner();
        getEmployee();
    },[])

    

    const getEmployee = async ()=>{
      let employeeData =  await EmployeeService.getEmployees();
      console.log('emp');
      console.log(employeeData.data);
      setEmployees(employeeData.data);
    }

    const getDesigner = async() =>{
      let designersData =  await DesignerService.getDesigner();
      console.log('des');
      console.log(designersData.data);
      setDesigner(designersData.data);
    }

    const getNumberOrder= async ()=>{
      try{
        let newNumberOrder = await OrderService.getBigNumberOrder();
        console.log(newNumberOrder);
        newNumberOrder = (newNumberOrder.data[0].numberOrder+1);
        console.log('newOrderNumber');
        console.log(newNumberOrder);
        setBigOrderNumber(newNumberOrder);
      }
      catch(ex){
        console.log(ex.message);
        if(ex.response){
          setBigOrderNumber(100);
        }
      }
    }

    

   const onSubmit = async (data) => {
        console.log(data.date);
        console.log(data);
        /* setCustomer(data); */
        let newCustomer = {
          name:data.name,
          phone:data.phone,
          phone2:data.phone2,
          email:data.email,
          adress:data.adress,
          date:data.date,
        }
        try{
        let customer = await CustomerService.addCustomer(newCustomer);
        console.log(customer);
        let customerId= customer.data._id;
        customerId= customerId.toString();
        let customerName = customer.data.name;
      /*   setCustomer(customerId); */
        console.log('ok');
        console.log(customerName, customerId);
        
        let curr = new Date();
        curr = formatDate(curr);
        console.log(curr);
    
        let newOrder = {
          customerId:customerId,
          customerName:customerName,
          byEmployee:data.byEmployee,
          designer:data.designer,
          title:data.title,
          status:'offerPrice',
          date:curr,
          numberOrder:bigOrderNumber ? bigOrderNumber : 100 ,
        } 
        console.log('llll');
        console.log(newOrder);
        await OrderService.addOrder(newOrder);
        navigate('/addProductQuote', {state:newOrder});
        }
        catch(ex){
          if(ex.response){
            console.log(ex.response);
          }
        }
    }

    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
    
    function formatDate(date) {
      return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('/');
    }
    

    const errorStyle = {
        color:"red"
       }
  return (
    <React.Fragment>
    <div className="container col-lg-5 mt-4 text-end">
      <h1 className = "mb-3 text-center">???????? ???????? ????????</h1>
   
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border p-2">
          <h4 className="m-1">???????? ????????????</h4>
          <label className="form-label">??????????</label>
            <input className="form-control" type="date" defaultValue={tdate} name="date"{...register("date",{required:true})}/>
            
            <label className="form-label">????????/ ?????????? ??????????</label>
            <input className="form-control text-end"  type="text" name="title"{...register("title",{required:true})}/>

          <label className="form-label">????</label>
            <input className="form-control text-end"  type="text" name="name"{...register("name",{required:true})}/>
            {errors.name && errors.name.type === "required" && (
            <p className="errorMsg" style={errorStyle}>???????? ?????????? ????</p>
          )}

            <label className="form-label">?????????? ????????</label>
            <input className="form-control text-end"  type="text" name="phone"{...register("phone",{required:true, minLength:9, maxLength:10})}/>
            {errors.phone && errors.phone.type === "required" && (
            <p className="errorMsg" style={errorStyle}>???????? ?????????? ????????</p>
          )}
          {errors.phone && (errors.phone.type === "maxLength" || errors.phone.type === "minLength") && (
            <p className="errorMsg" style={errorStyle}>???????? ?????????? ???? ????????</p>
          )}
          
            <label className="form-label">?????????? ??????</label>
            <input className="form-control text-end"  type="text" name="phone2"{...register("phone2",{minLength:9, maxLength:10})}/>
            {errors.phone2 && (errors.phone2.type === "maxLength" || errors.phone2.type === "minLength") && (
            <p className="errorMsg" style={errorStyle}>???????? ?????????? ???? ????????</p>
          )}
          {errors.phone2 && errors.phone2.type === "minLenght" && (
            <p className="errorMsg" style={errorStyle}>???????? ?????????? ???? ????????</p>
          )}

            <label className="form-label">????????</label>
            <input className="form-control text-end" type="email" name="email"{...register("email",{pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})}/>
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg" style={errorStyle}>???????? ???? ????????</p>
          )}

            <label className="form-label">??????????</label>
            <input className="form-control text-end" type="adress" name="adress" {...register("adress")}/>

          <label className="form-label">???????? ?????? ????????.?? / ??????</label>
          <select className="form-select text-end"  name="designer" {...register("designer")}>
            <option>??????</option>
            {designers && designers.map((design,id) => (
              <React.Fragment key={id}>
            <option className="option-form" key={id}>{design.designerName}</option>
            </React.Fragment>
            ))};
          </select>

        <label className="form-label">????????.?? ????????????</label>
          <select className="form-select text-end"  name="byEmployee" {...register("byEmployee")}>
            <option>??????</option>
            {employees && employees.map((employee,id) => (
              <React.Fragment key={id}>
            <option className="option-form" key={id}>{employee.employeeName}</option>
            </React.Fragment>
            ))};
          </select>

            <div className="text-center">
            <input type="submit" className="btn btn-success mt-3"/>
            
          </div>
        </div>
        </form>
        </div>
        </React.Fragment>
            
  )
}

export default AddCustomerQuote