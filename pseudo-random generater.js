

function PiRandom(SEED) {
    var PiValue = Math.PI;//Get PI
    TRUESEED = SEED%17;//Can't Calculate Higher than 17 digits accuratly
    rngONE = Math.floor(PiValue*Math.pow(10, TRUESEED));
    rngTWO = Math.floor(PiValue*Math.pow(10, (TRUESEED-1)));
    rngTHREE = rngTWO*10;
    return (rngONE-rngTHREE);//Strip the digit that corresponds to the (SEED MOD 17)
}

function ModRandom(SEED) {
  return SEED%PiRandom(SEED);
}
