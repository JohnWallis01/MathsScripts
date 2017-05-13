
function sieve(n) {
  arr = [];
  primes = [];
  for (x =0; x<(n-1); x++){
    arr.push(true);
  }
  for (x = 0; x<=Math.sqrt(n); x++){
    if (arr[x] === true) {
      for (i = Math.pow((x+2),2)-2; i <(n-1); i= i+(x+2)) {
        arr[i] = false;
      }
     }
  }
  for (x = 0; x<arr.length; x++){
    if (arr[x] === true){
      primes.push(x+2);
    }
  }
  return primes;
}

function primeCheck(n) {
  div = sieve(Math.ceil(Math.sqrt(n)));
  for (j = 0; j<div.length; j++) {
    if ((n%div[j]===0)) {
      return false;
    }
  }
  return true;
}

function primeFactor_S(n) {
  div = sieve(Math.ceil(Math.sqrt(n)));
    for (j = 0; j<div.length; j++) {
      if (n%div[j]===0) {
        return div[j];
      }
    }
    return n;
}

function primeFactor(n) {
  out = [];
  out.push(primeFactor_S(n));
  if (primeFactor_S(n)!==n) {
    out = out.concat(primeFactor(n/primeFactor_S(n)));
  }
  return out;
}
