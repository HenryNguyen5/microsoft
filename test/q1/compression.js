var fs = require('fs');
var inputFile = process.argv[2];

var buff = fs.readFileSync(inputFile,'utf8');
var stringArr = buff.split('\n');
stringArr.shift();
var outputArr = [];
for (var str of stringArr) {
  var counter = 1;
  var compare = '';
  var tmp = '';
  for (var i = 0; i < str.length; i++) {

    if(str[i] === str[i+1]){
      counter++;
    }
    else{
      tmp += (counter.toString() + str[i]);
    }
  }
  outputArr.push(tmp);
}
console.log(outputArr)

fs.writeFileSync('output.txt',outputArr.join('\n'),'utf8');
