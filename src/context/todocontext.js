import {createContext , useContext} from "react"

// createcontext ek object jiske ander value aayegii
export const TodoContext = createContext({

    // hr ek todo object jaise liye in the form of array  
    todos:[
        {   
            id:1,
            todo:"Todo msg",
            complete:false,
        }
    ],
    // ye upper sari properties hai ab hm functionality likhengee 
    // addtodo ek msg todo  pass karengaa jo function perform karegaa
    // ye context hai yha kya kya value hai or kyaa method hai 
    // ye neeche method in ki functionlaiyt hm app.jsx mai likhenge .
        addTodo :(todo)=>{},
        updateTodo : (id , todo) =>{},
        deleteTodo:(id) =>{},
        toggleComplete:(id)=>{}
    

})


// we directly export hook which is a method:
export const useTodo=()=>{
    // kis chiz ke baare mai baat kr rhee hai tho todocontext likhaa
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider


