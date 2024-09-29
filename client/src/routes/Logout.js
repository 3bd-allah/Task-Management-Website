import { redirect } from "react-router";

export const logoutAction = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem('name')
    localStorage.removeItem("userId")
    return redirect('/login');
}
