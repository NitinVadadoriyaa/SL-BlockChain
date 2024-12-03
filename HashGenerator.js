const crypto = window.crypto; // FOR WINDOW ENVIROMENT
// const crypto = require("crypto"); // FOR NODEJS ENVIROMENT

async function hashOfobject(obj) {
  const jsonString = JSON.stringify(obj);

  // Encode the string to a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(jsonString);

  // Generate a SHA-256 hash using window.crypto.subtle
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the hash buffer to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

async function hashOfString(str1, str2) {
  // Remove "0x" prefix for comparison (if present)
  const cleanA = str1.startsWith("0x") ? str1.slice(2) : str1;
  const cleanB = str2.startsWith("0x") ? str2.slice(2) : str2;

  // Use BigInt to compare the large hexadecimal values
  const bigIntA = BigInt(`0x${cleanA}`);
  const bigIntB = BigInt(`0x${cleanB}`);

  let str = "";
  if (bigIntA < bigIntB) {
    str = str1 + str2;
    
  } else {
    str = str2 + str1;
  }
  

  const encoder = new TextEncoder();
  const data = encoder.encode(str);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

