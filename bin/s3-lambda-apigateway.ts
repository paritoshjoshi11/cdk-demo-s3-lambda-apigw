#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3LambdaApigatewayStack } from '../lib/s3-lambda-apigateway-stack';

const app = new cdk.App();
new S3LambdaApigatewayStack(app, 'S3LambdaApigatewayStack', {

});