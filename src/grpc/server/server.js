const PROTO_PATH = '../../../protos/list.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const customersProto = grpc.loadPackageDefinition(packageDefinition);

// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');

const grpcServer = new grpc.Server();
const customers = [
    {
        id: '34415c7c-f82d-4e44-88ca-ae2a1aaa92we',
        name: 'Mehedi Hasan',
        age: 25,
        address: 'Dhaka, Bangladesh',
    },
    {
        id: '34415c7c-f82d-4e44-88ca-ae2a1aaa92qw',
        name: 'Orangetoolz',
        age: 25,
        address: 'Uttara,Dhaka, Bangladesh',
    },
    {
        id: '34415c7c-f82d-4e44-88ca-ae2a1aaa92qw',
        name: 'Earn 5 star',
        age: 25,
        address: 'Uttara,Dhaka, Bangladesh',
    },
];

grpcServer.addService(customersProto.CustomerService.service, {
    getAll: (_, callback) => {
        console.log(callback, 'callback in get all');
        callback(null, { customers });
    },

    get: (call, callback) => {
        const customer = customers.find((n) => {
            return n.id === call.request.id;
        });

        if (customer) {
            callback(null, customer);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Not found',
            });
        }
    },

    insert: (call, callback) => {
        const customer = call.request;

        customer.id = uuidv4();
        customers.push(customer);
        callback(null, customer);
    },

    update: (call, callback) => {
        const existingCustomer = customers.find((n) => {
            return n.id === call.request.id;
        });

        if (existingCustomer) {
            existingCustomer.name = call.request.name;
            existingCustomer.age = call.request.age;
            existingCustomer.address = call.request.address;
            callback(null, existingCustomer);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Not found',
            });
        }
    },

    remove: (call, callback) => {
        const existingCustomerIndex = customers.findIndex((n) => {
            return n.id === call.request.id;
        });

        if (existingCustomerIndex !== -1) {
            customers.splice(existingCustomerIndex, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Not found',
            });
        }
    },
});

grpcServer.bind('127.0.0.1:30050', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://127.0.0.1:30050');
grpcServer.start();
