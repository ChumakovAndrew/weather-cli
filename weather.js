#!/usr/bin/env node

import { getArgs } from "./helpers/args.js"
import { printHelp, printError, printSuccess } from "./services/log.service.js"


function initCli () {
    const args = getArgs(process.argv)
    if(Object.keys(args).length == 0){
        console.log("Вы не ввели никаких аргументов.")
        return null
    }

    if(args.h) {
        printHelp()
    }
    else if(args.c){
        console.log("c")
    }
    else if(args.g){
        console.log("g")
    }else{
        console.log("Вы ввели не валидные аргументы.")
    }
}

initCli()