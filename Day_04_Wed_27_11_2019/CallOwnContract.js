const Web3 = require ('web3');
const web3 = new Web3 ('https://ropsten.infura.io');
const account = "0x550121a88db1207B3cE124B5962f95bcFeEa55A7";
const privateKey = '0xDB057064C73BA95CC57B7444CF23139A3442FD4770414C11617958785DC41607';
web3.eth.accounts.wallet.add(privateKey);

const PeopleAddABI = [{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_firstName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_lastName",
				"type": "string"
			}
		],
		"name": "addPerson",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "linkPersoon",
				"type": "address"
			}
		],
		"name": "newPersoon",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "people",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_firstName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_lastName",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "peopleCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
    }];

    const PeopleAddAddress = "0x9F6911475448C50edd4D278b54bb24B9519C3A95";
    const ContractPeopleAdd = new web3.eth.Contract(PeopleAddABI, PeopleAddAddress);
    
    async function f() { 
        var result = await ContractPeopleAdd.methods.peopleCount().call();
        console.log(result);
    }
    f();
    async function add(){
        var toevoegen = await ContractPeopleAdd.methods.addPerson("Naam", "Achternaam").send({from:account, gas: 200000});
    };
    add();
