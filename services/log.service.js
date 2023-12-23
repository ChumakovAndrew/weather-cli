import chalk from 'chalk';
import dedent from "dedent";

const {bgRed, bgGreen, bgCyan} = chalk

const printError = (error) => {
    console.log(bgRed('Error') + " " + error)
}

const printSuccess = (message) => {
	console.log(bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
	console.log(
		dedent`${bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`
	);
};

export {printError, printHelp, printSuccess}