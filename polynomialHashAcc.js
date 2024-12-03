
function multiplyPolynomialsMod(p1, p2, N) {
  const result = Array(p1.length + p2.length - 1).fill(BigInt(0));
  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      result[i + j] += (p1[i] * p2[j]) % N;
      result[i + j] %= N;
    }
  }
  return result;
}

function addElement(accumulator, element, N) {
    element = BigInt("0x" + element);
  const elementPoly = [BigInt(-element), BigInt(1)]; // (x - element)
  return multiplyPolynomialsMod(accumulator, elementPoly, N);
}

function evaluatePolynomial(poly, x, N) {
  let result = BigInt(0);
  let powerOfX = BigInt(1);
  for (const coeff of poly) {
    result = (result + coeff * powerOfX) % N;
    powerOfX = (powerOfX * x) % N;
  }
  return result;
}

function isMember(accumulator, element, N) {
  return (
    evaluatePolynomial(accumulator, BigInt("0x" + element), N) === BigInt(0)
  );
}

//---------------------------------------TESTING PART---------------------------------------//
// let accumulator = [BigInt(1)]; // Initialize as P(x) = 1

// // Add elements
// accumulator = addElement(accumulator, 3, N); // Add 3
// accumulator = addElement(accumulator, 5, N); // Add 5

// Check membership
// let flag = false;
// for (let i = 1; i <= 100; i++) {
//   // if (i === 3 || i == 5) continue;
//   flag = flag || isMember(accumulator, i, N);
// }
// console.log(flag);
