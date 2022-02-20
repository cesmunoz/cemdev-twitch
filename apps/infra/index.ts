import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const dynamoDBTable = new aws.dynamodb.Table("CEMDEV", {
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
  billingMode: "PROVISIONED",
  hashKey: "PK",
  rangeKey: "SK",
  globalSecondaryIndexes: [
    {
      name: "ReverseIndex",
      hashKey: "SK",
      rangeKey: "PK",
      projectionType: "ALL",
      readCapacity: 10,
      writeCapacity: 10,
    },
  ],
  writeCapacity: 20,
  readCapacity: 20,
  tags: {
    Environment: "production",
    Name: "cemdev-twitch",
  },
  ttl: {
    attributeName: "ttl",
    enabled: true,
  },
});

const size = "t2.micro";     // t2.micro is available in the AWS free tier
const ami = aws.getAmiOutput({
    filters: [{
        name: "name",
        values: ["amzn-ami-hvm-*"],
    }],
    owners: ["137112412989"], // This owner ID is Amazon
    mostRecent: true,
});

const group = new aws.ec2.SecurityGroup("webserver-secgrp", {
    ingress: [
        { protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: ["0.0.0.0/0"] },
    ],
});

const server = new aws.ec2.Instance("cemdevbot", {
    instanceType: size,
    vpcSecurityGroupIds: [ group.id ], // reference the security group resource above
    ami: ami.id,
});

export const publicIp = server.publicIp;
export const publicHostName = server.publicDns;
export const dynamoTableArn = dynamoDBTable.arn;

