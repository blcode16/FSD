import fs from 'fs';
const data='Hello,this is a sample text to demonstrate file operation in node.js';
console.log(1);
fs.writeFile("sample.txt",data,(err)=>{
    if(err)
    {
        return console.log(err.message);
    }
    console.log("Created Asynchronous file");
    fs.readFile("sample.txt","utf-8",(err,readdata)=>
    {
        if(err) throw err;
        console.log(readdata);
        const a="\n Welcome to sample-1 file";
        fs.appendFile("sample.txt",a,(err)=>
        {
            if(err) throw err;
            console.log("This file appended");
        });
    });
});