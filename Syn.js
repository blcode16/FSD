
import fs from 'fs';
const data="Hello, this is a sample text ";
fs.writeFile("sample3.txt","utf-8",(error)=>{
    console.log(1);
    const readData=fs.readFileSync("sample3.txt","utf-8");
    console.log(readData);
    console.log(2);
    fs.appendFileSync("sample3.txt","\n This is an appened line");
});