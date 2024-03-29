import aws from 'aws-sdk';

const client = new aws.DynamoDB.DocumentClient({
  accessKeyId: process.env.DB_ACCESS_KEY,
  secretAccessKey: process.env.DB_SECRET_KEY,
  region: process.env.REGION,
});

const TABLE_NAME = process.env.DB_TABLE;
const buildParameters = (params: any) => ({
  TableName: TABLE_NAME,
  ...params,
});

export default {
  get: (params: any) => client.get(buildParameters(params)).promise(),
  put: (params: any) => client.put(buildParameters(params)).promise(),
  query: (params: any) => client.query(buildParameters(params)).promise(),
  update: (params: any) => client.update(buildParameters(params)).promise(),
  delete: (params: any) => client.delete(buildParameters(params)).promise(),
  insert: (model: any) => {
    const params = {
      Item: model,
      ConditionExpression:
        'attribute_not_exists(PK) AND attribute_not_exists(SK)',
      ReturnValues: 'ALL_OLD',
    };
    return client.put(buildParameters(params)).promise();
  },
};
