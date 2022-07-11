import * as aws from "@pulumi/aws";

const buildDynamoTable = (table: string, environment: string) => {
  const tableName = table.toUpperCase();

  return new aws.dynamodb.Table(
    `${tableName}${environment === "production" ? "" : "-DEV"}`,
    {
      name: tableName,
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
      ttl: {
        attributeName: "ttl",
        enabled: false,
      },
    }
  );
};

const dynamoDbTableProd = buildDynamoTable("CEMDEV", "production");
const dynamoDbTableDev = buildDynamoTable("CEMDEV", "development");

export const dynamoDbTableProdArn = dynamoDbTableProd.arn;
export const dynamoDbTableDevArn = dynamoDbTableDev.arn;
