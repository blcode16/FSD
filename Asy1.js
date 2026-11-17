import fs from 'fs';
const data="fsdfsd";
fs.writeFile("sample2.txt","utf-8",(error)=>{
    if(error){
        return console.log(error);
    }
    console.log("Data written successfully");
    fs.readFile("sample2.txt","utf-8",(error,readData)=>{
        if(error){
            return console.log(error);
        }
        console.log(readData);
    });
});