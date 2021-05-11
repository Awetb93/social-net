import { Grid, TextField, Button, IconButton, } from "@material-ui/core";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { Controller, useForm } from "react-hook-form"
import { gql, useQuery, useMutation } from "@apollo/client"

import Post from "./Post";
export const getdata = gql`{
  posts{
    post  picUrl,picName createdAt id user{
      name,id 
    }
    comments{
        comment createdAt user{
          name id
        }
      }
       likes{
      owner
    }
  }
}`

const AddPostMutation = gql`
mutation($post:String,$file:Upload){
    addPost(post:$post,file:$file){
    post
  }
}
`
export default function Home() {
  const methods = useForm()
  const { data} = useQuery(getdata)
  const[addPost]=useMutation(AddPostMutation,{onCompleted(data){reset()}})
  const {control,handleSubmit,reset,register}=methods
  const user = JSON.parse(localStorage.getItem("user"))
  const onsubmit = val => {
      const file=val.pic[0]
      addPost({ variables: {post:val.post,file },refetchQueries:[{query:getdata}] })
  
  }

    return (
        <>
       <Grid  container style={{marginTop:"20px"}} >
              <Grid item sm={4}></Grid>
                <Grid item sm={6}>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="profile-circle">
                           {user.name[0]} 
                        </div>
              <Controller as={TextField} label={`what is in your mind ${user.name}?`} variant="outlined" control={control} name="post" defaultValue="" style={{ width: "100%" }} />
             <input accept="image/*"  id="icon-button-file" name="pic" type="file" ref={register} hidden/>
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <AddAPhotoIcon />
        </IconButton>
      </label>     
         <Button style={{marginLeft:"60%"}} className="btn" type="submit">Post</Button>
                      
                    </form>
              </Grid>
              <Grid item sm={2}></Grid>
            </Grid>
            
        <Grid  container style={{marginTop:"20px"}} >
                <Grid item sm={4}></Grid>
          <Grid item container xs={12} sm={6}>
            <Post posts={data}/></Grid>
                  <Grid item sm={2}></Grid>
            </Grid>
            </>
    )
}
