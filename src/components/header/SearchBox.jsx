import React,{useState,useEffect,useRef} from 'react'
import './searchbox.scss';
import SearchItem from './search.component.jsx'
import axios from 'axios'

function useOutsideAlerter(ref,setSearchBar,setSearchData) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSearchBar(false)
        setSearchData('')
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
function SearchBox({setSearchBar,setSearchData,searchData}) {
    const [items,setItems]=useState([])
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef,setSearchBar,setSearchData);
    useEffect(()=>{
    axios.get('http://localhost:8080/searchproducts/' +searchData)
      .then(response => {
        const d = response.data;
        setItems(d);
        console.log("search data", d);
      })
      .catch(error => {
        console.log(error);
      });
    },[searchData])
    return (
        <div ref={wrapperRef} className='searchbox'>
            <div className='search-items'>
                {
                    items.length ? (
                    items.map(Item => (
                        <SearchItem setSearchBar={setSearchBar} setSearchData={setSearchData} key={Item.p_code} item={Item}/> 
                    ))
                    ):(
                    <span className='empty-message'>No Search Result Found</span>
                    )}
            </div>
        </div>
    )
}

export default SearchBox
