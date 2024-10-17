import { useEffect, useState } from 'react'
import { TodoProvider } from './context'
import './App.css'
import TodoForm from './components/todoform'
import TodoItem from './components/todoitem'



// how to start project 1) todocontext 2) index.js 3)app.js 4)todoitem


function App() {
  // todos context ko kahi na kahi store karenge and usko hm bhot saare state mai hi tho rakhengee by default empty array hai
  // YE NEECHE WALA ITNA YAAD RAKHNA EK ARRAY HAI JISME BHOT SAARI VALUES HAI 
  const [todos , setTodos ] = useState([])

  // ab joo necche method unko ek ek karke define kiyaa hai
  // ab 
  const addTodo = (todo)=>{
  //  ab yha per upper state ki value chahiyee ::::
  // purana array mil jayegaa us aap nya array bnnaa padegaa
  // we have to make todo hm obj lengee id li us ki value ko seprate kiyaa 
  
  // setTodos((prev)=>[])   // prev is puran array and []hmne use new array banaya ...classic javascript sepearate kya 
  //  WE WANT KE HR BAAR ID DENA HAI HM ESE THO LIKH NHI SAKTE THO HMNE DATE.NOW USE KIYA TO GENERATE UNIQUE ID  
  setTodos((prev)=>[{id:Date.now(), ... todo}, ...prev ])
  }

  const updateTodo = (id , todo)=> {
    // todo is array and we need to find ke konse id waalee  array  ko find karnaa chahtee hooo 
    // hr ek todo ek object hai and us object ke ander id hai .... us id ko match karna hai
    // map ek tarh ka loop hi hai 
    // hm generally ye chaahte hai ki kon saa esaa todoo hai jo id se match kr raha hai tho hm unko new todo provide kr saakee
    // PREVTODO HR EK ARRAY KI ID DEGA AND ONLY ID SIRF NEW UPDATED ARR KI ID DEGAA  
    setTodos((prev) => prev.map((prevTodo)=>(prevTodo.id===id ?todo : prevTodo)))  // ID MIL GAYE THO NEW TODO NHI THO PURANA TODO  

       // you can also do  like thiss :::
      //  prev.map((eachval)=>{
      //   if(eachval.id===id)
      //     {
      //       todo
      //     }
      //  })
  }
  // hmko delete karna hai meaning puree array mai ek value nhi hai baakii saarii value hai
  // isliye filter ka bhi use kiyaa hai
  // hmara jo filter hai vo true value per work kartaa hai meaning 
  // jo jo match nhi karegaa vo aataa jaayegaa or jo match kr jayegaa vo nhi aayegaa
  const deleteTodo =(id) =>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
  }
  // agr match ho jata hai tho hm baaki saari value ko same rakhenge and ek value ko change karenge
  // ....prevtodo    {
        //     id:1 ,
        //     todo:"Todo msg" ,
        //     complete:false 
        // } se sari value aa gayee ab ek value ko overwrite karna hai .
  // completed jo value usko ye property overwrite kr dete hai... 
  const toggleComplete=(id)=>{
     setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id ?{...prevTodo,completed : ! prevTodo.completed} :prevTodo))
  }


  // esaa method jo sari values local storage se leke aayegaa or usko iss todos mai insert kr doo
useEffect(()=>{
  // jb tak aap react per ho and server side rendering ki baat nhi kr rahe hoo 
  // tho aap localstorage ko directly access kr saktee hoooo
  // hm get phle krnaa padegaa items koo taaki hm sari values lee kee aa sakte hai .
  // aage se saraa data (value) string mai hii ayegaa tho usko hme json file mai convert karnaa hogaa
const todos = JSON.parse(  localStorage.getItem("todos"))
if(todos && todos.length>0)
  {
    setTodos(todos)
  }
},[])

// todos is then name of key and we used it setitems.
// dependecies hai ye []
// jo aapne key kaa naam upper rakhaa thaa vo neeche bhi rakhoo todos .
// string mai becoz value string mai hi denaa padtaa hai.
useEffect(()=>{
  localStorage.setItem("todos" , JSON.stringify(todos))
},[todos])

  return (
    // provider isliye functionality hm kr kaise rahe and provide kaise kr rahe hai .
     // value provide karegaa
   <TodoProvider value={{todos , addTodo , updateTodo , deleteTodo , toggleComplete}}>
       <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {/* agr {} ye laagaaye we have to return value but we ( ) by default return */}
                        {todos.map((todo)=>(
                          <div key={todo.id}
                          className='w-full'>

                            <TodoItem todo ={todo} />

                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
