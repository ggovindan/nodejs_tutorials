'use strict';
let Promise = require('bluebird');
console.time('quicksort');
let swap = (array, i, j) => {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  console.log('array=', array);
}

let quicksort = (array, left, right) => {
  return new Promise((resolve, reject) => {
    let min = Math.floor((left + right)/2);
    console.log(`quicksort: left=${left} right=${right}`);

    let i = left;
    let j = right;
    let pivot = array[min];

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
          quicksort(array, left, j);
        if(i < right)
          quicksort(array, i, right);
        return resolve();
      }
    }
  });
}

let arr = [110, 5, 10, 3, 22, 100, 1, 23];
quicksort(arr, 0, arr.length-1);
console.timeEnd('quicksort');
