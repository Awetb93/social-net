import { CardHeader, Card, CardContent, Avatar ,IconButton, Grid} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import {useHistory} from "react-router-dom"
import Comment from  "./Comments"
import Moment from "moment"
export default function Post({ posts ,me,deletePost}) {
    const history = useHistory()
    let renderPost;
    if (posts) {
        
        renderPost = posts.posts.map(post => {
            return (
               <div key={post.id}>
                    { me === true ? (<Grid container key={post.id} className="admin-list">
                        <Grid item md={11} sm={11}  style={{width:"80%"}}>
<Card style={{ marginTop: "10px"}} variant="outlined">
                    <div className="comment">
                    <Avatar onClick={() =>history.push(`/profile/${post.user.id}`) } style={{cursor:"pointer"}}>{post.user.name.split(" ")[0].split("")[0]}</Avatar>
                    <CardHeader subheader={Moment(parseInt(post.createdAt)).fromNow()} />
                   </div>
                    <CardContent>
                        <div>
                         {post.post}   
                        </div>
                        {post.picUrl && (<div>
                            <img src={post.picUrl} style={{width:"60%",height:"50%"}} alt={post.picName} />
                        </div>)}
                    
                    </CardContent>
                     
                    <Comment state={ post} />
                        </Card>
                        </Grid>
                        <Grid item sm={1} md={1}>
                         <IconButton onClick={()=>deletePost(post.id)}>
                          <HighlightOffIcon color="secondary"/>  
                 </IconButton>   
                    </Grid>
               
                    </Grid>) : (
                          
                            
                            
                        <Card style={{ marginTop: "10px" }} variant="outlined">
                    <div className="comment">
                    <Avatar onClick={() =>history.push(`/profile/${post.user.id}`) } style={{cursor:"pointer"}}>{post.user.name.split(" ")[0].split("")[0]}</Avatar>
                    <CardHeader subheader={Moment(parseInt(post.createdAt)).fromNow()} />
                   </div>
                    <CardContent>
                        <div>
                         {post.post}   
                        </div>
                        {post.picUrl && (<div>
                            <img src={post.picUrl} style={{width:"60%",height:"50%"}} alt={post.picName} />
                        </div>)}
                    
                    </CardContent>
                     
                    <Comment state={ post} />
                    </Card>)}
                </div>
            
            )
        })
        
    }
    return (
        <div>
          {renderPost}
        </div>
    )
}
