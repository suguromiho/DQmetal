let time = new Date();
let Hours = time.getHours()
const Minutes = time.getMinutes() 
const data = {
    "6:00":"メタル発生",
    "6:30":"",
    "7:00":"",
    "7:30":"",
    "8:00":"",
    "8:30":"",
    "9:00":"",
    "9:30":"",
    "10:00":"",
    "10:30":"",
    "11:00":"メタル発生",
    "11:30":"",
    "2:00":"",
    "2:30":"",
    "3:00":"メタル発生",
}
const oneHourlater = Hours+1
console.log(oneHourlater)
const oneHourlatervalue = data[`${oneHourlater}:00`]
console.log(data[`${oneHourlater}:00`])

if (oneHourlatervalue === 'メタル発生'){
console.log('ラインに送信')
}


// if(Hours == 1){
//     console.log("2");
// }else{
//     console.log("huhun");
// }

// const myPoint = 90;
// const passingScore = 80;//合格ライン

// if(myPoint >= passingScore){
//     console.log('合格');
// }else{
//     console.log('不合格');
// }