/**
 * 快速排序
 * @param {Array} arr
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const base = arr[0];
  let left = [],
    right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= base) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), base, ...quickSort(right)];
}

console.log(quickSort([9, 8, 5, 1, 3, 2, 4, 6, 7]));
