/*jshint esversion: 6 */
var fs = require('fs');
var inputFile = process.argv[2];
var buff = fs.readFileSync(inputFile, 'utf8');
var stringArr = buff.split('\n');
var outputArr = [];
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var _alphabet = alphabet;
alphabet = alphabet.toUpperCase();
alphabet = alphabet.split('');
_alphabet = _alphabet.split('');

let charArr = [];
var startingNum = 0;
alphabet.map(char => {
    let charObj = {};
    if (alphabet.indexOf(char) % 3 === 0) {
        startingNum++;
    }

    charObj.idx = startingNum + 1;
    if (char === 'S' || char === 'Z' || char === 'Y' || char === 'V') {
        charObj.idx = startingNum;
    }
    charObj.letter = char;
    charArr.push(charObj);
});

startingNum = 0;
_alphabet.map(char => {
    let charObj = {};
    if (_alphabet.indexOf(char) % 3 === 0) {
        startingNum++;
    }
    charObj.idx = startingNum + 1;
    if (char === 's' || char === 'z' || char === 'y' || char === 'v') {
        charObj.idx = startingNum;
    }
    charObj.letter = char;
    charArr.push(charObj);
});
console.log(charArr);

for (var str of stringArr) {
    if (str === '') {
        console.log('');
    } else {
        outputArr.push(parseNum(str));
    }
}

function alphabetParse(char) {
    for (var i = 0; i < charArr.length; i++) {
        if (char === charArr[i].letter) {
            return charArr[i].idx;
        }
    }
}

function parseNum(num) {
    var output = '';
    for (var i = 0; i < num.length; i++) {
        if (num[i].search(/[0-9]/) !== -1) {
            output += num[i];
        }
        if (num[i].search(/[A-Za-z]/) !== -1) {
            output += alphabetParse(num[i]);
        }
    }
    if (output.length === 11) {
        output = '+' + output;
        console.log(output);
    } else if (output.length === 10) {
        console.log(output);
    } else {
        return console.log("Fleshling follow-up needed");
    }
    return output;
}
