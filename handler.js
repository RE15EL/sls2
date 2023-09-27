'use strict';
const AWS = require('aws-sdk');

module.exports.saludos = async (event) => {
  const params = {};
  if (process.env.IS_OFFLINE) {
    params.region = 'localhost';
    params.endpoint = 'http://localhost:3000';
  }
  const dynamodbClient = new AWS.DynamoDB.DocumentClient(params);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Como estas ${event.pathParameters.name}`,
      },
      null,
      2
    ),
  };

};
