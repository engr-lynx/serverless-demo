import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';
import { ServerlessStack } from '../lib/serverless-stack';

test('Empty Stack', () => {
    const app = new App();
    // WHEN
    const stack = new ServerlessStack(app, 'ServerlessDemo');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
