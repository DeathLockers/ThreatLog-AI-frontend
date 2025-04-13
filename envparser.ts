import * as dotEnv from 'dotenv';

const envparser = () => {
  let parsedEnv = dotEnv.config({ path: '.env' }).parsed!;

  if (process.env.NODE_ENV === 'development') {
    parsedEnv = dotEnv.config({ path: '.env.dev' }).parsed!;
  } else if (process.env.NODE_ENV === 'production') {
    parsedEnv = dotEnv.config({ path: '.env.prod' }).parsed!;
  }

  return parsedEnv;
};

export default envparser;
