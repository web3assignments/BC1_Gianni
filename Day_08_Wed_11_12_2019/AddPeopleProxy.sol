pragma solidity 0.5.11;

contract PeopleAdd {

    address public currentVersion;
    address owner = msg.sender;
    event newPersoon(
        address indexed linkPersoon
    );
    uint256 public peopleCount = 0;
    mapping(uint => Person) public people;

    struct Person {
        uint _id;
        string _firstName;
        string _lastName;
    }
    function upgradeVersion(address newVersion) public {
        require(msg.sender == owner, "Only owner can upgrade");
        currentVersion = newVersion;
    }
    function() external payable{
           address implementation = currentVersion;
           assembly {
               calldatacopy(0x0, 0x0, calldatasize)
               let result := delegatecall(gas, implementation, 0x0, calldatasize, 0x0, 0)
               returndatacopy(0x0, 0x0, returndatasize)
               switch result case 0 {revert(0,0)} default {return (0, returndatasize)}
           }
    }

    function addPerson(string memory _firstName, string memory _lastName) public {
        bytes memory firstname = bytes(_firstName);
        require (firstname.length > 0, "Firstname has to be filled");
        bytes memory lastname = bytes(_lastName);
        require (lastname.length > 0, "Lastname has to be filled");
        peopleCount += 1;
        people[peopleCount] = Person(peopleCount, _firstName, _lastName);
        emit newPersoon(msg.sender);
       }
}
