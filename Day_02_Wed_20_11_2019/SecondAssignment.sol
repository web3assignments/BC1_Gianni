pragma solidity 0.5.12;

contract PeopleAdd {
    uint256 public peopleCount = 0;
    mapping(uint => Person) public people;
    
    struct Person {
        uint _id;
        string _firstName;
        string _lastName;
    }
    
    function addPerson(string memory _firstName, string memory _lastName) public {
        peopleCount += 1;
        people[peopleCount] = Person(peopleCount, _firstName, _lastName);
        bytes memory firstname = bytes(_firstName);
        require (firstname.length > 0, "Firstname moet worden ingevuld");
        bytes memory lastname = bytes(_lastName);
        require (lastname.length > 0, "Lastname moet worden ingevuld");
       }
}
