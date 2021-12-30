
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
const SortForm = ({resetStates}) => {

    let history = useHistory();

    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const onSubmit = (e) =>{


        e.preventDefault();
        var path = "";
        path = keyword? path + `&keyword=${keyword}`: path;
        path = category? path + `&category=${category}`: path;
        path = minPrice? path + `&minPrice=${minPrice}`: path;
        path = maxPrice? path + `&maxPrice=${maxPrice}`: path;


        resetStates();

        history.push("/main/"+path.substr(1, path.length-1));


    }

    function fetchCategories(){
        axios.get("http://localhost:8080/api/getPostCategories").then(res => {

            if(res.data!==[] || res.data!= null){
                setCategories(res.data);

            }

        }).catch(error =>{
            console.log(error);
        });

    }

    const onClick= () =>{
        setKeyword("");
        setCategory("");
        setMinPrice("");
        setMaxPrice("");
        
        
    }




    useEffect(() =>{
        fetchCategories();
    }, [])



    return (
        <div>
            <div className="formtemp">
                <form onSubmit={onSubmit}>

                    <p>Search:</p>
                    <input type="text" id="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} ></input><br></br>
                    
                    <p>Category:</p>
                    <select id="cars" value={category} name="cars" onChange={(e) => setCategory(e.target.value)}>
                        <option  value="">All</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <p>Min price:</p>
                    <input type="number" id="minPrice" value={minPrice} onChange={(e) => setMinPrice(e.target.value.toString())} ></input><br></br>
                    <p>Max price:</p>
                    <input type="number" id="maxPrice" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value.toString())} ></input><br></br>

                    <input type="submit" value="Filter"></input>
                    
                </form>
                <button  onClick={()=> onClick()}>Clear </button>
        </div>
        </div>
    )
}

export default SortForm
