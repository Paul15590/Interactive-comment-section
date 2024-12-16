import iconPlus from "../assets/images/icon-plus.svg";
import iconMinus from "../assets/images/icon-minus.svg";
import iconReply from "../assets/images/icon-reply.svg";
import avatar1 from "../assets/images/avatars/image-amyrobson.png";
import deleteIcon from "../assets/images/icon-delete.svg";
import editIcon from "../assets/images/icon-edit.svg";
import AddReply from "./AddReply";
import { useState } from "react";

 const Replies = ({replies,handleDltOption,id,handleAddReply,addReply,handlereplySubmit,handlereplyChange,newreply,commentId,onScoreIncrement,onScoreDecrement,handleUpdateReply,handleEditReply,isEditing}) => {
    
    const [Content, setContent] = useState({}); // Local state for editing content

    const handleChange = (replyId, value) => {
      setContent((prev) => ({ ...prev, [replyId]: value }));
    };
    return (
                
                replies.map((reply)=>{
                    const handlePlusClick = () => {
                        if (!reply.clicked) {
                          onScoreIncrement(reply.id);
                        }
                      };
                  
                      const handleMinusClick = () => {
                        if (!reply.clicked) {
                          onScoreDecrement(reply.id);
                        }
                      };

 
                

                    return (
                        <>
                <section className="reply-cover">
                    <section className="reply" key={`reply-${reply.id}`}>
                        <div className="flex">
                            <div className="first">
                                <img src={iconPlus} onClick={handlePlusClick} alt="" />
                                <p>{reply.score}</p>
                                <img src={iconMinus} onClick={handleMinusClick} alt=""  />
                            </div>

                            <div className="last">
                                <div className="flex">
                                            <div style={{width:"100%"}}>
                                                <img src={avatar1} alt="" id="avatar" />
                                                <span> <b> {reply.user.username}</b></span>
                                                {reply.isNew && <span className="you">You</span>}
                                                
                                                <span  style={{ color:"hsl(212, 24%, 26%)",fontWeight:"500"}}>{reply.createdAt}</span>
                                            </div>
                                    <div className="replyflex">
                                                {reply.isOld &&
                                                <div className="reply">
                                                    <a href="/"><img src={iconReply} alt=""  onClick={(e) => { e.preventDefault(); handleAddReply(reply.id);}}/></a>
                                                    <span id="reply">Reply</span>
                                                </div>
                                                }
                                                
                                                    {reply.isNew
                                            &&
                                        <div id="editAndDelete">
                                            <a href="/"onClick={(e) => { e.preventDefault(); handleDltOption(reply.id); }}>
                                                <img src={deleteIcon} alt="" />
                                                <span>Delete</span>
                                            </a>
                                            <a href="#." onClick={(e)=> {e.preventDefault(); handleEditReply(reply.id)}}>
                                                <img src={editIcon} alt="" />
                                                <span>Edit</span>
                                            </a>
                                        </div>
                                        }
                                    </div>
                                </div>

                                        <div className="content">

                                            {   reply.isEditing ?
                                            ( <textarea className="editArea"
                                                value={Content[reply.id] || reply.content}
                                                onChange={(e) => handleChange(reply.id, e.target.value)} 
                                                />):
                                                <p>
                                                <span style={{fontWeight:"500",color:" hsl(238, 40%, 52%)"}}>  {reply.replyingTo} </span>
                                                {reply.content}
                                                </p>
                                            }

                                        </div>
                            </div>
                        </div>
                            
                    </section>
                                {reply.isEditing &&
                                    <div className="update">
                                        <button onClick={() => {
                                            handleUpdateReply(reply.id, Content[reply.id] || reply.content);
                                            setContent((prev) => {
                                            const updated = { ...prev };
                                            delete updated[reply.id];
                                            return updated;
                                            });
                                        }}>
                                     Update</button>
                                    </div>
                                }
                </section>
                        

                    {
                        (addReply===reply.id) &&
                        <div className="addreply">
                            <AddReply 
                                handleReplySubmit={handlereplySubmit }
                                handleReplyChange={handlereplyChange}
                                newReply={newreply}
                                commentId={commentId}
                                replyingTo={reply.user.username}
                             />
                        </div>
                        
                    }
                        </>
                       
                    )
                })
            )

  };
  
  export default Replies;
  
  