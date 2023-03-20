import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import * as sns from 'aws-cdk-lib/aws-sns';
import * as cdk from 'aws-cdk-lib';
import path = require("path");
import {SNS} from "aws-sdk";
import AWS = require("aws-sdk");


const lamda_sns = new SNS();

export class Lambda extends NodejsFunction{
    constructor(scope: Construct, fileName: string, myTopic:cdk.aws_sns.Topic){
        super(scope,fileName,{
            architecture: Architecture.ARM_64,
            runtime: Runtime.NODEJS_14_X,
            entry: path.join(__dirname,`../backend/lambda/${fileName}.ts`),
            logRetention: RetentionDays.ONE_DAY,
            environment: {'SNS_ARN': myTopic.topicArn,}
        })
        let params = {
            Message : 'Email for your subscription',
            TopicArn : myTopic.topicArn,
        }

        var publishTextPromise = new AWS.SNS().publish(params).promise();
        publishTextPromise.then(
                function(data) {
                    console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
                    console.log("MessageID is " + data.MessageId);
                }).catch(
                    function(err) {
                    console.error(err, err.stack);
  });
    }
    

}