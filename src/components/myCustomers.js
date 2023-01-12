import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { CustomerService } from '../services/customerService'

function MyCustomers() {

const navigate = useNavigate();
const [customers, setCustomers] =  useState();
useEffect(() => {
    const fetchData = async () =>{
        const data = await CustomerService.getCustomers();
        console.log(data.data);
        setCustomers(data.data);
    }
    fetchData();
}, []);

const onUpdateCustomer = (customer)=>{
  navigate('/editCustomer', {state:customer});
  console.log(customer);
}

  return (
    <>
    <div className="container">
      <div className="container">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th></th>
              <th scope="col">שם הלקוח</th>
              <th scope="col">טלפון</th>
              <th scope="col">טלפון נוסף</th>
              <th scope="col">מייל</th>
              <th scope="col">כתובת</th> 
            </tr>
          </thead>
          <tbody>
          {customers && customers.map((customer, i)=>(
            <tr>
              <td>{i+1}</td>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.phone2}</td>
              <td>{customer.email}</td>
              <td>{customer.adress}</td>
              <td>
            <button className='btn btn-success m-2' onClick={()=>{onUpdateCustomer(customer)}}>עדכון פרטי לקוח</button>
            </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default MyCustomers;