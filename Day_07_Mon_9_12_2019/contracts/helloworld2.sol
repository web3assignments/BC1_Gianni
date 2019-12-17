pragma solidity ^0.5.11;
import "./HelloWorld.sol";

contract Hello2 {
  address public OtherContract;
  // address of "HelloWorld.sol" instance has to be supplied
  constructor (address ReferedContract) public {
      OtherContract = ReferedContract;
  }
  function Message() public view returns (string memory) {
    return HelloWorld(OtherContract).welcome();
  }
}