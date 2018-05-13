pragma solidity ^0.4.18;

contract SimpleStorageInit {
  uint storedData;

  function SimpleStorageInit(uint x) public {
    storedData = x;
  }

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
