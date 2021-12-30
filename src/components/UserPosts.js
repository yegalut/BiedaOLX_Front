import React, {useState, useEffect} from 'react';
import Posts from './Posts'
import SortForm from './SortForm.js'
import axios from 'axios';
import { useHistory, useParams } from 'react-router'
import AddPost from './AddPost';

const UserPosts = ({user}) => {
    const {allParams} = useParams();

    var parameters = new Map();

    const [paramsSent, setParamsSent] = useState(false)
    const [page, setPage] = useState(0);
    const [refresh, setRefresh] = useState(true);
    const [moreAvailable, setMoreAvailable] = useState(true)
    const [posts, setPosts] = useState([]);
    const [addPost, setAddPost] = useState(false);

    const fetchPosts = () => {
        console.log("before get:");
        console.log("Page:" + page);
        console.log(posts)

        
        setMoreAvailable(true)


            axios.get("http://localhost:8080/api/getFilteredPosts", {
                params: {
                     category: (parameters.get("category")? parameters.get("category"): ""),
                     keyword: (parameters.get("keyword")? parameters.get("keyword"): ""),
                     maxPrice: (parameters.get("maxPrice")? parameters.get("maxPrice"): ""),
                     minPrice: (parameters.get("minPrice")? parameters.get("minPrice"): ""),
                     page: page.toString(),
                     username: user
                }
            },{ withCredentials: true})
            .then(res =>{
                if((res.data).length <10){
                    setMoreAvailable(false);
                }else{
                    setMoreAvailable(true)
                }

                if(paramsSent){
                    setPosts(res.data);
                    setParamsSent(false);
                }else{
                    setPosts(posts.concat( res.data));
                }

                
            })
            .catch(err =>{
                console.log(err);
            });
        
     
    }

    const loadMorePosts = () =>{
        setPage(page+1);
        
        setRefresh(!refresh);
    }

    
    const resetStates = () => {
        setParamsSent(true)
        setPage(0);
    }


    const checkParams = () =>{
        if(allParams){
        var lel ="";

        lel+=allParams;
        const helper1 = lel.split("&");
        helper1.forEach(param => {
            param.replace()
            const temp = param.split("=")
            parameters.set(temp[0],temp[1]);
            
        });
    }
    }

   
        // window.onscroll = function(ev) {
        //     if (!reachedBottom && (window.innerHeight < (window.scrollY + document.body.offsetHeight + 150))) {
        //         reachedBottom = true;
        //         alert("Bottom")
        //     }
        // }; 

    const changeMode = (e) =>{
        setAddPost(e);
    }
    


    useEffect(()=>{

        checkParams();

        console.log(parameters);

        fetchPosts();

    }, [allParams, refresh, user])


    return (
        <div className="mainSite">

            {!addPost?<div>
            <h2> Your Posts: </h2> 
            <div><button onClick={() => setAddPost(true)}>Add Post</button></div>
            <div className="mainForm"><SortForm resetStates={resetStates}/></div>
            <div className="mainPosts"><Posts page={page} loadMorePosts={loadMorePosts} moreAvailable={moreAvailable} posts={posts}/></div>
            </div>
            :
            <AddPost changeMode={changeMode}/>}
        </div>
    )
}
export default UserPosts
