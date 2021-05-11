export const local = (user) => {
    localStorage.removeItem("user")
    localStorage.setItem("user",JSON.stringify (user))
}
