
import React, {useState, useEffect} from 'react';

import axios from 'axios';
const Messeges = ({user}) => {

    const [conversationList, setConversationList] = useState([]);
    const [conversation, setConversation] = useState([]);
    const [conversationPartner, setConversationPartner] = useState("");
    const [message, setMessage] = useState("");

    const fetchConversationList = () =>{
        axios.get("http://localhost:8080/api/getConversationsList", {withCredentials: true})
        .then(res => {
            setConversationList(res.data);

        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchConversationList();
        

    }, []);

    const fetchConversation = (x) =>{
        axios.get("http://localhost:8080/api/getConversation", {
            params: {
                secondUser: x
            },
            withCredentials: true
           
        }, )
        .then(res => {
            if(conversation!=res.data){
                setConversation(res.data);
                var elem = document.getElementById('data');
                elem.scrollTop = elem.scrollHeight;
            }
            setConversationPartner(x);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const onSend = (e) =>{
        e.preventDefault();

        if(message!=""){
            axios.post("http://localhost:8080/api/sendMessage", {

                message: message,
                recipientUsername: conversationPartner
              }, {withCredentials:true})
            .then(res => {
                if(res.data.message==message){
                    setMessage("");
                    fetchConversation(conversationPartner);
                }
    
            })
            .catch(error => {
    
            })
        }
        
    }


    return (
        <div>
            <div className="conversationList">
                {conversationList.map((conv)=>(
                    <p onClick={() => fetchConversation(conv)} key={conv}>{conv}</p>
                ))}
            </div>

            {conversation.length !=0 ? (
                <div className="conversation" id="data">
                {conversation.map((message, index) => (
                    <div className={message.creatorUsername==user?"userMessage":"recivedMessage"} key={index}>
                        <div className="messageBox">
                        <h3>{message.body}</h3>
                        <p>Sent by: {message.creatorUsername}, Date: {message.dateOfCreation.replace("T"," ").substring(0,19)}</p>
                        </div>
                        
                    </div>
                ))}
            </div>

            ) :(
                <div className="conversation">
                <h1>Chose a conversation that you want ot view</h1>
                </div>

            )}
            {conversation.length !=0 && (<div className="sendBox">
                <form onSubmit={onSend}>
                    <input className="messageTextfield" type="text" value={message} onChange={(e) => setMessage(e.target.value)} ></input>
                    <input className="sendButton" type="submit" value="send"></input>
                </form>

            </div>)}
            
            
        </div>
    )
}

export default Messeges
