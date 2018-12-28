
# Track and Trace Supply Chain

## Project Details

 - Hindustan Unilever Ltd
 - Security & Surveillance
 - [https://www.youtube.com/watch?v=-J8K9vXUkg4](https://www.youtube.com/watch?v=-J8K9vXUkg4)

> Every year Millions of units of consumer products are transported from
> farms to factories to distributors to retailers and finally the end
> consumer. To deliver Quality and transparency, Organizations need to
> be able to trace each product to its origin. The challenge is to
> design a solution to track each of the millions of units from point of
> origin to retailer. Traditional bar code based solutions becomes
> difficult to manage beyond the distributors. The design should need
> minimal human effort.

## Contract Information

### SupplyChain.sol
**Contract Address :** 
`0xd6a3754cee259a58e50f6ced2c829d28f6a00ac1`

**Testnet Chain :** 
`Ropsten`

**ABI :**

    [{"constant":true,"inputs":[],"name":"getPIDLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_add","type":"address"},{"name":"_dd","type":"string"},{"name":"_mm","type":"string"},{"name":"_yyyy","type":"string"},{"name":"_company","type":"string"},{"name":"_name","type":"string"},{"name":"_place","type":"string"},{"name":"_lat","type":"bytes8"},{"name":"_lon","type":"bytes8"}],"name":"registerProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_add","type":"address"},{"name":"_pid","type":"bytes32"},{"name":"_dd","type":"string"},{"name":"_mm","type":"string"},{"name":"_yyyy","type":"string"},{"name":"_lat","type":"bytes8"},{"name":"_lon","type":"bytes8"}],"name":"sellProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"bytes32"}],"name":"getProductDetails","outputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pid","type":"bytes32"}],"name":"getProductValidity","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllPID","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"bytes32"}],"name":"isValidPID","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pid","type":"bytes32"},{"indexed":false,"name":"company","type":"string"},{"indexed":false,"name":"name","type":"string"}],"name":"productRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pid","type":"bytes32"},{"indexed":false,"name":"company","type":"string"},{"indexed":false,"name":"name","type":"string"}],"name":"productSold","type":"event"}]

**Test Data:**

Register Product

    "0x707aC3937A9B31C225D8C240F5917Be97cab9F20","29","07","2014","Tupperware","WaterBottle","Noida","0x37352e36353433","0x37352e36353433"

Sell Product

    "0x707aC3937A9B31C225D8C240F5917Be97cab9F20","29","07","2014","Tupperware","WaterBottle","Noida","0x37352e36353433","0x37352e36353433"