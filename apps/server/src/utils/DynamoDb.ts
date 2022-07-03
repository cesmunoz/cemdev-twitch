import {
  DeleteItemInput,
  DocumentClient,
  GetItemInput,
  PutItemInput,
  QueryInput,
  UpdateItemInput,
} from 'aws-sdk/clients/dynamodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new DocumentClient({
  accessKeyId: process.env.DB_ACCESS_KEY,
  secretAccessKey: process.env.DB_SECRET_KEY,
  region: process.env.REGION,
});

const TABLE_NAME = process.env.DB_TABLE || 'CEMDEV';

// export default {
//   get: (params: GetItemInput) =>
//     client
//       .get({
//         ...params,
//         TableName: TABLE_NAME,
//       })
//       .promise(),
//   put: (params: PutItemInput) =>
//     client
//       .put({
//         ...params,
//         TableName: TABLE_NAME,
//       })
//       .promise(),
//   query: (params: any) =>
//     client
//       .query({
//         ...params,
//         TableName: TABLE_NAME,
//       })
//       .promise(),
//   update: (params: UpdateItemInput) =>
//     client
//       .update({
//         ...params,
//         TableName: TABLE_NAME,
//       })
//       .promise(),
//   delete: (params: DeleteItemInput) =>
//     client
//       .delete({
//         ...params,
//         TableName: TABLE_NAME,
//       })
//       .promise(),
//   insert: (model: PutItemInput) => {
//     const params = {
//       TableName: TABLE_NAME,
//       Item: model,
//       ConditionExpression:
//         'attribute_not_exists(PK) AND attribute_not_exists(SK)',
//       ReturnValues: 'ALL_OLD',
//     };
//     return client.put(params).promise();
//   },
// };

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
