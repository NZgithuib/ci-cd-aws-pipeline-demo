import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {ManualApprovalStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stage';
import { pipeline } from 'stream';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CiCdAwsPipelineDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline= new CodePipeline(this,'Pipeline',{
      pipelineName: 'testPipeline',
      synth:  new ShellStep('Synth',{
        input:CodePipelineSource.gitHub('NZgithuib/ci-cd-aws-pipeline-demo','main'),
        commands: ['npm ci', 
                  'npm run build',
                  'npx cdk synth']
      }),
    });
  
  const testStage =pipeline.addStage (new MyPipelineAppStage(this, "test", {
      env: {
        account: '088857552342',
        region: 'ap-southeast-2'
      }  
    })
  )
  testStage.addPost(new ManualApprovalStep(" Manual Approal Before Production"));
  
  const prodStage =pipeline.addStage (new MyPipelineAppStage(this, "prod", {
    env: {
      account: '088857552342',
      region: 'ap-southeast-2'
    }  
  })
)

  }

}
