function generateRandom256BitNumber() {
  const hex = [...Array(64)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
  return BigInt("0x" + hex);
}

function isProbablyPrime(n, k = 5) {
  // Miller-Rabin primality test
  if (n < 2n) return false; // it is not typo mistak , it number represent in BIGING
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n) return false;

  let d = n - 1n;
  let r = 0n;

  while (d % 2n === 0n) {
    d /= 2n;
    r += 1n;
  }

  witnessLoop: for (let i = 0; i < k; i++) {
    const a = 2n + BigInt(Math.floor(Math.random() * Number(n - 3n)));
    let x = modExp(a, d, n); // Compute a^d % n
    if (x === 1n || x === n - 1n) continue;

    for (let j = 0n; j < r - 1n; j++) {
      x = modExp(x, 2n, n);
      if (x === n - 1n) continue witnessLoop;
    }
    return false;
  }

  return true;
}

function modExp(base, exp, mod) {
  let result = 1n;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return result;
}

async function generate256BitPrime() {
  let prime;
  do {
    prime = generateRandom256BitNumber();
  } while (!isProbablyPrime(prime));
    console.log(prime);
  return prime;
}


