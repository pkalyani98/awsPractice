import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudFront from "@aws-cdk/aws-cloudfront";
import { aws_s3_deployment } from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const bucket = new s3.Bucket(this, "CdkTestBucket",{
      publicReadAccess:true,
      websiteIndexDocument:"index.html"
    })
    new s3deploy.BucketDeployment(this, `myreactapp-s3bucketdeployment`, {
      sources: [s3deploy.Source.asset("../build")],
      destinationBucket: bucket,
    });

    const cf = new cloudFront.CloudFrontWebDistribution(this, "CDKCRAStaticDistribution", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket
          },
          behaviors: [{isDefaultBehavior: true}]
        },
      ]
    });
  }
}
