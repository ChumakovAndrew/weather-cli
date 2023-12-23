import { homedir } from "os";
import { promises, existsSync } from "fs"
import { join } from "path";

const {writeFile, mkdir, readFile} = promises

const pathCliDir = join(homedir(), '/AppData/Local/weather_cli');
const filePath = join(pathCliDir, 'weather_data.json')



const saveKeyValue = async (key, value) => {
    let data = {}

    if(existsSync(filePath)){
        const file = await readFile(filePath);
        data = JSON.parse(file);
        data[key] = value;
        await writeFile(filePath, JSON.stringify(data));
    }else{
        data[key] = value;
        createFile(pathCliDir, filePath, data);
    }
}

const getKeyValue = async (key) => {
    if(existsSync(filePath)){
        const file = await readFile(filePath);
        data = JSON.parse(file);
        return data[key]
    } else {
        return undefined
    }
}

const createFile = async (pathDir, filePath, data) => {
    await mkdir(pathDir, { recursive: true });
    await writeFile(filePath, JSON.stringify(data));
}

export {saveKeyValue, getKeyValue}