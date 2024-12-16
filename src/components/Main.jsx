import User from "./User";
import data from "../data.json";
import Replies from "./Replies";
import Comments from "./Comments";
import { useState} from "react";
import Delete from "./Delete";


  const Main = () => {

    // new comments    
  const [comments, setComments] = useState(data.comments.map((comment) => ({
    ...comment,
    isOld: true,
    isNew: false,
    clicked:false,
    isEditing:false,
    replies: comment.replies.map((reply,index) => ({
      ...reply,
      id: `${comment.id}-${index + 1}`,
      isOld: true,
      isNew: false,
      clicked:false,
      isEditing:false,
    })),
  })));

    // Handle edit for comments
const handleEditComment = (id) => {
  const updatedComments = comments.map((comment) =>
    comment.id === id ? { ...comment, isEditing: true } : comment
  );
  setComments(updatedComments);
};

// Handle update for comments
const handleUpdateComment = (id, updatedContent) => {
  const updatedComments = comments.map((comment) =>
    comment.id === id
      ? { ...comment, content: updatedContent, isEditing: false }
      : comment
  );
  setComments(updatedComments);
};

// Handle edit for replies
const handleEditReply = (id) => {
  const updatedComments = comments.map((comment) => {
    const updatedReplies = comment.replies.map((reply) =>
      reply.id === id ? { ...reply, isEditing: true } : reply
    );
    return { ...comment, replies: updatedReplies };
  });
  setComments(updatedComments);
};

// Handle update for replies
const handleUpdateReply = (id, updatedContent) => {
  const updatedComments = comments.map((comment) => {
    const updatedReplies = comment.replies.map((reply) =>
      reply.id === id
        ? { ...reply, content: updatedContent, isEditing: false }
        : reply
    );
    return { ...comment, replies: updatedReplies };
  });
  setComments(updatedComments);
};


  const [newComment, setNewComment] = useState({
    content: '',
    createdAt: 'just now',
    score: 0,
    user: data.currentUser,
    replies: [],
  });

  const handleCommentChange = (e) => {
    setNewComment({ ...newComment, content: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedComments = [
      ...comments,
      { 
        ...newComment, 
        isNew: true, 
        isOld: false,
        id: comments.length + 1, 
      },
    ];
    setComments(updatedComments);
    setNewComment({
        
      content: '',
      createdAt: 'just now',
      score: 0,
      user: data.currentUser,
      replies: [],
      isNew:false,
      isOld:false,
    });
  };
  // handle adding reply text area
  const [addReply,setAddReply] = useState(null);

        const handleAddReply = (commentId) => {
          if (addReply=== commentId) {
             setAddReply(null);
          }else{
            setAddReply(commentId);
          }
           
        }

//   new replies
const [newReply, setNewReply] = useState({
    content: ``,
    createdAt: 'just now',
    score: 1,
    user: data.currentUser,
    replyingTo:'',
  });
 
  const handleReplyChange = (e, replyingTo) => {
    const content = e.target.value;
    
    if (!content.startsWith(`@${replyingTo} `)) {
      setNewReply({
        ...newReply,
        content: `@${replyingTo} ${content}`,
      });
    } else {
      setNewReply({
        ...newReply,
        content: content,
      });
    }
  };



  const handleReplySubmit = (e, commentId) => {
    e.preventDefault();
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        // Add the reply to this comment
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id:  `${comment.id}-${Date.now()}`, 
              content: newReply.content,
              createdAt: 'just now',
              score: 0,
              replyingTo: newReply.replyingTo,
              user: data.currentUser,
              isNew:true,
              isOld:false
            },
          ],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setNewReply({
      content: '',
      createdAt: 'just now',
      score: 0,
      user: data.currentUser,
      replyingTo: '',
    });
    setAddReply(null);
  };

  const [dltOption,setDltOption] =useState(null);

  const handleDltOption = (id) => {
    console.log("Setting dltOption to:", id);
    setDltOption(id);
  }
  
 
  const handleCancelDelete = () => {
    console.log("Cancel delete triggered");
    setDltOption(null);
  };


  const handleDelete = (id) => {
    console.log("Deleting item with ID:", id);
  
    const updatedComments = comments.map((comment) => {
      const updatedReplies = comment.replies.filter((reply) => reply.id !== id);
      if (updatedReplies.length !== comment.replies.length) {
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    }).filter((comment) => comment.id !== id); 
    setComments(updatedComments); 
    setDltOption(null); 
  };
  
  // handling the plus icon and the minus icon 

   // Handling the comment score change
   const handleCommentScoreChange = (id, isIncrement) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        if (isIncrement && comment.originalScore == null) {
          // If plus is clicked and original score is not saved, save the original score and increment
          return {
            ...comment,
            score: comment.score + 1,
            originalScore: comment.score,  // Save original score before increasing
          };
        } else if (!isIncrement && comment.originalScore !==null) {
          // If minus is clicked and original score exists, reset to the original score and clear it
          return {
            ...comment,
            score: comment.originalScore,
            originalScore: null,  // Clear the original score
          };
        }
      }
      return comment;
    });
    setComments(updatedComments);
  };
  
    
    
    // reply scores
    const handleReplyScoreChange = (id, isIncrement) => {
      const updatedComments = comments.map((comment) => {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === id) {
            if (isIncrement && reply.originalScore == null) {
              // If plus is clicked and original score is not saved, save the original score and increment
              return {
                ...reply,
                score: reply.score + 1,
                originalScore: reply.score,  // Save original score before increasing
              };
            } else if (!isIncrement && reply.originalScore != null) {
              // If minus is clicked and original score exists, reset to the original score and clear it
              return {
                ...reply,
                score: reply.originalScore,
                originalScore: null,  // Clear the original score
              };
            }
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      });
      setComments(updatedComments);
    };
  

        return (
            <main>
                <div>
                    {
                        comments.map((comment) => {
                           return <User  content ={comment.content} 
                           key={`comment-${comment.id}`}
                           id={comment.id}
                           createdAt={comment.createdAt} 
                           score={comment.score}
                           userName={comment.user.username}
                           image={comment.user.image.png}
                           onScoreIncrement={(id) => handleCommentScoreChange(id, true)}
                           onScoreDecrement={(id) => handleCommentScoreChange(id, false)}
                                // replis
                           handleReplySubmit={handleReplySubmit}
                           handleReplyChange={handleReplyChange}
                           newReply={newReply.content}
                           addReply={addReply}
                           handleAddReply={handleAddReply}
                           isNew={comment.isNew}
                           isOld={comment.isOld}
                           // delete option
                           handleDltOption={handleDltOption}
                          //  editting and updating comments
                          handleEditComment={handleEditComment}
                          handleUpdateComment={handleUpdateComment}
                          isEditing={comment.isEditing}
                           /> 
                        })
                    }

                
                      {comments.map((comment) => (
                              <Replies
                                key={`replies-${comment.id}`}
                                replies={comment.replies}
                                handleDltOption={handleDltOption}
                                commentId={comment.id}
                                //replies
                                handleReplySubmit={handleReplySubmit}
                                handleReplyChange={handleReplyChange}
                                newReply={newReply.content}
                                // show reply text area
                                addReply={addReply}
                                handleAddReply={handleAddReply}
                                handlereplySubmit={handleReplySubmit}
                                handlereplyChange={handleReplyChange}
                                newreply={newReply.content}
                                onScoreIncrement={(id) => handleReplyScoreChange(id, true)}
                                onScoreDecrement={(id) => handleReplyScoreChange(id,false)}
                                      //  editting and updating comments
                                handleEditReply={handleEditReply}
                                handleUpdateReply={handleUpdateReply}
                                isEditing={comment.isEditing}
                              />
                            ))}


                   <Comments
                    handleFormSubmit={handleFormSubmit}content
                    handleCommentChange={handleCommentChange}
                    newComment={newComment.content}
                   />
                 </div>
                  
                  {
                    dltOption &&
                     <Delete 
                    dltOption={dltOption}
                    onCancel={handleCancelDelete}
                    onDelete={() => handleDelete(dltOption)}
                  />
                  }
                 

            </main>
        )
    }


    export default Main;