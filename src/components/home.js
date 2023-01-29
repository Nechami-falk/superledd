import React from 'react';

const style={
    
    textAlighn:"center"
    
}

const img = {
    width:"80%",
    margin:"0 auto",
    display:"block",
    marginTop:"20px",
    marginBottom:"20px"
}





function Home() {
  return (
    <React.Fragment>
    <div className='container' style={style}> 
    <h1 className='text-center mt-5 h-header'>מערכת הזמנות</h1>
        <img style={img} src='../images/logo-1.jpg' alt="logo"/>
    </div>
    </React.Fragment>
  )
}

export default Home;