import React from 'react'
import {Tab,Row,Col,Nav} from 'react-bootstrap'
import ProductPanel from './ProductPanel'
//import ComodityPanel from './ComodityPanel'
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser,selectUserRole } from '../../redux/user/user.selector.js';
import Profile from './Profile.jsx';
function AdminPanel({currentUser,userRole}) {
    const history = useHistory();
    console.log(userRole)
    if(currentUser===null)
        history.push("/signin");
    return (
        <div style={{height:'610px'}}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="1" >
                <Row className="ml-0 mr-2 mb-2" style={{marginTop:'30px',height:'100%'}} >
                    <Col sm={2} style={{height:'100%',padding:'0px'}} className="bg-gradient3">
                        <Nav fill variant="pills" className="flex-column "  >
                            <Nav.Item style={{borderBottom:'1px solid gray'}}>
                                <Nav.Link eventKey="1">User Profile</Nav.Link>
                            </Nav.Item >
                            <Nav.Item style={{borderBottom:'1px solid gray'}}>
                                <Nav.Link eventKey="4">My Orders</Nav.Link>
                            </Nav.Item >
                            {
                                userRole==="ROLE_ADMIN"?(
                                    <>
                                        <Nav.Item style={{borderBottom:'1px solid gray'}}>
                                            <Nav.Link eventKey="2">Products Panel</Nav.Link>
                                        </Nav.Item >
                                        <Nav.Item style={{borderBottom:'1px solid gray'}}>
                                            <Nav.Link eventKey="3">Brand Panel</Nav.Link>
                                        </Nav.Item>
                                    </>
                                ):null
                            }
                            
                        </Nav>
                    </Col>
                    <Col sm={10} style={{height:'100%',paddingLeft:'0px'}}>
                        <Tab.Content style={{borderLeft:'1px solid #f0f0f0',height:'100%'}}>
                            <Tab.Pane eventKey="1">
                                <Profile />
                            </Tab.Pane>
                            <Tab.Pane eventKey="2">
                                <ProductPanel/>
                            </Tab.Pane>
                            {/*<Tab.Pane eventKey="2">
                                <ComodityPanel />
                            </Tab.Pane>*/}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    userRole: selectUserRole
})
export default connect(mapStateToProps)(AdminPanel)
