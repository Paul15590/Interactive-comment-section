import avatar1 from "../assets/images/avatars/image-juliusomo.png";

 const AddReply = ({handleReplySubmit,handleReplyChange,newReply,commentId,replyingTo}) => {
   
    return (
        <section className="comments" >
                        <textarea name="comment" id="" value={newReply}
                        onChange={(e) => handleReplyChange(e, replyingTo)}
                        placeholder="Add a reply" ></textarea>
                    <form action="" onSubmit={(e) => handleReplySubmit(e, commentId)}>
                        <img src={avatar1} alt="" />
                        <textarea name="comment" id="" value={newReply}
                        onChange={(e) => handleReplyChange(e, replyingTo)}
                        placeholder="Add a reply" ></textarea>
                        <button type="submit">Reply</button>
                    </form>
               </section>
    )
 }

  export default AddReply;