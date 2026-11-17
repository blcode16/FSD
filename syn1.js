import fs from 'fs';
const data="hello this is my operations file on file operation";
fs.writeFileSync("Sample.txt",data,"utf-8");
console.log("writed sucessfulyy");

const read_data=fs.readFileSync("Sample.txt","utf-8");
console.log(read_data);
console.log("readed succesfully");

fs.appendFileSync("Sample.txt","\nThis is a append line",'utf-8');
const updateData=fs.readFileSync("Sample.txt",'utf-8');
console.log(updateData);
console.log("appended sucesfully");

fs.unlinkSync("Sample.txt");
console.log("Deleted successfully");




