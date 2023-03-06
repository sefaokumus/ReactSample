const awsConfig = {
  Auth: {
    region: process.env.REACT_APP_AUTH_REGION,     // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_AUTH_USERPOOLID,
    userPoolWebClientId: process.env.REACT_APP_AUTH_CLIENTID
  },
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_GRAPHQLENDPOINT,
  aws_appsync_region: process.env.REACT_APP_REGION,
  aws_appsync_authenticationType: process.env.REACT_APP_AUTHENTICATIONTYPE // You have configured Auth with Amazon Cognito User Pool ID and Web Client Id
}

export default awsConfig
