import { json, redirect } from "react-router";
import { getAuthToken, getUserId } from "../util/auth";


export const action = async({request, params}) =>{

    const formData = await request.formData();

    const todoStatus ={
        status: formData.get('status')
    }

    const todoId = params.todoId; 
    const token = getAuthToken();
    const response = await fetch(`http://localhost:5150/update/todoStatus/${todoId}`,{
        method:request.method, // put
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        body: JSON.stringify(todoStatus)
    })

    if(!response.ok){
        throw json({message:"Can't update status"},{status:404, statusText:"can't update todo status"})
    }else{
        const userId = getUserId();
        return redirect(`/user/${userId}/todos`)
    }
}