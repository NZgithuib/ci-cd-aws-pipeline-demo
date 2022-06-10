import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Function, InlineCode, Runtime,Code } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyLambdaStack extends Stack {
  constructor(scope: Construct, id: string, stageName: string, props?: StackProps) {
    super(scope, id, props);
    new Function(this,'LambdaFunction',{
      runtime: Runtime.NODEJS_12_X,
      handler:  'handler.handler',
      code : Code.fromAsset(path.join(__dirname, 'lambda')),  //resolving to ./lambda        
      environment: { "StageName": stageName}
    });
  }
}
