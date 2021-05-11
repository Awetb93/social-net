import {useEffect,useState} from "react"
import { InputBase, Grid,} from "@material-ui/core";
import { Link } from "react-router-dom"
import List from "./List"
import SignOut from "./Signout"
import { gql,useLazyQuery } from "@apollo/client"
export const getdata = gql`{
  posts{
    post createdAt id user{
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
const SearchQuery = gql`
query($name:String!){
 search(name:$name){
  name id 
}
}
`

export default function Home() {
  const[term,setTerm]=useState("")
  const [search, res] = useLazyQuery(SearchQuery)
    const loc = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    const timeId = setTimeout(() => {
      if (term) {
        search({ variables: { name: term } }) 
      
      } 
   },800)
     
    return () => {
     clearTimeout(timeId)
   }
   
    
  }, [term, search])
  const onsubmit = (val) => {
       setTerm(val)
     }
    return (
        <>
            {loc && <Grid container style={{ width: "100%" }} className="list">
                <Grid item xs={12} sm={4}>
                    <div>{loc.name}</div>
                </Grid>
               
                <Grid item xs={12} sm={4}>
                    <div><InputBase variant="outlined" size="small"
                        placeholder=" Search…" onChange={(e) => setTerm(e.target.value)}
                        value={term} />
                        {term &&  <List items={res.data} onclick={onsubmit} />} 
            
                    </div>
                </Grid>
                <Grid item sm={2}></Grid>
                <Grid item xs={12} sm={2}  >
            <Link to={`/profile/${loc.id}`}>Profile</Link>
            <SignOut id={ loc.id}/>
                </Grid>
            </Grid>}
            
        
            </>
    )
}
