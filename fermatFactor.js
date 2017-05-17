function fermatTest(n) {
  for (t = 0; t < 25; t++) {
    witness = Math.floor(Math.random()*n);
    if ((modularExp(witness,(n),n)) !== witness) {
      return (false);
    }
  }
  return (true);

}

function fermatSieve(n) {
  output = [];
  for(i = 2; i <=n; i++) {
    if(fermatTest(i) === true) {
      output.push(i);
    }
  }
  return output;

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





function primeFactor_S(n) {
  div = fermatSieve(Math.ceil(Math.sqrt(n)));
    for (j = 0; j<div.length; j++) {
      if (n%div[j]===0) {
        return div[j];
      }
    }
    return n;
}

// 38 bit benchmark optimal factor of non fermat sieve - 232121501231
//1677828420661285099 Fermat Factor number - 64 bit monster
function primeFactor(n) {
  out = [];
  out.push(primeFactor_S(n));
  if (primeFactor_S(n)!==n) {
    out = out.concat(primeFactor(n/primeFactor_S(n)));
  }
  return out;
}
