import React, {useState} from 'react';
import { ProductOrderService } from '../services/productOrderService';



function SelectStatus(props) {

    const statuses = [{value:'ordered', name:'הוזמן'}, 
                    {value:'toOrder', name:'להזמנה'},
                    {value:'inStock',name:'במלאי'},
                    {value:'provided',name:'סופק ללקוח'},
                    {value:'offerPrice', name:'הצעת מחיר'}];

                    /* const [isShown, setIsShown] = useState(false);
 */

                    const onChangeStatus=async(event,id)=>{
                        const productId = id;
                        const status = event.target.value;
                     /*    setIsShown(current => !current); */
                        try{
                          await ProductOrderService.updateStatusToProduct(productId, status)
                          /* getOrderDetails(); */
                        }
                        catch(ex){
                          console.log(ex);
                        }
                      
                      }  
                    

  return (
    <div>
       
        <select className="form-select text-end"  name="company" onChange={(e)=>{onChangeStatus(e, props.productId)}}>
      <option>בחר סטטוס</option>
      {statuses && statuses.map((stat,i) => (
      <option className="option-form" value={stat.value} key={i}>{stat.name}</option>
      ))};
      </select>
    </div>
  )
}

export default SelectStatus;