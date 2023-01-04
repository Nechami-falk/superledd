import React from 'react';
import './sass/main.css';
import { Routes, Route } from "react-router-dom";
import './App.css';
//import Header from './components/header';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
//import NewOrder from './components/newOrder';
import AddCompany from './components/addCompany';
import AddDesigner from './components/addDesigner';
import AddEmployee from './components/addEmployee';
import NavBar from './components/navBar';
import AddProduct from './components/addProduct';
import AddProductQuote from './components/addProductQuote';
import DeliveredOrders from './components/deliveredOrders';
import ProductToOrder from './components/productsToOrder';
import QuoteForm from './components/quoteForm';
import AddCategory from './components/addCategory';
import AddCustomer from './components/addCustomer';
import AddCustomerQuote from './components/addCustomerQuote';
import ShowOrder from './components/showOrder';
import ProductsOrdered from './components/productsOrdered';
import MyDocument from './components/PDFquotePrice';
import DownloadOrder from './components/downloadOrder';
import AddLocation from './components/addLocation';
import Home from './components/home';
import Page404 from './components/page404';
import EditProduct from './components/editProduct';
import MyProducts from './components/myProducts';


function App() {
  
  return (
    <React.Fragment>
    <div className="container-fluied mt-0 p-0">
      <header>
     {/* <Header/> */}
     <NavBar/>
     <ToastContainer/>
     
     
     </header>
    </div>
    <main>
    
      <Routes>
      
      <Route path = "addProduct" element={<AddProduct/>}/>
      <Route path= "addCompany" element={<AddCompany/>}/>
      <Route path = "addEmployee" element={<AddEmployee/>}/>
      <Route path = "addDesigner" element={<AddDesigner/>}/>
      <Route path = "addProductQuote" element={<AddProductQuote/>}/>
      <Route path = "addCategory" element={<AddCategory/>}/>
      <Route path = "deliveredOrders" element={<DeliveredOrders/>}/>
      <Route path = "productToOrder" element={<ProductToOrder/>}/>
      <Route path = "quoteForm" element={<QuoteForm/>}/>
      <Route path = "addCustomerQuote" element={<AddCustomerQuote/>}/>
      <Route path = "addCustomer" element={<AddCustomer/>}/>
      <Route path = "showOrder" element={<ShowOrder/>}/>
      <Route path = "productsOrdered" element={<ProductsOrdered/>}/>
      <Route path = "downloadOrder" element={<DownloadOrder/>}/>
      <Route path = "addLocation" element={<AddLocation/>}/>
      <Route path = "editProduct" element={<EditProduct/>}/>
      <Route path = "myProducts" element={<MyProducts/>}/>
      <Route exact path = "/" element={<Home/>}/>
      <Route path = "/" element={<Page404/>}/>

      </Routes>

    </main>
    
    </React.Fragment>
  );
}

export default App;
