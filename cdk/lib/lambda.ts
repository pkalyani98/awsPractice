import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import * as sns from 'aws-cdk-lib/aws-sns';
import * as cdk from 'aws-cdk-lib';
import path = require("path");


export class Lambda extends NodejsFunction{
    constructor(scope: Construct, fileName: string, myTopic:cdk.aws_sns.Topic){
        super(scope,fileName,{
            architecture: Architecture.ARM_64,
            runtime: Runtime.NODEJS_14_X,
            entry: path.join(__dirname,`../backend/lambda/${fileName}.ts`),
            logRetention: RetentionDays.ONE_DAY,
            environment: {SNS_ARN: myTopic.topicArn,}
        })
       
    }
    

}