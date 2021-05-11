import {useContext} from "react"
import { TextField, Card, CardContent, CardActions, Button, Typography } from "@material-ui/core"
import {useHistory} from "react-router-dom"
import {local} from "../utils/localStorage"
import {gql,useMutation} from "@apollo/client"
 import {Alert} from "@material-ui/lab"
import {context} from "../App"
import { Controller, useForm } from "react-hook-form"
const SignInMutation = gql`
mutation($email:String!,$password:String!){
    signIn(email:$email,password:$password){
        name,token,id
    }
}
`
export default function SignIn() {
    const methods = useForm()
    const history = useHistory()
    const { control, handleSubmit,reset } = methods
    const { dispatch } = useContext(context)
    const [signIn, { error }] = useMutation(SignInMutation, {
        errorPolicy: "all", onCompleted(data) {
            local(data.signIn)
            const loc = JSON.parse(localStorage.getItem("user"))
            dispatch({type:"setlocal",payload:loc})
            history.push(`/home/${data.signIn.id}`)
              
        }
    })
 
    const onsubmit = val => {
        signIn({ variables: {...val } })
        reset()
    }
   
    return (
        <Card style={{margin:"10px"}} elevation={4} >
            <Typography color="textSecondary" style={{ textAlign: "center", marginTop: "10px" }}>SignIn</Typography>
             {error && <Alert>{error.graphQLErrors.map(({message}, i) => (
            <span key={i}>{message}</span> ))}</Alert>}
            <CardContent>
            <form  onSubmit={handleSubmit(onsubmit)}>
            <div style={{margin:"10px"}}>
             <Controller as={TextField }name="email" label="Email" variant="outlined" control={control} defaultValue="" required />     
                   </div>
                    <div style={{margin:"10px"}}>
                        <Controller as={TextField} name="password" label="Password" variant="outlined" type="password" control={control}  defaultValue=""required />
                          </div>
                     <CardActions>
                <Button type="submit" >login</Button>
                        <Button onClick={()=>dispatch({type:"SignUp",payload:true})}>SignUp</Button>
                        </CardActions>
                    </form>
            
                </CardContent>
        </Card>
    )
}
