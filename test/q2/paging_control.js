var fs = require('fs');
var und = require("underscore");

var inputFile = process.argv[2];
inputFile = inputFile.split(',')
const elip = '...';
var pages = {
    curr: parseInt(inputFile[0], 10),
    last: parseInt(inputFile[1], 10),
    roll: parseInt(inputFile[2], 10)
};
var output = '';
var max = pages.curr + pages.roll;
var min = pages.curr - pages.roll;
console.log("before");
console.log("asdas"+und.range(min,max+1));

console.log("after")
try {
    if (pages.curr > pages.last || pages.curr < 1) throw "ERR";
    for (var i = 1; i <= pages.last; i++) {
        if (i <= max && i >= min || i === pages.last || i === 1) {
            output += ` ${i}`;
        } else {
            if (output[output.length-1] !== '.'){
              console.log(output[output.length - 1]);
              output += ' ...';
            }

        }
    }
} catch (e) {
    console.log(e);
}
console.log(output)
