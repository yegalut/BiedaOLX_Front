import React from 'react'
import { useHistory, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import EditPost from './EditPost'

const PostSite = ({user}) => {

    let history = useHistory();

    const {id} = useParams()

    const [message, setMessage] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [post, setPost] = useState();

    const fetchPost = () =>{
        axios.get("http://localhost:8080/api/getPost" , {
            params: {
                id: id
            }}).then(res =>{

                if(res.data.id == id){
                    if(res.data.creatorUsername === user){
                        setCanEdit(true)
                    }
                    console.log(res.data);
                    setPost(res.data);
                }


            }).catch(error =>{

            })
    }

    const changeEditMode= (e) =>{
        setEditMode(e);
    }

    const deletePost= () =>{
        if (window.confirm("Do you realy want to delete this post?")) {
            axios.delete("http://localhost:8080/api/deletePost/"+id,{withCredentials: true}).then(() => 
            history.go(-1))
            .catch(err=>{
                console.log(err);
            });

        }else{

        } 
    }

    const onSend = (e) =>{
        e.preventDefault();

        if(message!=""){
            axios.post("http://localhost:8080/api/sendMessage", {

                message: message,
                recipientUsername: post.creatorUsername
              }, {withCredentials:true})
            .then(res => {
                if(res.data.message==message){
                    setMessage("");
                }
    
            })
            .catch(error => {
    
            })
        }
        
    }


    useEffect(()=>{

        
        fetchPost();
    }, [user, editMode]);

    return (
        <div className="displayPost">
            {editMode ? 
                <EditPost post={post} changeEditMode={changeEditMode}/>
            : 
                <div>
                    {canEdit && <button onClick={() => setEditMode(true) }>Edit Post</button>}
                    {canEdit && <button onClick={() => deletePost() }>Delete Post</button>}
                    {post && <p>Created by:  {post.creatorUsername}</p>}
                    {post && <h2>Title: {post.title}</h2>}
                    {post && <p>Price: ${post.body}</p>}
                    {post && <p>Content: {post.body}</p>}
                    {post && <p>Date: {post.dateOfCreation.replace("T"," ").substring(0,19)}</p>}
                    <br /><br /><br />



                    
                    {!canEdit && user!="" &&<form onSubmit={onSend}>
                    <p>Send user a message:</p>
                    <input className="messageTextfield" type="text" value={message} onChange={(e) => setMessage(e.target.value)} ></input>
                    <input className="sendButton" type="submit" value="send"></input>
                </form>}
                            
                    
                    
                </div>
            }
            
        </div>
    )
}

export default PostSite
