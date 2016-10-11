/*jshint esversion: 6 */
var fs = require('fs');
var _ = require('underscore');
var inputFile = process.argv[2];
var buff = fs.readFileSync(inputFile, 'utf8');
var stringArr = buff.split('\n');
var outputArr = [];
var notificationArr = [];

for (var str of stringArr) {
    if (str !== '')
        notificationArr.push(parseIntoObj(str));
}

for (var a of notificationArr) {
    var b = a.isFinished
    var c = a.MessageToDisplay
    for (var d of notificationArr) {
        if (d.MessageToDisplay === c && d.isFinished === 'true' && a.isFinished === 'false') {
            var index = notificationArr.indexOf(a);
            notificationArr.splice(index, 1);
        }
    }
}

sortByDepth(notificationArr);

var maxDepth = notificationArr[notificationArr.length - 1].depth + 1;
var depthArr = [];

for (var currDepth = 0; currDepth < maxDepth; currDepth++) {
    returnedArr = (() => {
        var temp = []
        for (var i = 0; i < notificationArr.length; i++) {
            if (notificationArr[i].depth === currDepth) {
                temp.push(notificationArr[i]);
            }
        }
        return temp;
    })();
    depthArr.push(returnedArr);
}
//set order of each depth
for (let ele of depthArr) {
    sortByStart(ele);
    for (var i = 0; i < ele.length; i++) {
        ele[i].order[0] = i + 1;
    }
}
for (let ele of depthArr) {
    for (let obj of ele) {
        for (var i = 0; i < depthArr.indexOf(ele); i++) {
            obj.order.unshift(1);
        }
    }
}
depthArr = _.flatten(depthArr)

var prevNotif = '';
for (asd of depthArr) {
    for (currNotif of depthArr) {
        for (var k = 0; k < currNotif.order.length; k++) {
            if (prevNotif !== '' && currNotif.order[k] < prevNotif.order[k] && currNotif.parentOperationID === prevNotif.operationID) {
                currNotif.order[k] = prevNotif.order[k];
            }
        }
        prevNotif = currNotif;
    }
}

depthArr.map(v => v.order.join(','));
for (q of depthArr) {
    console.log(`${q.order} ${q.MessageToDisplay} ${q.progress}`)
}


function parseIntoObj(string) {
    var obj = {};
    var arr = string.split(',');
    obj.parentOperationID = arr[1];
    obj.operationID = arr[0];
    obj.MessageToDisplay = arr[2];
    obj.depth = parseInt(arr[3], 10);
    obj.startTime = arr[4];
    obj.isFinished = arr[5];
    obj.order = [];
    obj.progress = (() => {
        if (obj.isFinished === "true") {
            return ("(done)");
        }
        return ("(in progress)");
    })();
    return obj;
}

function sortByStart(arr) {
    arr.sort((a, b) => {
        if (a.startTime === 'null') {
            return 1;
        } else if (a.startTime > b.startTime) {
            return 1;
        } else if (a.startTime < b.startTime) {
            return -1;
        } else return 0;
    });
}

function sortByDepth(arr) {
    arr.sort((a, b) => {
        if (a.depth === 'null') {
            return 1;
        } else if (a.depth > b.depth) {
            return 1;
        } else if (a.depth < b.depth) {
            return -1;
        } else return 0;
    });
}
