pragma solidity 0.5.11;

contract PeopleAdd {
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

    function addPerson(string memory _firstName, string memory _lastName) public {
        bytes memory firstname = bytes(_firstName);
        require (firstname.length > 0, "Firstname moet worden ingevuld");
        bytes memory lastname = bytes(_lastName);
        require (lastname.length > 0, "Lastname moet worden ingevuld");
        peopleCount += 1;
        people[peopleCount] = Person(peopleCount, _firstName, _lastName);
        emit newPersoon(msg.sender);
       }
}
