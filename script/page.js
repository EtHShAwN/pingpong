/* 
    specification:
        (1).When an error occured,just return 0 and don't log it in the console
*/

'use strict'
const restartButton = document.querySelector('button');
const about = document.querySelector('a#about');
const sponsor = document.querySelector('a#Sponsor');

about.addEventListener("click",()=>{
    alert(`
    designed by Ethan Shawn,
    Programed by Ethan Shawn
    `)
})

sponsor.addEventListener("click",()=>{
    alert(`
        errr.
        Thanks for my daddy's old ThinkPad X230 at first,
        my cute little brother for supporting me,
        and My web development sensei on the youtube lol,
        then the most important, you guys who support me always.
    `)
})

function isEven(a){
    return a%2===0;
}

function isInDict(a,dict){
    return dict.hasOwnProperty(a);
}

function isString(a){
    return typeof a === "string";
}

function isArray(a){
    return Array.isArray(a);
}

function isNum(a){
    return typeof a === 'number';
}