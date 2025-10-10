// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract CredentialVerification {
    address public manager;

    // addresses allowed to mark credentials (verifiers)
    mapping(address => bool) public verifiers;

    // verified status and optional credential metadata
    mapping(address => bool) private _verified;
    mapping(address => string) private _credentialHash;

    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    event CredentialVerified(address indexed user, address indexed verifier, string credentialHash);
    event CredentialRevoked(address indexed user, address indexed verifier);

    modifier onlyManager() {
        require(msg.sender == manager, "Not manager");
        _;
    }

    modifier onlyVerifier() {
        require(verifiers[msg.sender] == true, "Not a verifier");
        _;
    }

    constructor() {
        manager = msg.sender;
        verifiers[msg.sender] = true; 
        emit VerifierAdded(msg.sender);
    }

    function addVerifier(address _verifier) external onlyManager {
        verifiers[_verifier] = true;
        emit VerifierAdded(_verifier);
    }

    function removeVerifier(address _verifier) external onlyManager {
        verifiers[_verifier] = false;
        emit VerifierRemoved(_verifier);
    }

    /// @notice Mark a user as verified and attach optional credential hash
    function verify(address _user, string calldata _credentialHash) external onlyVerifier {
        _verified[_user] = true;
        _credentialHash[_user] = _credentialHash;
        emit CredentialVerified(_user, msg.sender, _credentialHash);
    }

    /// @notice Revoke verification for a user
    function revoke(address _user) external onlyVerifier {
        _verified[_user] = false;
        _credentialHash[_user] = "";
        emit CredentialRevoked(_user, msg.sender);
    }

    /// @notice Check whether an address is verified
    function isVerified(address _user) external view returns (bool) {
        return _verified[_user];
    }

    /// @notice Get credential metadata (if any) for a user
    function credentialHash(address _user) external view returns (string memory) {
        return _credentialHash[_user];
    }
}
