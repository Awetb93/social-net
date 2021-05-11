import {useState} from 'react'
import { IconButton,Badge,CardActions, TextField,Button, Avatar } from "@material-ui/core"
import CommentIcon from '@material-ui/icons/Comment';
import {gql,useMutation} from "@apollo/client"
import FavoriteIcon from '@material-ui/icons/Favorite';
import{getdata} from "./home"
import DisplayComment from './DisplayComment';

const likeMutation = gql`
mutation($like:Boolean!,$postid:ID!){
  addLike(like:$like,postid:$postid){
    owner
  }
}
`
const addCommentMutation = gql`
mutation($comment:String!,$postid:ID!){
 addComment(comment:$comment,postid:$postid){
    comment,id
  }
}

`
export default function Comments({ state }) {
    const [toggle, setToggle] = useState(false)
    const [comment, setComment] = useState("")
    const[addComment]=useMutation(addCommentMutation)
     const [addLike] = useMutation(likeMutation)
     
     const addLikess = (id) => {
           addLike({ variables: { like: true, postid: id }, refetchQueries: [{ query: getdata }] })
    }
    const submit = (id) => {
        addComment({variables:{comment,postid:id},refetchQueries:[{query:getdata}]})
        setComment("")
    }
    return (
        <> 
            <CardActions>
            <IconButton onClick={()=>addLikess(state.id)} >
             {state.likes.length>0 ? (<Badge badgeContent={state.likes[0].owner.length} color="secondary"></Badge>) : null}  
             <FavoriteIcon />
            </IconButton>
        <IconButton onClick={()=>setToggle(!toggle)}>
        <Badge badgeContent={state.comments.length} color="secondary"/>
        <CommentIcon/>
                </IconButton>
            </CardActions>
           
            <div>
                {toggle && (<>
                    <hr />
                    <div className="edit-commont">
                <Avatar >{state.user.name.split(" ")[0].split("")[0]}</Avatar>
                        <TextField onChange={(e) => setComment(e.target.value)} value={comment} required style={{width:"90%"}} placeholder="write a comment ..."/>
                    </div>
                    <Button onClick={()=>submit(state.id)} style={{marginLeft:"50%"}}>Submit</Button>
            <Button onClick={() => { setToggle(!toggle); setToggle("") }}>concel</Button>
            <DisplayComment comments={state.comments }/>
          </>
            
                )}
                
            </div>
           
            </>
    )
}
