import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const dynamoDbTableProd = new aws.dynamodb.Table("CEMDEV", {
  name: "CEMDEV",
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
      readCapacity: 10,
      writeCapacity: 10,
    },
  ],
  readCapacity: 20,
  writeCapacity: 20,
  billingMode: "PROVISIONED",
  tags: {
    Environment: "production",
    Name: "CEMDEV",
  },
  ttl: {
    attributeName: "ttl",
    enabled: false,
  },
});

const dynamoDbTableDev = new aws.dynamodb.Table("CEMDEV-DEV", {
  name: "CEMDEV-DEV",
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
      readCapacity: 10,
      writeCapacity: 10,
    },
  ],
  readCapacity: 20,
  writeCapacity: 20,
  billingMode: "PROVISIONED",
  tags: {
    Environment: "production",
    Name: "CEMDEV",
  },
  ttl: {
    attributeName: "ttl",
    enabled: false,
  },
});

export const dynamoDbTableProdArn = dynamoDbTableProd.arn;
export const dynamoDbTableDevArn = dynamoDbTableDev.arn;
