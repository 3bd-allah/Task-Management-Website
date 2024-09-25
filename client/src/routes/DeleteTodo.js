import { json, redirect } from "react-router";
import { getAuthToken } from "../util/auth";


export const action = async({ request, params }) =>{

    const todoId = params.todoId;
    const token = getAuthToken();
    const response = await fetch(`http://localhost:5150:/todos/${todoId}`,{
        method:'DELETE',
        headers:{
            'Authorization': "Bearer "+ token
        }
    })

    if(!response.ok){
        throw json({message:"Can't delete this todo"},{status:500})
    }else{
        const userId = params.userId;
        return redirect(`/user/${userId}/todos`)
    }
}