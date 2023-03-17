import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";


export const handler = async(event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    console.log("Post Requested",event)
    return{
        body : JSON.stringify(event.body),
        statusCode : 200
    }
}