function sieve(n) {
  var arr = [];
  var primes = [];
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

function NotZero(value) {
  return value !== 0;

}

function sequence(start,end) {
  var out = [];
  for(i = start; i <=end; i++) {
    out.push(i);
  }
  return(out);
}

function Wheel(init,l) {
  var Seed = sieve(init);
  var n = 1;
  for (x = 0; x<Seed.length; x++) {
    n  = n * Seed[x];
  }
  var center = sequence(1,n);
  var arr = center;
  for (x = 0; x <Seed.length; x++) {
    arr[Seed[x]-1] = 0;

  }
  for (x = 0; x<Seed.length; x++) {
    for(y = 0; y<arr.length; y++) {
      if(arr[y]%Seed[x] === 0) {
        arr[y] = 0;
      }
    }
  }
  for (r = 1; r <l; r++) {
    arr = arr.concat(sequence((r*n)+1,(r+1)*n));

  }
  for(x = 0; x<arr.length; x++) {
    if(arr[x%center.length]===0) {
      arr[x] = 0;
    }
  }
  for(x = 0; x<Seed.length; x++) {
    arr[Seed[x]-1] = Seed[x];

  }
  arr[0] = 0;
  var out = arr.filter(NotZero);
  return out;
}
