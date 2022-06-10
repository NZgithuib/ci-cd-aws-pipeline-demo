import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {MyLambdaStack } from './lambda-stack';
import * as path from 'path';
import { CfnDisk } from 'aws-cdk-lib/aws-lightsail';

export class MyPipelineAppStage extends cdk.Stage {
    constructor (scope:Construct, stageName: string, props?: cdk.StageProps){
        super(scope,stageName,props);
        const lmabdaStack= new MyLambdaStack(this, 'lambdaStack', stageName);
    }
}