import * as dotEnv from 'dotenv';
import * as fs from 'fs';

const envparser = () => {
  let envPath = '.env.example';

  if (process.env.NODE_ENV === 'development') {
    if (fs.existsSync('.env.dev')) envPath = '.env.dev';
  } else if (process.env.NODE_ENV === 'production') {
    if (fs.existsSync('.env.prod')) envPath = '.env.prod';
  }

  const parsedEnv = dotEnv.config({ path: envPath }).parsed || {};

  return parsedEnv;
};

export default envparser;
