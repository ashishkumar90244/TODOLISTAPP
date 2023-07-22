//const { response } = require("express");

const btn = document.getElementById('submitTodo');
const userInputNode = document.getElementById('userInput');
const prioritySelctorNode = document.getElementById('prioritySelector');
const todoItemNode = document.getElementById('todo-item');
let count = 0;

btn.addEventListener("click" ,function(){
    const todoContent = userInputNode.value;
    const priority = prioritySelctorNode.value;

    if(!todoContent || !priority){
        alert('Enter the content ');
        return;
    }

    const data = {
        todoContent:todoContent,
        priority:priority,
        status:'pending'

    }

    fetch("/todo",{method:"POST",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify(data)
    })
    .then(function(res){
        if(res.status===200){
            showTodoInUI(data);
        }
        userInputNode.value='';
    })
    
    .catch(function(err){
        console.log(err);
    })
})

function showTodoInUI(todo){
    const todoTextNode = document.createElement('tr');
    const todotextNode1 = document.createElement('td');
    todotextNode1.id="col";
    const todotextNode2 = document.createElement('td');
    const anchor = document.createElement('button');
    anchor.innerText = "x";
    anchor.style.color = "black";
  // anchor.type = "checkbox";
    todotextNode1.innerText = todo.todoContent;
    //console.log(todotextNode1)
    todotextNode1.style.textAlign = "center";
    

    
    
    anchor.addEventListener('click',function(){
        fetch("/remove-data",{method:"POST",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify(todo),
        
    })
    .then(function(res){
        res.json().then(function(todos){

            //  anchor.disabled = true;
            //  todotextNode1.style.textDecoration = "line-through";
            todoTextNode.remove();
                
            }).catch(function(err){
                console.log(err);
            })
        });
    })
    todotextNode2.style.textAlign = "center";
    if(count%2==0){
        todoTextNode.style.backgroundColor='rgb(100,100,100)'
        
    }
    else{
        todoTextNode.style.backgroundColor='rgb(160,160,160)'
    }
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.width='18px';
    checkbox.style.height='18px';
    checkbox.addEventListener('click',function(){
        fetch("/update-status",{method:"POST",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify(todo),
        
    })
    .then(function(res){
        res.json().then(function(todos){

            checkbox.disabled = true;
            todotextNode1.style.textDecoration = "line-through";
            //todoTextNode.remove();
                
            }).catch(function(err){
                console.log(err);
            })
        });
    })

    count++;
    todotextNode2.appendChild(checkbox)
    todotextNode2.appendChild(anchor);
    todoTextNode.appendChild(todotextNode1);
    todoTextNode.appendChild(todotextNode2);
    todoItemNode.appendChild(todoTextNode);

}

fetch('/todo-data').then(function(res){
    res.json().then(function(todos){
        todos=JSON.parse(todos);
        //console.log(Array.isArray(todos))
        todos.forEach((todo) => {
            showTodoInUI(todo);
            
        });
    });
});