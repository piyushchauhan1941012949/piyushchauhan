import React,{useState,useEffect} from 'react';
import './App.css';
import Card from './components/Card';
import axios from 'axios';


function App() {
  const [key,setKey] = useState("")
  const [data,setData] = useState([])

  function handelClick(){
    console.log(key)
  }

  useEffect(()=>{
    if(key.length === 0) {
      axios.get("/data")
    .then( responseFromApi=>{
        console.log("SUCCESS : to get data from api")
        setData(responseFromApi.data)
    })
    .catch(err => {
        console.log("error in api Call")
        console.log(err)
    })
    }
    else {
      axios.get(`/search?key=${key}`)
    .then( responseFromApi=>{
        console.log("SUCCESS : to get data from api")
        setData(responseFromApi.data)
    })
    .catch(err => {
        console.log("error in api Call")
        console.log(err)
    })
    }
    
},[key])

  return (
    <div className="App">

    <div className="search-container">
      <input onChange={(e)=>{setKey(e.target.value)}}   type='text' placeholder='Search Key'/>
      <button onClick={handelClick} type="submit"><i class="fa fa-search">Search</i></button>
    </div>
      <div>
      {
        data.map((item,index)=>( <Card key={item._id} urlToImage={item.imageUrl}   companyName={item.companyId}  primaryText={item.primaryText}  headline={item.headline} description={item.description}/>))
      }
      </div>
    </div>
  );
}

export default App;
