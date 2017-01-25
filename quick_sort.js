'use strict';
let Promise = require('bluebird');

function quicksort(array, left, right, callback) {
  let min = Math.floor((left + right)/2);
  console.log(`quicksort: left=${left} right=${right}`);

  let i = left;
  let j = right;
  let pivot = array[min];

  let swap = (array, i, j) => {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    console.log('array=', array);
  }

  while (left < j || i < right) {
    while(array[i] < pivot)
      i++;
    while(array[j] > pivot)
      j--;

    if(i <= j) {
      swap(array, i, j);
      i++;
      j--;
    }
    else {
      if (left < j)
        quicksort(array, left, j, callback);
      if(i < right)
        quicksort(array, i, right, callback);
      callback();
      return;
    }
  }
}

let arr = [110, 5, 10, 3, 22, 100, 1, 23];

quicksort(arr, 0, arr.length-1, ()=>{return;});