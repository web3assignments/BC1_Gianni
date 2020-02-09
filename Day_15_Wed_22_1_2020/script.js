function log(logstr) {
	document.getElementById("log").innerHTML +=logstr+"\n";
}
web3 = new web3(Provider);
    web3.extend({ // web3.eth.requestAccounts() isn't available (yet)
        methods: [{
            name: 'eth_requestAccounts',
            call: 'eth_requestAccounts',
            params: 0
        }]
    });
const userAddress = await web3.eth_requestAccounts().catch(x=>log(x.message));

const ContractABI = [{"constant":true,"inputs":[],"name":"amountOfDonator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"people","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"amountOfDonations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_id","type":"address"}],"name":"registrationStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"removeDonator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"donate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"addDonator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"newPerson","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"losePerson","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"donated","type":"event"}];

    const ContractAddress = '0x16935a8175A01Ff4d50cf90Aa3AF212B8fe9485B';
	const ContractDonator = new web3.eth.Contract(ContractABI, ContractAddress);
	
		async function addDonator() {
			var result = await ContractDonator.methods.addDonator().send({from: `${userAddress}`});
			if (result) {
					log(`You're on the donator list now!'`);
				} else {
					log(`please try again to join the list`);
				}
			}

		async function removeDonator() {
			var result = await ContractDonator.methods.removeDonator().send({from: `${userAddress}`});
			if (result) {
						log(`You have been removed from the donator list'`);
				} else {
						log(`please try again to leave the list`);
				}
			}

			async function amountDonators() {
				var result = await ContractDonator.methods.amountOfDonator().call();
				log('There are ${result} donators');
				}
			
			async function registrationStatus() {
				var result = await ContractDonator.methods.registrationStatus().call();
				log('You are registered');
				}
			
			async function Donate() {
				var result = await ContractDonator.methods.donate().send({from: `${userAddress}`});
			    	if (result) {
						log(`You have donated!`);
						} else {
						log(`please try again`);
						}
				}

			async function contractBalance() {
				var result = await ContractDonator.methods.contractBalance().call();
				log('This contract has ${result} eth.');
				}
			
