import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectDirectorySections } from '../../redux/directory/directory.selector'
import MenuItem from '../menu-item/menu-item.component';
import HorizontalSider from './HorizontalSlider'
import './directory.styles.scss';
import axios from 'axios'
import { selectCurrentUser } from '../../redux/user/user.selector.js';
import {selectCurrentJwt} from '../../redux/jwt/jwtSelector'
import CollectionItem from '../CardComponent/collectioncard';
function Directory({ sections,currentUser,currentJwt }){
  const [predicted,setPredicted]=useState([])

  function  handlePredicted(predicted){
    console.log(predicted)
    return (
      <>
      <br/>
      <h1 className='title'>Recomended For You</h1>
      <HorizontalSider>
      {
        predicted.map(item=><CollectionItem key={item.p_code} item={item} />)
      }
    </HorizontalSider>
    </>
    )
  }
  function addData(d){
    setPredicted([...predicted,...d])
  }
  useEffect(()=>{
    let gender
    axios.get('http://localhost:8080/customer/'+currentUser,{
      headers: {
          'Authorization':"Bearer "+currentJwt
      }
      })
      .then(response =>{
          gender = response.data.gender
          axios.get("http://localhost:8080/history/"+currentUser,{
            headers: {
                'Authorization':"Bearer "+currentJwt
            }
              })
              .then(response=>{
                  console.log("abc",response.data)
                  const keys=response.data.map(product=> product.c_id);
                  let items=[]
                  const params={
                    "gen":gender,
                    "como":keys
                  }
                    axios.post("http://localhost:8080/searchproductsbyfilter",params)
                      .then(response=>{
                        const d=response.data
                        setPredicted([...d])
                      })
                      .catch(error=>{
                        console.log(error)
                      })
                  addData(items)
              })
              .catch(error=>{
                  console.log(error)
              })
      })
      .catch(error=>{
          console.log(error)
      })
  },[])
      

      
      
  return (
  <>
  {
    currentUser && predicted.length>0?handlePredicted(predicted):null
  }
  <div className="directory-menu">
    {
    sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps}/>
    ))
    }
    
  </div>
  
  </>
)};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
  currentUser:selectCurrentUser,
  currentJwt:selectCurrentJwt
})

export default connect(mapStateToProps)(Directory);

