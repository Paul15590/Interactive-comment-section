// import iconPlus from "../assets/images/icon-plus.svg";
// import iconMinus from "../assets/images/icon-minus.svg";
// import iconReply from "../assets/images/icon-reply.svg";
import avatar1 from "../assets/images/avatars/image-juliusomo.png";


    const Comments = ({handleCommentChange,handleFormSubmit,newComment}) => {
        return(
            <>
               <section className="comments" >
               <textarea name="comment" id="" value={newComment} placeholder="Add a comment" onChange={handleCommentChange}></textarea>

                    <form action="" onSubmit={handleFormSubmit}>
                        <img src={avatar1} alt="" />
                        <textarea name="comment" id="" value={newComment} placeholder="Add a comment" onChange={handleCommentChange}></textarea>
                        <button type="submit">Send</button>
                    </form>
               </section>
            </>
        )
    }


    export default Comments;