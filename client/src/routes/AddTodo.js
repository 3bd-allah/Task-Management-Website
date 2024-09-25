import { json, redirect } from "react-router";
import { getAuthToken } from "../util/auth";


export const action = async ({request, params}) =>{

    console.log(params)
    const userId = params.userId;
    const enteredData = await request.formData();
    const todoData = {
        title: enteredData.get('title'),
        description: enteredData.get('description')
    }

    const token = getAuthToken();
    const response = await fetch(`http://localhost:5150/user/${userId}/addtodo`, {
        method: request.method,
        headers:{
            'Content-Type':'application/json',
            'Authorization': "Bearer " + token
        },
        body: JSON.stringify(todoData)
    })

    if(!response.ok){
        throw json()
    }else{
        return redirect (`/user/${userId}/todos`)
    }

}