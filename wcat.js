#!/usr/bin/env node
let fs = require("fs");
let path = require("path");
let inputArr = process.argv.slice(2);
let optionsArr = [];
let filesArr = [];
for(let i = 0; i < inputArr.length; i++){
    let char = inputArr[i].charAt(0);
    if(char == '-' ){
        optionsArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);
    }
}
let bothPresent = optionsArr.includes("-n") && optionsArr.includes("-b");
if(bothPresent==true){
    console.log("enter either -b or -n. Both commands cannt work together");
    return;
} 
for(let i = 0; i<filesArr.length; i++){
    let isPresent = fs.existsSync(filesArr[i]);
    if(isPresent==false){
        console.log(`Sorry, file ${filesArr[i]} is not present.`);
        return;
    }
}
let content = "";
for(let i = 0; i<filesArr.length; i++){
    let insideFiles = fs.readFileSync(filesArr[i]);
    content = content + insideFiles + "\r\n";
}
//console.log(content);
let contentArr = content.split("\r\n");
//console.log(contentArr);
let isSPresent = optionsArr.includes("-s");
if(isSPresent == true){
    for(let i = 0; i<contentArr.length; i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i] == null;
        }
        else if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        } 
    }
    let tempArr = [];
    for(let i = 0; i<contentArr.length; i++){
    if(contentArr[i] != null){
        tempArr.push(contentArr);
    }
} 
contentArr = tempArr;
}
//console.log(contentArr.join("\n"));
let isNPresent = optionsArr.includes("-n")
if(isNPresent == true){
    for(let i = 0; i<contentArr.length; i++){
        contentArr[i] = `${i + 1} ${contentArr[i]} `;
    }
}
//console.log(contentArr.join("\n"));
let isBPresent = optionsArr.includes("-b");
let counter = 0;
if(isBPresent == true){
    for(let i = 0; i<contentArr.length; i++){
        if (contentArr[i] != "") {
            contentArr[i] = `${i + 1} ${contentArr[i]} `;
            contentArr[i] = `${counter} ${contentArr[i]}`;
            counter++;
        }
    }
}
console.log(contentArr.join("\n"));