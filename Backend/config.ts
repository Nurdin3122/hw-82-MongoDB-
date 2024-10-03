import path from "path";
const rootPath = __dirname;
import {CorsOptions} from "cors";


const corsWhiteList =  ['http//:localhost:5173']

const corsOption:CorsOptions = {
    origin:(origin,callback) => {
        if(!origin || corsWhiteList.indexOf(origin) !== -1) {
            callback(null,true);
        } else {
            callback(new Error("Not allowed by cors"));
        }
    }
}

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    corsOption,
    db: 'mongodb://localhost/music'
};
export default config;