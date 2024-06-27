import path from 'path';

const envFileMapping = {
    development: path.resolve('config/', '.env.development'),
    production: path.resolve('config/', '.env.production'),
};

export default envFileMapping;
