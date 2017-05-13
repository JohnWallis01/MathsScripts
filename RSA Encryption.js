
//Initialize - takes two primes (p,q) and generate the keys for RSA Encryption
function Initialize(p,q) {
  console.log("modulus =");
  console.log(p*q);
  console.log("publicKey =");
  var publicKey = randomCoprime(totient(p,q));
  console.log(publicKey);
  console.log("privateKey =");
  console.log(modularInverse(publicKey,totient(p,q)));
  console.log(extendedEA(publicKey,totient(p,q)));

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
//picks a number that is less than n and comprime to n at random
function randomCoprime(n) {
  var possible = [];
  for (x = 0; x < n; x++){
      if (gcd(x,n)==1) {
      possible.push(x);
      }
  }
  return(possible[Math.floor(Math.random()*possible.length)]);
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


//fast modular exponents for multiples of two
function modularExp_forTwo(a,b,m) {
    if (b == 1) {
      return a%m;
    }
    else {
      return Math.pow(modularExp_forTwo(a, b/2, m),2)%m;
    }
}
// this works for non multiple of two powers
function modularExp(a,b,m) {
  exponent = parseInt(b.toString(2));
  powers =[];
  final = 1;
  for (x = 0, d = 1;d<(exponent.toString().length+1);x++,d++){
    if (digitStrip(exponent,d)==1) {
      powers.push(x);
    }
  }
  for (x = 0; x<powers.length; x++) {
    powers[x] = Math.pow(2,powers[x]);
  }
  for (x = 0; x<powers.length; x++) {
    powers[x] = modularExp_forTwo(a,powers[x],m);
  }
  for (x = 0; x<powers.length; x++) {
    final = final * powers[x];
  }
  return (final%m);
}


//REMEMBER: the floor function can strip digits
// this was from the mind of a mad man - but it works
function digitStrip(number,digit) {
  rDigits = Math.floor(number*Math.pow(10,(digit*-1)+1))*Math.pow(10,digit-1); //digits to the right of the one we want are removed
  lDigits = Math.floor(number*Math.pow(10,digit*-1))*Math.pow(10,digit); //digits to the left of the one we want are removed
  return (rDigits-lDigits)*(Math.pow(10,(digit-1)*-1)); //the remaing digit is returned
}

//Encryption function - encrypts a string and returns an array
function Encrypt(m,k,n) {
  message = [];
  for ( i = 0; i < m.length; i++) {
    message.push(m.charAt(i));
  }
  for (i = 0; i<message.length; i++) {
    message[i] = message[i].charCodeAt(0) - 64;
  }
  for (i = 0; i<message.length; i++) {
    message[i] = modularExp(message[i],k,n);
  }
  return message;
}
//Decrypt - Decrypts an array and returns a string - this will just return "A" if the numbers get too big
function Decrypt(m,k,n) {
  message = [];
  messageString = "";
  for (z = 0; z<m.length; z++) {
    message.push(modularExp(m[z],k,n));
  }
  for (z = 0; z<m.length; z++) {
    messageString = messageString.concat((String.fromCharCode(message[z]+64)));

  }
  return messageString;
}
