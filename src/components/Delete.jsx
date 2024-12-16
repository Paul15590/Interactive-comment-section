// import { useEffect } from "react";
 const Delete = ({dltOption,onDelete,onCancel}) => {

  

    return (

        <>
             <section className="delete">
                <div>
                    <h3> Delete Comment</h3>
                    <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone </p>
                    <button onClick={onCancel} className="first">NO, CANCEL</button>
                    <button onClick={onDelete}>NO, DELETE</button>
                </div>
            </section>
            
        </>
        
    )
 }


 export default Delete;