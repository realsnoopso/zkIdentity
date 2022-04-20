pragma circom 2.0.1;

include "./keccak.circom";

// helper for verifying an Ethereum address refers to the correct public key point or not
// it aggregates public key to a single bit array
template pubKeyToEthAddr(n, k) {
    signal input pubKey[2][k];
    signal input address;
    signal output result;
}