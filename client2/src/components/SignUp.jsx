import {useContext} from "react"
import { TextField, Card, CardContent, CardActions, Button, Typography} from "@material-ui/core"
import { gql, useMutation } from "@apollo/client"
import {useHistory} from "react-router-dom"
import { Alert } from "@material-ui/lab"
import {local} from "../utils/localStorage"
import {context} from "../App"
import{Controller,useForm} from "react-hook-form"
import SignIn from "./SignIn"
const SignUpMutation = gql`
mutation($name:String!,$email:String!,$password:String!){
    signUp(name:$name,email:$email,password:$password){
        name,token,id
    }
}
`
export default function SignUp() {
    const methods = useForm()
    const history = useHistory()
    const loc = JSON.parse(localStorage.getItem("user"))
    console.log(loc)
    if (loc) {
        history.push(`home/${loc.id}`)
    }
    const { state, dispatch } = useContext(context)
    const [signUp, {  error }] = useMutation(SignUpMutation, {
        errorPolicy: "all", onCompleted(data) {
            local(data.signUp)
            const loc = JSON.parse(localStorage.getItem("user"))
            dispatch({type:"setlocal",payload:loc})
            history.push(`/home/${data.signUp.id}`)
         
    }})
    const { control, handleSubmit,reset } = methods
    
    const { SignUp }=state
    const onsubmit = val => {
        signUp({ variables: { ...val } })
        reset()
    }

    return (
        <>
             <div className="app">
              <div className="pic" style={{flexGrow:"1"}}>
                welcome
             </div>
                <div className="signupform">
                </div>
                  {SignUp === true ? (<Card style={{ margin: "10px" }} elevation={4}>
                <Typography color="textSecondary" style={{ textAlign: "center", marginTop: "10px" }}>SignUp form</Typography>
                {error && <Alert>{error.graphQLErrors.map(({message}, i) => (
                     <span key={i}>{message}</span> ))}</Alert>}
                <CardContent>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div style={{ margin: "10px" }}>
                            <Controller as={TextField} name="name" label="Name" variant="outlined" control={control} defaultValue="" required />
                        </div>
                        <div style={{ margin: "10px" }}>
                            <Controller as={TextField} name="email" label="Email" variant="outlined" control={control} defaultValue="" required />
                        </div>
                        <div style={{ margin: "10px" }}>
                            <Controller as={TextField} name="password" label="Password" variant="outlined" type="password" control={control} defaultValue="" required />
                        </div>
                        <CardActions>
                            <Button onClick={() => dispatch({ type: "SignUp", payload: false })}>login</Button>
                            <Button type="submit">SignUp</Button>
                        </CardActions>
                    </form>
            
                </CardContent>
            </Card>) : <SignIn />}
                </div>
          
        </>
            
   
    )
}
