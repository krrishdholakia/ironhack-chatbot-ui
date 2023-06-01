import Bugsnag from '@bugsnag/js';

export function start() {
  if (process.env.NEXT_PHASE !== 'phase-production-build') {
    if (process.env.NEXT_IS_SERVER === true) {
      Bugsnag.start({
        apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
        appVersion: process.env.NEXT_BUILD_ID,
        // @bugsnag/plugin-aws-lambda must only be imported on the server
        plugins: [require('@bugsnag/plugin-aws-lambda')],
      });
    }
  }
}

export function getServerlessHandler() {
  return Bugsnag.getPlugin('awsLambda').createHandler();
}
