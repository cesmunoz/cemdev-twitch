import aws from 'aws-sdk';

const client = new aws.DynamoDB.DocumentClient({
  accessKeyId: process.env.DB_ACCESS_KEY,
  secretAccessKey: process.env.DB_SECRET_KEY,
  region: process.env.REGION,
});

const TABLE_NAME = process.env.DB_TABLE;
const buildParameters = (params) => {
  const parameters = {
  TableName: TABLE_NAME,
  ...params,
  };
  console.log(
    parameters
  )
  return parameters;
}; 

export default {
  get: (params) => client.get(buildParameters(params)).promise(),
  put: (params) => client.put(buildParameters(params)).promise(),
  query: (params) => client.query(buildParameters(params)).promise(),
  update: (params) => client.update(buildParameters(params)).promise(),
  delete: (params) => client.delete(buildParameters(params)).promise(),
};
