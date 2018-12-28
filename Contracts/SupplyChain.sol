pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;

contract SupplyChain {
    
    bytes32[]  pid;
    
    address owner;
    constructor () public{
        owner = msg.sender;
    }
    modifier isOwner(address sender) {
        if(owner != sender) {
            revert();
        }else{
            _;
        }
    }
    
    struct ProdEvent {
	    address ethadd;
	    string dd;
	    string mm;
	    string yyyy;
	    bytes8 lat;
	    bytes8 lon;
	    string details;
    }
       
    mapping(bytes32 => Product) productList;

    struct Product {
	    address ethadd;
	    bytes32 pid;
        string company;
	    string name;
	    string place;
    	ProdEvent events; 
    	uint8 status; //  0 not exist, 1 intransit, 2 consumed/sold
    }
 
    event productRegistered (
        bytes32 pid,
        string company,
        string name
    );
    event productSold (
        bytes32 pid,
        string company,
        string name
    );
   
   function isValidPID(bytes32 _id) public view returns(bool) {
	    if (productList[_id].status != 0) {
		    return true;
	    }
        return false;
    }
    
    function registerProduct(address _add,string memory _dd,string memory _mm,string memory _yyyy,string memory _company,string memory _name,string memory _place, bytes8 _lat, bytes8 _lon) isOwner(msg.sender) public{
        bytes32 _pid = bytes32(keccak256(abi.encodePacked(block.timestamp , block.difficulty)));
        require(!isValidPID(_pid));
        pid.push(_pid);
        ProdEvent memory pev = ProdEvent(_add, _dd, _mm, _yyyy, _lat, _lon,"REG");
        productList[_pid] = Product(_add, pid[pid.length - 1],_company, _name,_place,pev, 1);
        emit productRegistered(pid[pid.length - 1], _company, _name);
    }
    
    function sellProduct(address _add, bytes32 _pid,string memory _dd,string memory _mm,string memory _yyyy, bytes8 _lat, bytes8 _lon) isOwner(msg.sender) public{
        require(isValidPID(_pid));
        ProdEvent memory pev = ProdEvent(_add, _dd, _mm, _yyyy, _lat, _lon,"SOLD");
        productList[_pid].events = pev;
        productList[_pid].status = 2;
        emit productSold(_pid,  productList[_pid].company,  productList[_pid].name);
    }
    
    function getProductDetails(bytes32 _id) public view returns(address, bytes32, string memory, string memory, string memory, string memory, string memory, string memory, ProdEvent memory, uint8){
        require(isValidPID(_id));
        Product memory p = productList[_id];
        return (p.ethadd, p.pid, p.events.dd, p.events.mm, p.events.yyyy, p.company, p.name, p.place, p.events, p.status);
    }
    
    function getPIDLength() public view returns(uint256){
        return pid.length;
    }
    
    function getAllPID() public view returns(bytes32[] memory){
        return pid;
    }
    
    function getProductValidity(bytes32 _pid) public view returns(bool){
        if (isValidPID(_pid) && productList[_pid].status!=2){
            return true;
        }
        return false;
    }
}