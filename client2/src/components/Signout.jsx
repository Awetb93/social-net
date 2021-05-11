import {useContext} from "react"
import { Button } from "@material-ui/core"
import { gql, useMutation } from "@apollo/client"
import { useHistory, } from "react-router-dom"
import {context} from "../App"

    const mutation =gql `
mutation($id:ID!){
    signOut(id:$id){
        id
    }
}

`
export default function SignOut(id) {
    const history = useHistory()
    const userId = id.id
    const {dispatch}=useContext(context)
    const [sigOut] = useMutation(mutation, {
        onCompleted(data){
            if (data) {
                deleteLocal()
        }
            
        }
    })
     const deleteLocal = () => {
        localStorage.removeItem("user")
         const loc = localStorage.getItem("user")
         if (!loc) {
             history.push("/")
            dispatch({type:"setlocal",payload:""})
            
        }
    }
    const signout = () => {
       sigOut({variables:{id:userId}})
    }
    return (
        <Button onClick={signout}>Signout</Button>
    )
}
