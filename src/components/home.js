import React from 'react';

const style={
    backgroundColor:"yellow",
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
    <h1 className='text-center'>מערכת הזמנות סופרלד שלום!!!</h1>
        <img style={img} src='../images/logo-1.jpg' alt="logo"/>
    </div>
    </React.Fragment>
  )
}

export default Home;