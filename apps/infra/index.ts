import * as aws from "@pulumi/aws";

const buildDynamoTable = (table: string, environment: string) => {
  const tableName = table.toUpperCase();
  const environmentName = environment === "production" ? "" : "-DEV";

  return new aws.dynamodb.Table(`${tableName}${environmentName}`, {
    name: `${tableName}${environmentName}`,
    attributes: [
      {
        name: "PK",
        type: "S",
      },
      {
        name: "SK",
        type: "S",
      },
    ],
    hashKey: "PK",
    rangeKey: "SK",
    globalSecondaryIndexes: [
      {
        hashKey: "SK",
        rangeKey: "PK",
        name: "ReverseIndex",
        projectionType: "ALL",
        readCapacity: 1,
        writeCapacity: 1,
      },
    ],
    readCapacity: 1,
    writeCapacity: 1,
    billingMode: "PROVISIONED",
    tags: {
      Environment: environment,
      Name: tableName,
    },
  });
};

const dynamoDbTableProd = buildDynamoTable("CEMDEV", "production");
const dynamoDbTableDev = buildDynamoTable("CEMDEV", "development");

export const dynamoDbTableProdArn = dynamoDbTableProd.arn;
export const dynamoDbTableDevArn = dynamoDbTableDev.arn;
