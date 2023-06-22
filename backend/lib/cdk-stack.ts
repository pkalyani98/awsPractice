import * as cdk from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { ApiGateway } from './ApiGateway';
import { Lambda } from './lambda';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as iam from 'aws-cdk-lib/aws-iam';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const myTopic = new sns.Topic(this, 'MyTopic');
    const api = new ApiGateway(this);
    const postLambda = new Lambda(this, 'post', myTopic);
    myTopic.addSubscription(new subscriptions.EmailSubscription('pkalyani@buffalo.edu'));
    const snsTopicPolicy = new iam.PolicyStatement({
      actions: ['sns:publish'],
      resources: ['*'],
    });
    myTopic.grantPublish(postLambda);
    postLambda.addToRolePolicy(snsTopicPolicy);
    api.postIntegration('POST', '/post', postLambda);
  }
}
