import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function NavBar() {

    const navbar_ar = [
        {name:'ניהול', key:'management'},
        {name:'טופס הצעת מחיר', key:'quote_form'},
        {name:'הצעות מחיר', key:'price_offers'},
        {name:'הזמנות שאושרו', key:'confirmed_orders'},
        {name:'הזמנות שהוזמנו', key:'orders_placed'},
        {name:'הזמנות שסופקו', key:'delivered_orders'}
    ]

  return (
    <React.Fragment>

<Navbar bg="light" expand="lg">
      <Container>
        <Nav.Link to="/" as={Link}>
          <img className="img-fluid" style={{width:"200px"}}src={'../images/logo-1.jpg'} alt={"logo"}/></Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav  className="m-3"/* className="me-auto" */>

          <NavDropdown title="ניהול" id="basic-nav-dropdown">
              <NavDropdown.Item to="/addProduct" as={Link} className="text-end">הוספת מוצר</NavDropdown.Item>
              <NavDropdown.Item to="/addDesigner" as={Link} className="text-end">הוספת מעצב</NavDropdown.Item>
              <NavDropdown.Item to="/addEmployee" as={Link} className="text-end">הוספת עובד</NavDropdown.Item>
              <NavDropdown.Item to="/addCompany" as={Link} className="text-end">הוספת חברה</NavDropdown.Item>
              <NavDropdown.Item to="/addCategory" as={Link} className="text-end">הוספת קטגוריה</NavDropdown.Item>
              <NavDropdown.Item to="/addCustomer" as={Link} className="text-end">הוספת לקוח</NavDropdown.Item>
              <NavDropdown.Item to="/addLocation" as={Link} className="text-end">הוספת מיקום</NavDropdown.Item>
              <NavDropdown.Item to="/myImageProducts" as={Link} className="text-end">תמונות של המוצרים</NavDropdown.Item>
            </NavDropdown>

          <NavDropdown title="הצעות מחיר" id="basic-nav-dropdown">
            <NavDropdown.Item to="/addCustomerQuote" as={Link} className="text-end">טופס  הצעת מחיר</NavDropdown.Item>
            <NavDropdown.Item to="/quoteForm" as={Link} className="text-end">הצעות מחיר</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="הזמנות" id="basic-nav-dropdown">
            <NavDropdown.Item to="/productToOrder" as={Link} className="text-end">מוצרים להזמנה</NavDropdown.Item>
            <NavDropdown.Item to="/productsOrdered" as={Link} className="text-end">מוצרים שהוזמנו</NavDropdown.Item>
          </NavDropdown>
          
          <Nav.Link to="/deliveredOrders" as={Link} className="text-end">מוצרים שסופקו</Nav.Link>
          <Nav.Link to="/myProducts" as={Link} className="text-end me-2">המוצרים שלנו</Nav.Link>
          <Nav.Link to="/myCustomers" as={Link} className="text-end me-2">הלקוחות שלנו</Nav.Link>
            
            
            
          {/*   <Nav.Link to="/addCustomerQuote" as={Link} className="text-end">טופס לקוח</Nav.Link> */}
          

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </React.Fragment>
  )
}

export default NavBar;