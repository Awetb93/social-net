import { ApolloClient, ApolloProvider, ApolloLink, InMemoryCache } from "@apollo/client"
import {createUploadLink} from "apollo-upload-client"
import { setContext } from "@apollo/client/link/context";
import { useReducer, createContext } from "react"
import { BrowserRouter} from "react-router-dom"
import Header from "./utils/headers"
import Top from "./components/header"
import { CssBaseline, Container ,StylesProvider} from "@material-ui/core"
import "./styles/app.scss"
const uploadlink = createUploadLink({ uri:"/graphql" })
const authLink = setContext((_, { headers }) => {
  const token =JSON.parse(localStorage.getItem("user"))
 
  return { headers: { ...headers, authorization: token ? `Bearer ${token.token}` : "", } }
})
const client = new ApolloClient({ link:ApolloLink.from([authLink,uploadlink]), cache: new InMemoryCache() })
const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SignUp":
      return { ...state, SignUp: action.payload }
    case "SignIn":
      return { ...state, isSignIn: true, user: action.payload }
    case "setlocal":
      return{...state,loc:action.payload}
    default:
      return state
  }
}
export const context=createContext({})
function App() {
  const [state, dispatch] = useReducer(reducer, { SignUp: true, isSignIn: false, user: {}, loc: {} })
  return (
    <ApolloProvider client={client}>
      <context.Provider value={{ state, dispatch }}> 
          <StylesProvider injectFirst>
          <CssBaseline>
            <Container >       
              <BrowserRouter >
                  <Top />
                 <Header/>
              </BrowserRouter>
          </Container>
          </CssBaseline>
          </StylesProvider>
       </context.Provider> 
      </ApolloProvider>
  )
}

export default App;

