import React from 'react'
import {Nav,Tab,} from 'react-bootstrap'
import AddProduct from './AddProduct.js'
import ProductTable from './ProductTable.js'
function ProductPanel() {
    return (
        <Tab.Container defaultActiveKey="2">
            <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link eventKey="2">Products Table</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="1">Add Products</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab.Content style={{borderLeft:'1px solid #f0f0f0',height:'100%'}}>
                <Tab.Pane eventKey="1">
                <AddProduct  />
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                <ProductTable />
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    )
}

export default ProductPanel
