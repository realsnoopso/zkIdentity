pragma circom 2.0.1;

include "./keccak.circom";

// helper for verifying an Ethereum address refers to the correct public key point or not
// it aggregates public key to a single bit array
template pubKeyToEthAddr(n, k) {
    signal input pubKey[2][k];
    signal output address;
    signal pubKeyBits[2 * k * n];

    // validate it is enough width for ethereum public key
    assert(2 * k * n >= 512);

    // converting publicKey to a single bit array
    component chunks2Bits[2 * k];
    for (var coordinate = 0; coordinate < 2; coordinate++) {
        // concatenate x and y coordinates
        for (var register = 0; register < k; register++) {
            var compIdx = (coordinate * k) + register;
            chunks2Bits[compIdx] = Num2Bits(n);
            chunks2Bits[compIdx].in <== pubKey[coordinate][register];
        }

        for (var bit = 0; bit < n; bit++) {
            var bitIdx = (coordinate * k * n) + (register * n) + bit;
            pubKeyBits[bitIdx] <== chunk2Bits[compIdx].out[bit];
        }
    }
}