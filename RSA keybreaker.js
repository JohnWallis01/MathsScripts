//RSA KEYGEN tools

//cracker function take e and m and factors to find modular inverse to decrypt

function crack(e,m) {
  factors = primeFactor(m);
  secretMod = totient(factors[0],factors[1]);
  console.log("Private Key equals");
  return extendedEA(e,secretMod);
}


//Euclids totient function
function totient(pVal, qVal) {
      var a = pVal-1;
      var b = qVal-1;
      return lcd(a,b);
}
//Finds Lowest Common Multiple
function lcd(a,b) {
    var LCM = (Math.abs(a)/gcd(a,b))*b;
    return LCM;
}
//Finds Highest Common Factor
function gcd(a,b) {
  if (b === 0){
    return a;
  }
  if (a === 0) {
    return b;
  }
  else {
    return gcd(b, a%b);
  }

}

//finds the multiplicative inverse of a mod m {this tries all residues so big values blow it up}
function modularInverse(a,m) {
  for (x = 0; x < m; x++) {
    if(((a*x)%m) == 1 ) {
      return x;
    }
  }
}

//extended Euclidean Algorithim - {don't fully understand this} {alternitive to the brute force modularInverses}

function extendedEA(a, b) {
  var mod = b;
  a = +a;
  b = +b;

var x = 0,
    y = 1,
    u = 1,
    v = 0,
    q, r, m, n;

  while (a !== 0) {
    q = Math.floor(b / a); //finds quotient
    r = b % a; // finds remainder
    m = x - u * q;
    n = y - v * q;
    b = a;
    a = r;
    x = u;
    y = v;
    u = m;
    v = n;
  }
  return (x > 0 ? x : x+mod);
}

//Prime Factoring tools

//Sieve of Eratosthenes - main memory issue
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
//Checks if number is prime by divding by all primes less than sqrt(n)
function primeCheck(n) {
  div = sieve(Math.ceil(Math.sqrt(n)));
  for (j = 0; j<div.length; j++) {
    if ((n%div[j]===0)) {
      return false;
    }
  }
  return true;
}
// finds smallest prime factor
function primeFactor_S(n) {
  div = sieve(Math.ceil(Math.sqrt(n)));
    for (j = 0; j<div.length; j++) {
      if (n%div[j]===0) {
        return div[j];
      }
    }
    return n;
}
// returns array of prime factorisation - all up, this can break 38 bit keys
function primeFactor(n) {
  out = [];
  out.push(primeFactor_S(n));
  if (primeFactor_S(n)!==n) {
    out = out.concat(primeFactor(n/primeFactor_S(n)));
  }
  return out;
}
