import axios from 'axios'
import React, { useEffect, useState } from 'react'




function Card({urlToImage,companyName,primaryText, headline,description}) {
  const [cn,setCn] = useState("") 
  useEffect(()=>{
    axios.get(`/companyname?id=${companyName}`)
    .then( responseFromApi=>{
        console.log("SUCCESS : to get data from api")
        try{
          setCn(responseFromApi.data[0].name)
        }catch(error) {
          console.log(error+" error in comp name")
          setCn("")
        }
        
    })
    .catch(err => {
        console.log("error in api Call")
        console.log(err)
    })
  },[cn])

  return (
    <div className='card'>
    <img src={urlToImage}/>
  <div class="card-body">
    <p>{cn}</p>
    <h3>{primaryText}</h3>
    <p>{headline}</p>
    <p>{description}</p>
    
  </div>

    </div>
  )
}

export default Card