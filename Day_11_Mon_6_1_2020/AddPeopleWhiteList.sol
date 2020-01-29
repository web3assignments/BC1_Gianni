pragma solidity >= 0.5.11;

import "github.com/provable-things/ethereum-api/provableAPI.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/ownership/Ownable.sol";

contract PeopleAdd is usingProvable, Ownable {

    address public currentVersion;
    address owner = msg.sender;
    event newPersoon(address indexed linkPersoon);
    uint256 public peopleCount = 0;
    mapping(uint => Person) public people;
    constructor() public Ownable payable{}

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

        event MemberAdded(address member);
    event MemberRemoved(address member);

    mapping (address => bool) members;

    /**
     * @dev The contract constructor.
     */
    // constructor() public Ownable() {
    // }

    /**
     * @dev A method to verify whether an address is a member of the whitelist
     * @param _member The address to verify.
     * @return Whether the address is a member of the whitelist.
     */
    function isMember(address _member)
        public
        view
        returns(bool)
    {
        return members[_member];
    }

    /**
     * @dev A method to add a member to the whitelist
     * @param _member The member to add as a member.
     */
    function addMember(address _member)
        public
        onlyOwner
    {
        require(
            !isMember(_member),
            "Address is member already."
        );

        members[_member] = true;
        emit MemberAdded(_member);
    }

    /**
     * @dev A method to remove a member from the whitelist
     * @param _member The member to remove as a member.
     */
    function removeMember(address _member)
        public
        onlyOwner
    {
        require(
            isMember(_member),
            "Not member of whitelist."
        );

        delete members[_member];
        emit MemberRemoved(_member);
    }
}
