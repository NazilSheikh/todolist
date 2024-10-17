import React, { useState } from 'react'
import { useTodo } from '../context';   // it can be possible that this todo is implementedd from both file in context

function TodoItem({ todo }) {
    


// AAP PHLE APP.JSX KARKE YAH PER AAO TO UNDERSTAND


// ky hmaraa today editable hai yaa nhi ye btaanaa PADEGA STATE SE ::
const[isTodoEditable , setIsTodoEditable] = useState(false) 
// jaise hi edit waale button per click kar do tho state ya value change hogii
const [todoMsg , setTodoMsg] = useState(todo.todo)
// sari value le li hai : 
const {updateTodo , deleteTodo , toggleComplete } = useTodo()

// functionality that edit todo : 
// when click sare todo update ho rahe hai konsa wala update hoga uske liye id tho lagegi , new toda msg to update
// ... phele hmne sperate kiya ... fir ek id ko update kr rahe hai...
// edit todo hm kr sakte hai ki nhi uske update  and     // editable nahi ha 
// genally CONTEXT MAI TODO IS OBJECT THO ...TODO MATLB         todo:"Todo msg"  AND FIR USME NEW TODOMSG SET KI HAI 
const editTodo = ()=>{
    updateTodo(todo.id,{...todo , todo:todoMsg})
    // editable nahi hai
    setIsTodoEditable(false)
}




// MAI AAPKO BTAA DOO KE ADD AND WRITE TODO WALA CHIZ HAI HMNE TODOFORM MAI CREATE KIYA HAI GUYS.................

// YE JO TOOGLE HO RAHA VO PHELE APP.JSX SE AA RAHA
const toggleCompleted = ()=>{
    toggleComplete(todo.id)
}
// Corrected the return statement: 
  // Removed the line break after 'return' so the JSX follows directly, avoiding unreachable code.
 
return (
    // when you click on check and you todo is completed so you got the green color
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            {/* // ye jo hi ke phele ka checkbox ya box hai  */}
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            {/* ye hii wala pura area mtlb x button se phle phle */}
            <input
                type="text"
                // when you will click on pencil when if you can edit the text it have black border over text otherwise transparent border .
                // when you click on checkbox and if todo is completed means save you cannot edit to text ke upper line ayegi LINE THROUGH
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    // if editable tho edittodo ko call
                    // else set kardenge ki ediitable nhi hai 
                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
