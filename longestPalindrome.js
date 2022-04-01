// 判断回文
// 执行用时: 168 ms
// 内存消耗: 50.1 MB
function getPalindrome(s) {
  let left = "",
    right = "",
    temp = "";
  if (s.length % 2 !== 0) {
    // 奇数
    temp = s[Math.floor(s.length / 2)];
    left = s.slice(0, (s.length - 1) / 2);
    right = s.slice((s.length + 1) / 2);
  } else {
    // 偶数
    left = s.slice(0, s.length / 2);
    right = s.slice(s.length / 2);
  }
  for (let i = left.length - 1; i >= 0; i--) {
    if (left[i] === right[right.length - 1 - i]) {
      temp = left[i] + temp + right[right.length - 1 - i];
    } else {
      break;
    }
  }
  return temp;
}

function longestPalindrome(s) {
  let palindrome = "";
  for (let i = 0; i < s.length; i++) {
    if (s.slice(i).length < palindrome.length) break;
    if (s.slice(0, s.length - i) === s.slice(i)) {
      let leftResult = getPalindrome(s.slice(0, s.length - i));
      palindrome =
        leftResult.length > palindrome.length ? leftResult : palindrome;
    } else {
      let leftResult = getPalindrome(s.slice(0, s.length - i));
      palindrome =
        leftResult.length > palindrome.length ? leftResult : palindrome;
      let rightResult = getPalindrome(s.slice(i));
      palindrome =
        rightResult.length > palindrome.length ? rightResult : palindrome;
    }
  }
  return palindrome;
}

console.log(longestPalindrome("11abcdexfgagfedcba111"));
