import React from 'react';
import {Card,Badge} from 'react-bootstrap'
//import {ArrowLeftRight} from 'react-bootstrap-icons'
import './Card.css'

function card(props) {
    return (
    <Card
    text= 'white'
    style={{ width: '100%',height:'100%' }}
    className="bg-gradient"
    >
      <Card.Body >
        <div className="center">
        <img style={{width: "300px",height: "300px",backgroundSize:"cover",backgroundPosition:"center",position:"fixed",marginTop:"-107px",marginLeft:"-150px"}} src={props.img}  alt={props.name} />
        <Card.Title style={{fontStyle:'oblique'}}>
          <Badge variant="success" style={{fontSize:'25px'}}>{props.name}</Badge>
        </Card.Title>
      
        
        <Badge className="" style={{background:"white",color:'red',fontSize:'25px',fontWeight:'bolder'}}>
        Minimum {props.offer}% OFF
        </Badge>
        </div>
      </Card.Body>
     {/* <Card.Footer 
      style={{
        height:'40px',
        color:'red',
        fontFamily:'monospace',
        fontWeight:'bolder'
      }}
      >
        Validity till T&C
    </Card.Footer>*/}
  </Card>
    )
}

export default card
