import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Test = () => {


    const [test, setTest] = useState([]);
     
    
      const fetchTest = (pageNumber) =>{
        axios.get("http://localhost:8080/api/test", {params: {page:pageNumber}}).then(res =>{
          console.log(res);
          setTest(res.data);
        });
      }
    
      useEffect(()=> {
        fetchTest(3);
      }, []);
    
      return test.map((test, index) => {
        return (
          <div key={index}>
          <h1> {test.id}</h1>
          <p>{test.value}</p>
          </div>
        );
      }
      );
    }