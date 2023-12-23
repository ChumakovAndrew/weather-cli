#!/usr/bin/env node

import { getArgs } from "./helpers/args.js"
import { printHelp, printError, printSuccess } from "./services/log.service.js"
import { saveKeyValue } from "./services/storage.sevice.js"
import { getWeather } from "./services/api.service.js"
import { CLI_KEYS_DICTIONARY } from "./src/key_dictionary.js"



async function saveToken (token) {
    if(!token.length){
        printError("не передан токен")
        return
    }
    try {
        await saveKeyValue(CLI_KEYS_DICTIONARY.token, token);
		printSuccess('Токен сохранён');
    } catch (error) {
        printError(error.message);
    }
}

function initCli () {
    const args = getArgs(process.argv)
    if(Object.keys(args).length == 0){
        getWeather('Kiev')
        return null
    }

    if(args.h) {
        printHelp()
    }
    else if(args.t){
        return saveToken(args.t)
    }
    else if(args.g){
        
    }else{
        console.log("Вы ввели не валидные аргументы.")
    }
}

initCli()