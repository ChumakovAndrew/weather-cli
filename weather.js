#!/usr/bin/env node
import axios from 'axios';
import dedent from "dedent";
import PromptSync from 'prompt-sync';

import { getArgs } from "./helpers/args.js"
import { printHelp, printError, printSuccess, printWeather } from "./services/log.service.js"
import { saveKeyValue, getKeyValue } from "./services/storage.sevice.js"
import { getWeather, getIcon } from "./services/api.service.js"
import { CLI_KEYS_DICTIONARY } from "./src/key_dictionary.js"

const prompt = PromptSync()

const saveToken = async (token) => {
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

const saveCity = async (city) => {
    if(!city.length){
        printError("Город не указан")
    }

    try {
        await saveKeyValue(CLI_KEYS_DICTIONARY.city, city);
		printSuccess('Город сохранён');
    } catch (error) {
        printError(error.message);
    }
}

const autoSetCity = async () => {
    const {data} = await axios.get("https://ipinfo.io")
    saveCity(data.city)
}



const getForcast = async () => {
	try {
        const token = await getKeyValue(CLI_KEYS_DICTIONARY.token)

        if(!token){
            printError('Не задан ключ API, задайте его через команду -t [API_KEY]') 
            return
        }

		const city = await getKeyValue(CLI_KEYS_DICTIONARY.city);

        if(!city){
            printError(dedent`
                    Город не задан, вы можете:
                    задать автоматически - "y",
                    задать вручную - "n"`
            );
            const answer = prompt('>> ')
            if(answer === "y") {
                return autoSetCity();
            }else {
                console.log("Задайте город при помощи команды -c [city]")
                return
            }
        }

		const weather = await getWeather(city, token);
		printWeather(weather, getIcon(weather.weather[0].icon))
	} catch (e) {
		if (e?.response?.status == 404) {
			printError('Неверно указан город');
		} else if (e?.response?.status == 401) {
			printError('Неверно указан токен');
		} else {
			printError(e.message);
		}
	}
}

function initCli () {
    const args = getArgs(process.argv)
    if(Object.keys(args).length == 0){
        getForcast()
        return
    }

    if(args.h) {
        printHelp()
    }
    else if(args.t){
        return saveToken(args.t)
    }
    else if(args.c){
        return saveCity(args.c)
    }else{
        printError("Вы ввели не известные аргументы")
    }
}

initCli()