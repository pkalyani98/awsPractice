import * as cdk from 'aws-cdk-lib';
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudFront from "aws-cdk-lib/aws-cloudfront";
import { aws_s3_deployment } from "aws-cdk-lib";
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from "constructs";
import { ApiGateway } from './ApiGateway';
import { Lambda } from './lambda';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as iam from 'aws-cdk-lib/aws-iam';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const myTopic = new sns.Topic(this, 'MyTopic');
    // const bucket = new s3.Bucket(this, "CdkTestBucket",{
    //   publicReadAccess:true,
    //   websiteIndexDocument:"index.html"
    // })
    // new s3deploy.BucketDeployment(this, `myreactapp-s3bucketdeployment`, {
    //   sources: [s3deploy.Source.asset("../build")],
    //   destinationBucket: bucket,
    // });
    // const cf = new cloudFront.CloudFrontWebDistribution(this, "CDKCRAStaticDistribution", {
    //   originConfigs: [
    //     {
    //       s3OriginSource: {
    //         s3BucketSource: bucket
    //       },
    //       behaviors: [{isDefaultBehavior: true}]
    //     },
    //   ]
    // });
    const api = new ApiGateway(this);
    const postLambda = new Lambda(this, "post", myTopic);
    myTopic.addSubscription(new subscriptions.EmailSubscription('pkalyani@buffalo.edu'));
    const snsTopicPolicy = new iam.PolicyStatement({
      actions: ['sns:publish'],
      resources: ['*'],
    });
    myTopic.grantPublish(postLambda);
    postLambda.addToRolePolicy(snsTopicPolicy);
    api.postIntegration("POST","/post",postLambda);
  }
}
