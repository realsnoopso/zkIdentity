pragma circom 2.0.3;

include "./merkle.circom";
include "./ecdsa.circom";
include "../node_modules/circomlib/circuits/poseidon.circom";
include "../node_modules/circomlib/circuits/bitify.circom";

// prove that (sig, msg, pubKey, nullifier, merkle_branch, merkle_root)
template verifyWinner(n, k, levels) {
    signal input r[k];
    signal input s[k];
    signal input msgHash[k];
    signal input pubKey[2][k];
    signal input address;
    signal input nullifier;

    signal rNum;
    signal pubKeyBitRegisters[2][k];

    // By continuously hash the current node with the pathElements,
    // we are able move up in the Merkle Tree till the root node.
    signal input merklePathElements[levels];

    // pathIndices consist of a list of 0 or 1 that indicates if a given pathElement
    // is on the left or right of the Merkle Tree. 
    signal input merklePathIndices[levels];
    signal input merkleRoot; // eth Addresses

    // verifying `sig`
    // encoded with k registers of n bits each
    component verifySig = ECDSAVerify(n, k);
    for (var i = 0; i < k; i++) {
        verifySig.r[i] <== r[i];
        verifySig.s[i] <== s[i];
        verifySig.msghash[i] <== msgHash[i];
        verifySig.pubkey[0][i] <== pubKey[0][i];
        verifySig.pubkey[1][i] <== pubKey[1][i];
    }
    verifySig.result === 1;

    // verifying `merkle`
    component checker = MerkleTreeChecker(levels);
    checker.leaf <== address;
    checker.root <== merkleRoot;

    for (var i = 0; i < levels; i++) {
        checker.pathElements[i] <== merklePathElements[i];
        checker.pathIndices[i] <== merklePathIndices[i];
    }

    // verifying nullifier using Bitify
    component rToNum = Bits2Num(k);
    for (var i = 0; i < k; i++) {
        rToNum.in[i] <== r[i];
    }
    rNum <== rToNum.out;

    component nullifierCheck = Poseidon(1);
    nullifierCheck.inputs[0] <== rNum;
    nullifierCheck.out === nullifier;
}

component main = verifyWinner(86, 3, 10);