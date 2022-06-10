import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {ManualApprovalStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
//import { MyPipelineAppStage } from '../stage;
import { pipeline } from 'stream';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CiCdAwsPipelineDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new CodePipeline(this,'Pipeline',{
      pipelineName: 'testPipeline',
      synth:  new ShellStep('Synth',{
        input:CodePipelineSource.gitHub('NZgithuib/ci-cd-aws-pipeline-demo','main'),
        commands: ['npm ci', 
                  'npm run build',
                  'npx cdk synth']
      }),
    });
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CiCdAwsPipelineDemoQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
