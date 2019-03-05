import TestModel, {Address} from '../../src/service/TestModel';

window.TestModel = TestModel;
window.test = new TestModel();
window.test.id = 2;

let t = window.test;

t.firstName = "Matthew";
t.lastName = "Shockman";
t.color = "pink";
t.description = "Test";
t.addresses = [];

for(let i = 0; i < 10; i++) {
    let address = new Address();
    address.firstName = "Matthew";
    address.lastName = "Shockman";
    address.addressLine1 = `Test Addres ${i+1}`;
    address.addressLine2 = `APT ${(i+1)*100}`;
    address.addressLine3 = '';
    address.city = "LaMoure";
    address.state = "ND";
    address.phone = '8675409';
    address.id = (i+1);
    address.zip = "58458";
    t.addresses.push(address);
}