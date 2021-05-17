#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { ServerlessStack } from '../lib/serverless-stack';

const app = new App();
// using VPC from another app needs the environment to be set explicitly
const appEnv = {
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
};
const stackId = app.node.tryGetContext('stackId');  
const repoName = app.node.tryGetContext('repoName');
const vpcId = app.node.tryGetContext('vpcId');
new ServerlessStack(app, stackId, {
  repoName,
  vpcId,
  env: appEnv,
});
