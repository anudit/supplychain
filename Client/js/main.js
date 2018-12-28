function structFactory(names) {
    var names = names.split(' ');
    var count = names.length;
    function constructor() {
        for (var i = 0; i < count; i++) {
            this[names[i]] = arguments[i];
        }
    }
    return constructor;
}

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
                await ethereum.enable();
        } catch (error) {
                console.log(error);
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/8f68025ea6a8425cb75ae44591a8b1b3"));
    }
});

web3.eth.defaultAccount = web3.eth.accounts[0];
var SupplyChainContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getPIDLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_add","type":"address"},{"name":"_dd","type":"string"},{"name":"_mm","type":"string"},{"name":"_yyyy","type":"string"},{"name":"_company","type":"string"},{"name":"_name","type":"string"},{"name":"_place","type":"string"},{"name":"_lat","type":"bytes8"},{"name":"_lon","type":"bytes8"}],"name":"registerProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_add","type":"address"},{"name":"_pid","type":"bytes32"},{"name":"_dd","type":"string"},{"name":"_mm","type":"string"},{"name":"_yyyy","type":"string"},{"name":"_lat","type":"bytes8"},{"name":"_lon","type":"bytes8"}],"name":"sellProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"bytes32"}],"name":"getProductDetails","outputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"components":[{"name":"ethadd","type":"address"},{"name":"dd","type":"string"},{"name":"mm","type":"string"},{"name":"yyyy","type":"string"},{"name":"lat","type":"bytes8"},{"name":"lon","type":"bytes8"},{"name":"details","type":"string"}],"name":"","type":"tuple"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pid","type":"bytes32"}],"name":"getProductValidity","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllPID","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"bytes32"}],"name":"isValidPID","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pid","type":"bytes32"},{"indexed":false,"name":"company","type":"string"},{"indexed":false,"name":"name","type":"string"}],"name":"productRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pid","type":"bytes32"},{"indexed":false,"name":"company","type":"string"},{"indexed":false,"name":"name","type":"string"}],"name":"productSold","type":"event"}]);
var SupplyChain = SupplyChainContract.at('0xf4f66030f14b02944a415e0c685b4ad3f4d3c23b');
var Product = structFactory("add dd mm yyyy company name place lat lon");

var ProductRegistered = SupplyChain.productRegistered();
ProductRegistered.watch(function(error, result){
    if (!error)
        {
            console.log(result);
            var url =" https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=" + result.args.pid +"&choe=UTF-8";
            $("#qr").attr("src",url);
            $('#returnPID').text(result.args.pid);
        } else {
            console.log(error);
        }
});

var ProductSold = SupplyChain.productSold();
ProductSold.watch(function(error, result){
    if (!error)
        {
            console.log(result);
        } else {
            console.log(error);
        }
});

function showDetails(p){
    $('#address').text(p.add);
    $('#pid').text(p.pid);formAddress
    $('#name').text(p.name);
    $('#company').text(p.company);
    $('#dd').text(p.dd);
    $('#mm').text(p.mm);
    $('#yyyy').text(p.yyyy);
    $('#place').text(p.place);
    $('#status').text(p.status);
    $('#events').text(p.events);
}

$("#formRegisterProductSubmit").click(function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {dd = '0'+dd;} 
    if(mm<10) {mm = '0'+mm;} 

    var _add = $("#formAddress").val();
    var _name = $("#formName").val();
    var _company = $("#formCompany").val();
    var _dd = dd;
    var _mm = mm;
    var _yyyy = yyyy;
    var _place = $("#formPlace").val();
    var _lat = "0x37352e3635343369"
    var _lon = "0x37352e3635343369"
    registerProduct(_add, _name, _company, _dd, _mm, _yyyy, _place, _lat, _lon);
});

$("#formSellProductSubmit").click(function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {dd = '0'+dd;} 
    if(mm<10) {mm = '0'+mm;} 

    var _add = web3.eth.defaultAccount;
    var _pid = $("#formSellPID").val();
    var _dd = dd;
    var _mm = mm;
    var _yyyy = yyyy;
    var _lat = "0x37352e3635343369"
    var _lon = "0x37352e3635343369"

    sellProduct(_add, _pid, _dd, _mm, _yyyy, _lat, _lon);
});

$("#btnGetProductDetails").click(function(){
    getProductDetails($("#getDetailsPID").val());
});

$("#btnGetPIDLength").click(function(){
    getPIDLength();
});

$("#btnGetAllPID").click(function(){
    getAllPID();
});

$("#btnCheckPID").click(function(){
    checkPID($("#checkPID").val());
});

function registerProduct(_add, _name, _company, _dd, _mm, _yyyy, _place, _lat, _lon){
    SupplyChain.registerProduct(_add, _dd, _mm, _yyyy, _company, _name, _place, _lat, _lon, function(error, result) {
        if (!error) {
                console.log(result);
        } else
                console.log(error);
    });
}

function sellProduct(_add, _pid, _dd, _mm, _yyyy, _lat, _lon){
    SupplyChain.registerProduct(_add, _pid, _dd, _mm, _yyyy, _lat, _lon, function(error, result) {
        if (!error) {
                console.log(result);
        } else
                console.log(error);
    });
}

function getProductDetails(_pid){
    SupplyChain.getProductDetails(_pid, function(error, result) {
        if (!error) {
                console.log(result);
        } else
                console.log(error);
    });
}

function getPIDLength(){
    SupplyChain.getPIDLength(function(error, result) {
        if (!error) {
                console.log(result);
                $("#getPIDLength").text(result.c);
        } else
                console.log(error);
    });
}

function getAllPID(){
    SupplyChain.getAllPID(function(error, result) {
        if (!error) {
                console.log(result);
                var i=0;
                for(i=0; i<result.length;i++){
                    $("#allPIDList").append('<li>' + result[i] + '</li>');
                }
        } else
                console.log(error);
    });
}

function checkPID(_pid){
    SupplyChain.isValidPID(_pid, function(error, result) {
        if (!error) {
                console.log(result);
        } else
                console.log(error);
    });
}