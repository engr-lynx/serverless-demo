#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { ServerlessStack } from '../lib/serverless-stack';

const app = new App();
const stackId = app.node.tryGetContext('stackId');  
const imageRepoName = app.node.tryGetContext('imageRepoName');
new ServerlessStack(app, stackId, {
  imageRepoName,
});
