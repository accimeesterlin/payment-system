// Example of calling SecureNet Charge API from Node
var https = require('https');
var secureNetId = '8011192'; // Replace with your own ID
var secureKey = 'RAiN795RkW5K'; // Replace with your own Key

// addCust();

// getCust();

// runReport();

//adding a new customer
function addCust() {
    var customer = {
        firstName: 'Test',
        lastName: 'Tester',
        phoneNumber: '512-122-1211',
        emailAddress: 'some@emailaddress.com',
        sendEmailReceipts: true,
        notes: 'This is test notes',
        address: {
            line1: '123 Main St.',
            city: 'Austin',
            state: 'TX',
            zip: '78759'
        },
        company: 'Test company',
        userDefinedFields: [
            // {
            //     udfname: 'udf1',
            //     udfvalue: 'udf1_value'
            // },
            // {
            //     udfname: 'udf2',
            //     udfvalue: 'udf2_value'
            // },
            // {
            //     udfname: 'udf3',
            //     udfvalue: 'udf3_value'
            // },
            // {
            //     udfname: 'udf4',
            //     udfvalue: 'udf4_value'
            // },
        ],
        developerApplication: {
            developerId: 12345678,
            version: '1.2'
        }
    };

    var json = JSON.stringify(customer);                      // Convert to JSON string
    var options = {                                         // HTTP call options
        host: 'gwapi.demo.securenet.com',                     // Host address
        port: 443,                                            // SSL port
        path: '/api/Customers',                         // Path for charge API
        method: 'POST',                                       // HTTP POST request
        headers: {                                            // HTTP headers
            'Content-Type': 'application/json',                 // Body is JSON
            'Content-Length': Buffer.byteLength(json, 'utf8'),  // Necessary!
            'Authorization': 'Basic ' + new Buffer(secureNetId + ':' + secureKey).toString('base64')
        }
    };

    var req = https.request(options, function (res) {        // New request, with callback
        var body = '';                                        // Place for response body
        res.on('data', function (d) {
            body += d;
        });           // Collect response body data
        res.on('end', function () {                           // Act when call is complete
            var r = JSON.parse(body);                           // Convert string to object
            console.log(r);
            // console.log("http response code: ", res.statusCode);
            // console.log("success: " + r.success);
            // console.log("result: " + r.result);
            // console.log("message: " + r.message);
            // console.log("transactionId: " + r.transaction.transactionId);
        });
    });

    req.on('error', function (e) {
        console.error(e);
    });     // Handle connection errors
    req.write(json);                                        // Make the call
    req.end();
}

//set parameter that takes the customer id
function getCust() {
    var customerID = 5001001;

    // var json = JSON.stringify(customer);                      // Convert to JSON string
    var options = {                                         // HTTP call options
        host: 'gwapi.demo.securenet.com',                     // Host address
        port: 443,                                            // SSL port
        path: '/api/Customers/' + customerID,                         // Path for charge API
        method: 'GET',                                       // HTTP POST request
        headers: {                                            // HTTP headers
            'Content-Type': 'application/json',                 // Body is JSON
            'Authorization': 'Basic ' + new Buffer(secureNetId + ':' + secureKey).toString('base64')
        }
    };

    var req = https.request(options, function (res) {        // New request, with callback
        var body = '';                                        // Place for response body
        res.on('data', function (d) {
            body += d;
        });           // Collect response body data
        res.on('end', function () {                           // Act when call is complete
            var r = JSON.parse(body);                           // Convert string to object
            console.log(r);
            // console.log("http response code: ", res.statusCode);
            // console.log("success: " + r.success);
            // console.log("result: " + r.result);
            // console.log("message: " + r.message);
            // console.log("transactionId: " + r.transaction.transactionId);
        });
    });

    req.on('error', function (e) {
        console.error(e);
    });     // Handle connection errors
    // req.write(json);                                        // Make the call
    req.end();
}

// can add parameters to set the date range
function runReport() {
    var query = {
        startDate: '11/01/2017',
        endDate: '11/11/2017',
        developerApplication: {
            developerId: 12345678,
            version: '1.2'
        }
    };

    var json = JSON.stringify(query);                      // Convert to JSON string
    var options = {                                         // HTTP call options
        host: 'gwapi.demo.securenet.com',                     // Host address
        port: 443,                                            // SSL port
        path: '/api/transactions/Search',                         // Path for charge API
        method: 'POST',                                       // HTTP POST request
        headers: {                                            // HTTP headers
            'Content-Type': 'application/json',                 // Body is JSON
            'Content-Length': Buffer.byteLength(json, 'utf8'),  // Necessary!
            'Authorization': 'Basic ' + new Buffer(secureNetId + ':' + secureKey).toString('base64')
        }
    };

    var req = https.request(options, function (res) {        // New request, with callback
        var body = '';                                        // Place for response body
        res.on('data', function (d) {
            body += d;
        });           // Collect response body data
        res.on('end', function () {                           // Act when call is complete
            var r = JSON.parse(body);                           // Convert string to object
            console.log(r.transactions[0]);
            // console.log("http response code: ", res.statusCode);
            // console.log("success: " + r.success);
            // console.log("result: " + r.result);
            // console.log("message: " + r.message);
            // console.log("transactionId: " + r.transaction.transactionId);
        });
    });

    req.on('error', function (e) {
        console.error(e);
    });     // Handle connection errors
    req.write(json);                                        // Make the call
    req.end();
}


//need to pass a few parameters like name amaout etc
function cardnoPresent () {
    var charge = {
        amount: 8.00,
        card: {
            number: '4111111111111111',
            cvv: '123',
            expirationDate: '07/2018',
            address: {
                company: 'Nov8 Inc',
                line1: '123 Main St.',
                city: 'Austin',
                state: 'TX',
                zip: '78759'
            }
        },
        extendedInformation: {
            typeOfGoods: 'PHYSICAL'
        },
        developerApplication: {
            developerId: 12345678,
            version: '1.2'
        }
    };

    var json = JSON.stringify(charge);                      // Convert to JSON string
    var options = {                                         // HTTP call options
        host: 'gwapi.demo.securenet.com',                     // Host address
        port: 443,                                            // SSL port
        path: '/api/Payments/Authorize',                         // Path for charge API
        method: 'POST',                                       // HTTP POST request
        headers: {                                            // HTTP headers
            'Content-Type': 'application/json',                 // Body is JSON
            'Content-Length': Buffer.byteLength(json, 'utf8'),  // Necessary!
            'Authorization': 'Basic ' + new Buffer(secureNetId + ':' + secureKey).toString('base64')
        }
    };

    var req = https.request(options, function(res) {        // New request, with callback
        var body = '';                                        // Place for response body
        res.on('data', function(d) { body += d; });           // Collect response body data
        res.on('end', function () {                           // Act when call is complete
            var r = JSON.parse(body);                           // Convert string to object
            console.log(r);
            // console.log("http response code: ", res.statusCode);
            // console.log("success: " + r.success);
            // console.log("result: " + r.result);
            // console.log("message: " + r.message);
            // console.log("transactionId: " + r.transaction.transactionId);
        });
    });

    req.on('error', function(e) { console.error(e); });     // Handle connection errors
    req.write(json);                                        // Make the call
    req.end();

}