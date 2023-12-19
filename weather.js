#!/usr/bin/env node
import { getArgs } from "./helpers/args.js"

function initCli () {
    const args = getArgs(process.argv)
    console.log(args)
}

initCli()