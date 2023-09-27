'use strict';

const AWS = require('aws-sdk');

module.exports.createCustomer = async (event) => {
    const params = {};
    if (process.env.IS_OFFLINE) {
        params.region = 'localhost';
        params.endpoint = 'http://localhost:3000/customer';
    }

    const { dni, name } = JSON.parse(event.body); // desestructuracion del cuerpo de la peticion
    const dynamoDb = new AWS.DynamoDB.DocumentClient(params); //conexion al documento

    const putParams = {
        TableName: process.env.DYNAMODB_CUSTOMER_TABLE, // tabla desde variable de entorno
        Item: {
            dni,
            name
        },
    };
    await dynamoDb.put(putParams).promise();
    return {
        statusCode: 201,
        body: JSON.stringify(putParams.Item),
    };
};