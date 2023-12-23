#!/usr/bin/env node

import { getArgs } from "./helpers/args.js"
import { printHelp, printError, printSuccess } from "./services/log.service.js"
import { saveKeyValue } from "./services/storage.sevice.js"

async function saveToken (token) {
    try {
        await saveKeyValue("token", token);
		printSuccess('Токен сохранён');
    } catch (error) {
        printError(error.message);
    }
}

function initCli () {
    const args = getArgs(process.argv)
    if(Object.keys(args).length == 0){
        console.log("Вы не ввели никаких аргументов.")
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