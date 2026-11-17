import http from 'http';
const facultys=[];
const server=http.createServer((req,res)=>{
    const{method,url}=req;
    if(method==='POST' && url==='/students'){
        let body="";
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        });
        req.on("end",()=>{
            const newFaculty=JSON.parse(body);
            students.push(newFaculty);
            res.writeHead(201,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"Faculty added successfully", data:newFaculty}));
        });
    }
    else if(method==="GET" && url==='/facultys'){
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:"Facultys retrieved successfully", data:students}));
    }
    else if(method==="GET" && url.startsWith('/facultys/')){
        const facultyId=parseInt(url.split('/')[2]);
        const faculty=facultys.find(s=>s.id===facultyId);
        if(faculty){
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"Faculty retrieved successfully", data:faculty}));
        } else {
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({error:'Faculty not found'}));
        }
    }
    else if(method==="PUT" && url.startsWith('/facultys/')){
        const facultyId=parseInt(url.split('/')[2]);
        let body="";
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        });
        req.on("end",()=>{
            let updatedFaculty;
            try {
                updatedFaculty=JSON.parse(body);
            } catch {
                res.writeHead(400,{'Content-Type':'application/json'});
                res.end(JSON.stringify({error:'Request body must contain valid JSON'}));
                return;
            }
            const facultyIndex=students.findIndex(s=>s.id===facultyId);
            if(facultyIndex!==-1){
                facultys[facultyIndex]=updatedFaculty;
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:"Faculty updated successfully", data:updatedFaculty}));
            } else {
                res.writeHead(404,{'Content-Type':'application/json'});
                res.end(JSON.stringify({error:'Faculty not found'}));
            }
        });
    }
    else if(method==="DELETE" && url.startsWith('/facultys/')){
        const facultyID=parseInt(url.split('/')[2]);
        const  facultyIndex=facultys.findIndex((s)=>s.id===facultyID);
        if(facultyIndex!==-1){
            const deletedFaculty=facultys.splice(facultyIndex,1);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"Faculty deleted successfully", data:deletedFaculty[0]}));
        }
        else{
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({error:'Faculty not found'}));
        }
    }
    else{
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"Route not found"}));
    }
});
server.listen(4000,()=>{
    console.log("Server is running on http://localhost:4000/");
});