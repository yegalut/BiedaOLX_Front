import React from 'react'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'



const EditPost = ({post, changeEditMode}) => {


    const [loaded, setLoaded] = useState(false);
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [category, setCategory] = useState();
    const [price, setPrice] = useState();
    const [error, setError] = useState("");


    
    const [categories, setCategories] = useState([])

    const editPost = () =>{
        console.log(title);
        console.log(body);
        console.log(category);
        console.log(price);
        console.log(post.id);

        axios.put("http://localhost:8080/api/editPost", {
            body: body,
            id: post.id,
            postCategory: category,
            price: price,
            title: title
          }, { withCredentials: true}).then(res => {
              if(res.data.id == post.id){
                  changeEditMode(false);
              }else{
                  setError("Something went wrong!");

              }
          }).catch(err=> {
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
        setTitle(post.title);
        setBody(post.body);
        setPrice(post.price);
        setCategory(post.postCategory);

    }, [post])



    return (
        <div>   
            {error && <h1>{error}</h1>}
            <h2>Etit post:</h2>
            {loaded && (<form>
                <h3>Title:</h3>
                <textarea name="" id="" cols="75"  rows="3" onChange={(e) => setTitle(e.target.value)} value={title}></textarea>
                <h3>Body:</h3>
                <textarea name="" id="" cols="75"  rows="10" onChange={(e) => setBody(e.target.value)} value={body}></textarea>
                <h3>Price</h3>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                <h3>Category:</h3>
                <select id="cars" value={category} name="cars" onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select><br/>
                <input type="button" className="randomButton" onClick={() => editPost()} value="Save"></input>
            </form>)}
                <input type="button" className="randomButton" value="Cancel" onClick={() => changeEditMode()}></input>
        </div> 
    )
}

export default EditPost
