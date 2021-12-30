import React from 'react'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'

const AddPost = ({changeMode}) => {


    const [loaded, setLoaded] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");


    
    const [categories, setCategories] = useState([])

    const addPost = () =>{

        if(!title){
            alert("title cannot be empty");
            return;
        }

        if(!body){
            alert("body cannot be empty");
            return;
        }
        if(!category){
            alert("category cannot be empty");
            return;
        }
        if(!price){
            alert("price cannot be empty");
            return;
        }
        axios.post("http://localhost:8080/api/addPostToUser",{
            body: body,
            postCategory: category,
            price: price,
            title: title,
          },{withCredentials: true})
          .then(res =>{
              if(res.data.title===title){
                  changeMode(false);
              }else{
                  setError("Something went worng!")
              }
          })
          .catch(err=>{
              console.log(err);
          })

    }

    function fetchCategories(){
        axios.get("http://localhost:8080/api/getPostCategories").then(res => {

            if(res.data!==[] || res.data!= null){
                setCategories(res.data);
                setLoaded(true);

            }

        }).catch(error =>{
            console.log(error);
        });

    }


    useEffect(()=>{
        fetchCategories();
    }, [])



    return (
        <div>   
            {error && <h1>{error}</h1>}
            <h2>Add post:</h2>
            {loaded && (<form>
                <h3>Title:</h3>
                <textarea name="" id="" cols="75"  rows="3" onChange={(e) => setTitle(e.target.value)} value={title}></textarea>
                <h3>Body:</h3>
                <textarea name="" id="" cols="75"  rows="10" onChange={(e) => setBody(e.target.value)} value={body}></textarea>
                <h3>Price</h3>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                <h3>Category:</h3>
                <select id="cars" value={category} name="cars" onChange={(e) => setCategory(e.target.value)}>
                    <option  value="">Add category...</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select><br/>
                <input type="button" className="randomButton" onClick={() => addPost()} value="Save"></input>
            </form>)}
                <input type="button" className="randomButton" value="Cancel" onClick={() => changeMode(false)}></input>
        </div> 
    )
}

export default AddPost
