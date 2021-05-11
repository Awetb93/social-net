import {useHistory} from "react-router-dom"
import { Avatar } from "@material-ui/core"
import Moment from "moment"
export default function DisplayComment({ comments }) {
   const history=useHistory()
    const renderComment = comments.map((comment, index) => {
        return(
            <div key={index}>
                <div className="comment">
<Avatar onClick={() => { history.push(`profile/${comment.user.id}`) }} style={{ cursor: "pointer" }}>{comment.user.name.split(" ")[0].split("")[0]}</Avatar> 
          <p style={{marginLeft:"5px"}}>{Moment(parseInt(comment.createdAt)).fromNow()} </p> 
                </div>
                <div className="comment-content">
                  <p>{comment.comment}  </p>
            </div>
             
            </div>
        )
    })
    return (
        <div>
           {renderComment}      
        </div>
    )
}
