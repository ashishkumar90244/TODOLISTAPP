const express = require('express');
const fs = require('fs');

const app = express();

app.get('/',function(req,res){
    res.sendFile(__dirname+"/todoViews/index.html");
});

//app.use(express.static('public'));

app.use(express.json());

app.post('/todo',function(req,res){
    const todoContent = req.body;
    readALLTodos(todoContent,writeTodo,res);
    
//     fs.readFile('./treasure.txt',"utf-8",(err,data)=>{
//         if(err){
//             console.log(err);
//             return ;
//         }
//         if(data.length==0){
//             data = "[]";
//         }
//         try{
//             data = JSON.parse(data);
//             data.push(req.body);

//             fs.writeFile("./treasure.txt",JSON.stringify(data),(err)=>{
//                 if(err){
//                     console.log(err);
//                     return;
//                 }
//                 else{
//                     res.status(200).json("todo saved successfully");
//                 }
//             })
//         }
//         catch{
//             res.status(500).json({message:'Internal sever erro'});
//             return;
//         }
        
        
//     })
})

app.get('/about',function(req,res){
    res.sendFile(__dirname+"/todoViews/about.html");
})

app.get('/contact',function(req,res){
    res.sendFile(__dirname+"/todoViews/contact.html");
})
app.get('/todo-data',function(req,res){
    //res.sendFile(__dirname+"/todoViews/todo.html");
    fs.readFile('./treasure.txt',"utf-8",(err,data)=>{
        if(err){
            res.status(500).json(err);
            return;
        }
        res.status(200).json(data);

    })
})


app.get('/todo',function(req,res){
    res.sendFile(__dirname+"/todoViews/todo.html");
})
app.get('/public/script.js',function(req,res){
   //res.writeHead({'content-Type': 'application/javascript'})
   res.sendFile(__dirname+'/public/script.js')
    
}) 

app.post('/remove-data',function(req,res){
    fs.readFile('./treasure.txt',"utf-8",function(err,data){
        if(err){
            res.status(500).json("internal error");
            return;
        }
        if(data.length===0)
        {
            res.status(500).json("the file is empty");
            return;
        }
        const todo = req.body;
        //console.log(todo)
        data = JSON.parse(data);
        let updated_data = [];
        //let removedTodo ;
        for(let i =0;i<data.length;i++){
            if(data[i].todoContent!=todo.todoContent)
                updated_data.push(data[i]);
            
        }
        //console.log(todo.a)
        
        fs.writeFile("./treasure.txt",JSON.stringify(updated_data),(err)=>{
            if(err){
                res.status(500).json("Internal error");
                return;
            }
            res.status(200).json(JSON.stringify(updated_data));
        })
    })
})
app.post('/update-status',function(req,res){
    
    fs.readFile('./treasure.txt','utf-8',(err,data)=>{
        if(err){
            res.status(500).json("Internal server error");
            return ;
        }
        const todo = req.body;
        console.log(todo);
        data = JSON.parse(data);
        let updated_data=[];
        for(let i=0;i<data.length;i++){
            if(data[i].todoContent===todo.todoContent){
                updated_data.push({
                    todoContent:data[i].todoContent,
                    priority:data[i].priority,
                    status:"accepted"
                })
            }
            else{
                updated_data.push(data[i]);
            }
        }
        fs.writeFile('./treasure.txt',JSON.stringify(updated_data),(err)=>{
            if(err){
                res.status(500).json("Internal server error");
                return ;
            }
            res.status(200).send(JSON.stringify(updated_data));
        })

    })

})

app.listen(3000,()=>{
    console.log('listening at the port 3000');
})

function readALLTodos (todo,callback,res) {

    fs.readFile("./treasure.txt", "utf-8", function (err, data) {
    
    
    if (err) {
    
    callback(err,data,res);
    
    return;
    
    }
    if(!todo){
        res.status(200).json(JSON.stringify(data));
        return ;
    }

    
    if (data.length==0) {data = "[]"; 
    
    }
    
    try {
    
    data = JSON.parse(data); 
    data.push(todo);
    callback(null, data,res); } catch (err) { callback(err,data,res);
    }
    })
}

function writeTodo(err,data,res){
    if(err){
        res.status(500).json({message:"Internal server error"});
        return ;
    }
    fs.writeFile('./treasure.txt',JSON.stringify(data),(err)=>{
        if(err){
            res.status(500).json({message:"Internal server error"});
            return;
        }
        res.status(200).json("success");
    })

}

