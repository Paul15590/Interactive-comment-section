import iconPlus from "../assets/images/icon-plus.svg";
import iconMinus from "../assets/images/icon-minus.svg";
import iconReply from "../assets/images/icon-reply.svg";
import avatar1 from "../assets/images/avatars/image-amyrobson.png";
import AddReply from "./AddReply";
import deleteIcon from "../assets/images/icon-delete.svg";
import editIcon from "../assets/images/icon-edit.svg";
import { useState } from "react";

    const User = ({content,score,createdAt,image,userName,id,handleReplySubmit,handleReplyChange,newReply,handleAddReply,addReply,isOld,isNew,handleDltOption,onScoreIncrement,onScoreDecrement,handleEditComment,handleUpdateComment,isEditing}) => {
        const handlePlusClick = (e) => {
            onScoreIncrement(id); 
          };
        
          const handleMinusClick = (e) => {
            onScoreDecrement(id); 
          };
          const [localContent, setLocalContent] = useState(content);

          const handleUpdateClick = () => {
            handleUpdateComment(id, localContent); // Update global state on action
          };
        return (
            <>
            <section className="cover">

                    <section className="flex user" key={id}>
                        
                                <div>
                                    <img src={iconPlus} onClick={handlePlusClick} alt="" />
                                    <p>{score}</p>
                                    <img src={iconMinus} alt="" onClick={handleMinusClick}/>
                                </div>
                        


                        <div>
                            <div className="flex"> 
                                <div className="username" style={{display:"flex",justifyContent:"flex-start",width:"80%"}}>
                                    <a href="#."><img src={avatar1} alt="png" id="avatar"/></a>
                                    <span> <b> {userName}</b></span>
                                    {isNew && <span className="you">You</span>}
                                    
                                    <span  style={{ color:"hsl(212, 24%, 26%)",marginLeft:"10px"}}>{createdAt}</span>
                                </div>
                                <div style={{width:"20%"}}>
                                    {
                                    isOld 
                                    &&
                                    <div className="reply" style={{display:"flex",justifyContent:"flex-end",width:"100%"}}>
                                        <a href="http:#"><img src={iconReply} alt="icon-reply" id="reply" onClick={() => handleAddReply(id)} /></a>
                                        <p id="reply">Reply</p>
                                    </div>
                                    }

                                    {isNew
                                        &&
                                    <div id="editAndDelete">
                                        <a href="." onClick={(e) => { e.preventDefault(); handleDltOption(id); }}>
                                            <img src={deleteIcon}  alt="" />
                                            <span>Delete</span>
                                        </a>
                                        <a href="." onClick={(e) => {e.preventDefault();handleEditComment(id)}}>
                                            <img src={editIcon} alt="" />
                                            <span>Edit</span>
                                        </a>
                                    </div>
                                }
                                
                                </div>
                            </div>
                            <div style={{ color:"hsl(212, 24%, 26%)",fontWeight:"500",padding:"10px"}}>
                                {isEditing ? (
                                            <textarea className="editArea"
                                            value={localContent}
                                            onChange={(e) => setLocalContent(e.target.value)}
                                            />
                                        ): <p>{content} </p>
                                    }
                                  
                            </div>
                            
                        </div>
                        
                    </section>
                    
                    {isEditing && 
                    <div className="update">
                        <button onClick={handleUpdateClick}>Update</button>
                    </div>
                    }

                    
                    
            </section>


                {
                (addReply === id)
                 && 
                 <AddReply 
                   handleReplySubmit={handleReplySubmit }
                   handleReplyChange={handleReplyChange}
                   newReply={newReply}
                   commentId={id}
                   replyingTo={userName}
                />
                }

            </>
        )
    }


    export default User;