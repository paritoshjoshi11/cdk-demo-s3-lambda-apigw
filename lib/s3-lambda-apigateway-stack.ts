import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';


export class S3LambdaApigatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // s3 bucket stack
    const balance = new s3.Bucket(this,"balance_bucket",{
      bucketName:"balance-yuzen",
    })
    // IAM role
    const myiam = new iam.Role(this,"iambalance",{
      roleName: "balamceLambdaRole",
      description: " role for accesing s3 bucket from lamda function",
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),  //which service or entity can use this IAM role
    })
    myiam.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));

    // Lambda Function
    const mylambda = new lambda.Function(this, "s3Lambda",{
      functionName: "balance-lambda",
      handler: 'lambda_function.lambda_handler',
      runtime: lambda.Runtime.PYTHON_3_10,
      code:lambda.Code.fromAsset('./services/'),
      role: myiam
    })

   
  }
}
