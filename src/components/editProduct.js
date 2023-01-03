import React, { useEffect, useLocation } from 'react';

function EditProduct() {

  useEffect(() => {
    getProductDetails()
  }, [])
  const location = useLocation();

  const getProductDetails = () =>{
    console.log('444');
    console.log(location.state);
  }

  return (
    <div>hy</div>
   /*  <React.Fragment>
    <div className="container col-lg-5 mt-4 text-end">
      <h1>עדכון</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border p-2">
      <lable className="form-label">שם המוצר</lable>
            <br></br>

     <input
      className="form-control text-end"
        type="input"
        list="optionsList"
        onChange={handleChange} 
        onClick={onSelect}
        {...register('name')}
        onBlur={onSelect}
        name='name'
      />
      <datalist id="optionsList">
        {products.map((o) => (
          <option key={o.id} >{o.name}</option>
        ))} 
        </datalist>

          <label className="form-label">חברה</label>
            <select className="form-select" name="company"{...register('company')}>
              {currentProd && <option className="option-form text-end"  key={currentProd.id}  selected defaultValue={currentProd.company}>{currentProd.company}</option>}
              <option>בחר</option>
              {companies && companies.map((comp) => (
            <option className="option-form text-end" key={comp.id}  defaultValue={ currentProd && currentProd.company}>{comp.companyName}</option>
              ))};
            </select>
          
            <label className="form-label">קטגוריה</label>
            <select className="form-select"  name="category" {...register('category')}>
              {currentProd && <option className="option-form text-end"  key={currentProd.id} selected defaultValue={currentProd.category}>{currentProd.category}</option>}
              <option>בחר</option>
              {categories && categories.map((category) => (
            <option className="option-form text-end" key={category.id} defaultValue={ currentProd && currentProd.category}>{category.categoryName}</option>
  
              ))};
            </select>

            <label className="form-label">מיקום</label>
        <select className="form-select text-end"  name="location" {...register("location")}>
          {currentProd && <option className="option-form text-end"  key={currentProd.id} selected defaultValue={currentProd.location}>{currentProd.location}</option>}
          <option>בחר</option>
          {locations && locations.map((location) => (
          <option className="option-form text-end" key={location.id} defaultValue={ currentProd && currentProd.location}>{location.locationName}</option>
            ))};
        </select>

          <label className="form-label">דגם</label>
            <input className="form-control text-end"  type="text" defaultValue ={currentProd && currentProd.model} {...register('model')} />
            
          <label className="form-label">גוון אור</label>
        <select className="form-select text-end"  name="shadeLight" {...register("shadeLight")}>
          <option>בחר גוון</option>
             {shadesLight && shadesLight.map((shade, i) => (
          <option className="option-form text-end" key={i} value={shade}>{shade}</option>
            ))};
        </select>

          <label className="form-label">מק"ט</label>
            <input className="form-control text-end" type="text" value={catalogNumber} {...register('catalogNumber')} />
          
          <label className="form-label">צבע</label>
            <input className="form-control text-end"  type="text" defaultValue={ currentProd && currentProd.color} {...register('color')}/>
          
            <label className="form-label">מחיר סוכן</label>
            <input className="form-control text-end" onKeyUp={(e)=>caculatePrice(e)} type="text" defaultValue={ currentProd && currentProd.agentPrice} {...register('agentPrice')}/>        

          <label className="form-label">מחיר</label>
            <input className="form-control text-end"  type="text" defaultValue={ currentProd ? currentProd.price : price} {...register('price')}/>        
          
          <label className="form-label">תמונה</label>
            <input className="form-control text-end" onInput={onChange} type="file" defaultValue={ currentProd && currentProd.image} onChange={handleFileChange}  {...register('image')}/> 
          
          <label className="form-label">כמות</label>
          <input className="form-control text-end"  type="number" defaultValue={quantity} {...register('quantity')}/> 

          <label className="form-label">הערות</label>
            <input className="form-control text-end"  type="text" defaultValue={ currentProd? currentProd.remarks : ''} {...register('remarks')}/> 
          
        <h3 style={{color:"red"}}>{error && error}</h3>

        <div className="container col-lg-12 d-flex justify-content-around">
        <button type="submit" className="btn btn-warning mt-3">הוסף מוצר</button>
        <button className="btn btn-info mt-3" type="button" onClick={onCompletionOrder}>סיום הזמנה</button>
        
        
        </div>
        </div>
      </form>
      </div>
   
    </React.Fragment> */
  )
}

export default EditProduct