import Home from "../components/home"
import Profile from "../components/profile"
import Signup from "../components/SignUp"
import { Route, Switch } from "react-router-dom"
export default function Headers() {
    return (
        <Switch>
        <Route exact path='/' component={Signup}/>
        <Route exact path='/home/:id' component={Home}/>
        <Route exact path='/profile/:id' component={Profile}/>
                
</Switch>
    )
}
