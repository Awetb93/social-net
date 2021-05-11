import { useParams,} from "react-router-dom"
import { useQuery, gql, useMutation } from "@apollo/client"
import{getdata} from "./home"
import { Button, Grid } from "@material-ui/core"
import  Post from "./Post"
const GetData = gql`
    query($id:ID!){
        user(id:$id){
        followed
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
        }
    }

`
const followMutation = gql`
mutation($id:ID!){
  following(id:$id){
    id
  }
}
`
const unfollowUserMutation = gql`
mutation($id:ID!){
  unfollow(id:$id){
    id
  }
}
`
const deletePostMutation = gql`
  mutation($id:ID!){
    deletePost(id:$id){
      id
    }
  }
`
export default function Profile() {
  const { id } = useParams()
  const { data } = useQuery(GetData, { variables: { id } })
  const user = JSON.parse(localStorage.getItem("user"))
  const[following]=useMutation(followMutation)
  const [unfollow] = useMutation(unfollowUserMutation)
  const [deletePost] = useMutation(deletePostMutation)
  let isme = user.id === id
  const handleDelete = (val) => {
    deletePost({variables:{id:val},refetchQueries:[{query:GetData,variables:{id}},{query:getdata}]})
  }

  const followUser = () => {
    following({ variables: { id }, refetchQueries: [{ query: GetData,variables:{id} }] })
  }
   const unfollowUser = () => {
    unfollow({ variables: { id }, refetchQueries: [{ query: GetData,variables:{id} }] })
  }
  let showAction;
  if (data) {
    const followedUser = data.user.followed.filter(follow => follow=== user.id.toString())
    if (followedUser.length > 0) {
      showAction=<Button  variant="contained"color="secondary" onClick={unfollowUser} >unFollow</Button>
    }
    else {
       showAction=<Button variant="contained" color="primary"  onClick={followUser} >Follow</Button>
    }
  }
  return(<>
     <Grid container style={{ marginTop: "20px" }} >
            <Grid item sm={4}></Grid>
      <Grid item sm={6}>
        {
          user.id!==id ? showAction:null
        }
           </Grid>
                  <Grid item sm={2}></Grid>
            </Grid>
      
      <Grid container style={{ marginTop: "20px" }} >
            <Grid item sm={4}></Grid>
      {data && <Grid item sm={6}><Post posts={data.user} me={isme} deletePost={handleDelete }/></Grid>}
                  <Grid item sm={2}></Grid>
            </Grid>
   </> )
}
