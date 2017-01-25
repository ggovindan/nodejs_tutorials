'use strict';

let Promise = require('bluebird');
let array = [34, 23, 56, 2, 3, 45, 87, 54, 34, 77, 43, 3, 356, 67, 34, 23];


function bubbleSort(array, callback) {
  console.log("bubbleSort Entering array=", array);
  if (array.length < 2 ) {
    callback(255,0);
  }
  var swapCount = 0;
  for(var i=0; i < array.length; i++) {
    console.log(typeof i);
    if (i === array.length - 1) {
      break;
    }
    if (array[i] > array[i+1]) {
      let temp = array[i];
      array[i] = array[i+1];
      array[i+1] = temp;
      ++swapCount;
    }
  }
  console.log(`Bubble Sort exiting swapCount=${swapCount} array=${array}`);
  return callback(undefined, swapCount);
}

let count = 1;

function sorter () {
  return new Promise(function(resolve, reject) {
    bubbleSort(array, function(err, count) {
      console.log("calling resolve with count=", count);
      resolve(count);
    });
  });
}

while(count > 0) {
  sort();
}

function sort() {
    return sorter().then(function(val) {
    count = val;
    console.log("In while loop swapCount=", count);
  });
}

