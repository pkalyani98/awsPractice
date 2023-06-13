import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SNSClient } from '@aws-sdk/client-sns';
import { PublishCommand } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({ region: 'us-east-1' });

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const params = {
    Message:
      'This is an AWS service on east coast server saying that Prashant is an idiot and he will never repeat this. Please forgive him for what he did. He is a dumbass and we are sorry for his childish behaviour',
    TopicArn: process.env.SNS_ARN,
  };
  console.log(params);
  console.log('Inside the lamda');
  try {
    const data = await snsClient.send(new PublishCommand(params));
    console.log('Success.', data);
    // For unit tests.
  } catch (err: any) {
    console.log('Error', err.stack);
  }
  return {
    body: 'DONE',
    statusCode: 200,
  };
};
