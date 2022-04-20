pragma circom 2.0.3;

include "./ecdsa.circom";

// prove that (sig, msg, pubKey, nullifier, nullifierHash, merkle_branch, merkle_root)
template verifyWinner(levels) {
    signal input sig;
    signal input msg;
    signal input pubKey;
    signal input nullifier;
    signal input nullifierHash;

    // By continuously hash the current node with the pathElements,
    // we are able move up in the Merkle Tree till the root node.
    signal input merklePathElements[levels];

    // pathIndices consist of a list of 0 or 1 that indicates if a given pathElement
    // is on the left or right of the Merkle Tree. 
    signal input merklePathIndices[levels];
    signal input merkleRoot;

    // verifying `sig`
    component verifySig = ECDSAVerify(86, 3);

    // verifying `merkle`
    component checker = MerkleTreeChecker(levels);
    checker.leaf <== pubKey;
    checker.root <== merkleRoot;

    for (var i = 0; i < levels; i++) {
        checker.pathElements[i] <== merklePathElements[i];
        checker.pathIndices[i] <== merklePathIndices[i];
    }

    component nullifierCheck = Poseidon(1);
    component nullifierHashCheck = Poseidon(1);
}

// Test: 10 levels
component main = verifyWinner(10);