pragma solidity >=0.5.11;

contract donateToThisContract {
    mapping(address => bool) public people;
		mapping(address => uint) public donator;
  	uint private peopleDonators;
  	address owner;
  	uint public amountOfDonations;
  	uint constant donation = 0.5 ether;
  	event newPerson(address);
  	event losePerson(address);
  	event donated(address);
  	constructor() public {
      peopleDonators = 0;
    }

    function addDonator() public payable returns(bool){
      require(!(people[msg.sender]), "This person is already an donator");
      peopleDonators++;
      people[msg.sender] = true;
      emit newPerson(msg.sender);
      return true;
       }
  	function removeDonator() public returns(bool){
      require(people[msg.sender], "This person isn't an donator");
      peopleDonators--;
      people[msg.sender] = false;
      emit losePerson(msg.sender);
      return true;
    }
  	function amountOfDonator () public view returns(uint) {
      return peopleDonators;
    }
  	function registrationStatus (address _id) public view returns(bool){
      if (people[_id]) {
        require(!(people[msg.sender]),"you're an donator");
        return true;
      } else {
        require(people[msg.sender],"you aren't an donator");
        return false;
      }
   }
  	function donate() public payable returns(bool){
      if (msg.value != donation) {
          require(msg.value < donation,"You don't have enough funds");
          }
      amountOfDonations++;
      emit donated(msg.sender);
      return true;
    }
    function contractBalance() public view returns(uint256){
     return address(this).balance;
    }
}