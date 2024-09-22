import { redirect } from "react-router";

export const getAuthToken  =()=>{
    const token = localStorage.getItem("token")
    return token;
}

export const logoutLoader = ()=>{
    localStorage.removeItem("token");
    return redirect('/login');
}

export const isTokenExists = ()=>{

    const token = getAuthToken();
    if(!token){
        return redirect('/login');
    }else {
        return ;
    }
}