import { redirect } from "react-router";

export const getAuthToken  =()=>{
    const token = localStorage.getItem("token")
    return token;
}

export const getUserName = ()=>{
    const userName = localStorage.getItem('name')
    return userName;
}

export const authUserLoader = ()=>{
    const userId = getUserId();
    const token = getAuthToken();
    const userName = getUserName();
    return {token, userName, userId}
}

export const tokenLoader = ()=>{
    return getAuthToken();
}

export const getUserId =()=>{
    const userId = localStorage.getItem("userId");
    return userId; 
}


// route protection
export const checkAuthLoader = ()=>{

    const token = getAuthToken();
    if(!token){
        return redirect('/login');
    }else{
        return null ; 
    }
}
