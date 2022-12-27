import React from 'react';
import companyService from '../services/companyService';

function Signup() {

    const onGetCompany = async() => {
        console.log('hhyhy');
        try{
            
        const data = await companyService.getCompany();
        console.log(data);
    }
    catch(ex){
        console.log('gg');
    }
}



  return (
    <div>
         <button className="btn btn-warning m-3" type="button" onClick={onGetCompany}>קבלה</button>
         
    </div>
  )
}

export default Signup;