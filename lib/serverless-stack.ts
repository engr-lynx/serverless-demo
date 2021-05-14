import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-ecr';
import { DockerImageFunction, DockerImageCode } from '@aws-cdk/aws-lambda';
import { AuthorizationType } from '@aws-cdk/aws-apigateway';
import { ApiGatewayToLambda } from '@aws-solutions-constructs/aws-apigateway-lambda';

export interface ServerlessProps extends StackProps {
  imageRepoName: string,
}

export class ServerlessStack extends Stack {

  constructor(scope: Construct, id: string, serverlessProps: ServerlessProps) {
    super(scope, id, serverlessProps);
    const imageRepo = Repository.fromRepositoryName(this, 'ImageRepo', serverlessProps.imageRepoName);
    const lambdaImage = DockerImageCode.fromEcr(imageRepo);
    const lambdaObj = new DockerImageFunction(this, 'LambdaObj', {
      code: lambdaImage,
    });
    const methodOpts = {
      // ToDo: change type to custom or Cognito once the auth mechanism is added
      authorizationType: AuthorizationType.NONE,
    };
    const apiGatewayProps = {
      defaultMethodOptions: methodOpts,
    }
    new ApiGatewayToLambda(this, 'Serverless', {
      existingLambdaObj: lambdaObj,
      apiGatewayProps,
    });
  }

}
