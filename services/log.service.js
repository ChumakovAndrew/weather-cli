import chalk from 'chalk';
import dedent from "dedent";
import moment from 'moment';

const {bgRed, bgGreen, bgCyan, bgYellow} = chalk;

const printError = (error) => {
    console.log(bgRed('Error') + " " + error);
};

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

const printWeather = (res, icon) => {
	const sunrise = moment.unix(res.sys.sunrise)
	const sunset = moment.unix(res.sys.sunset)
	
	console.log(
		dedent`${bgYellow(' WEATHER ')} Погода в городе ${res.name}
		${icon} ${res.weather[0].description}
		Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}
		Восход солнца: ${sunrise.format("HH:mm")}
		Закат солнца: ${sunset.format('HH:mm')}
		`
	);
};

export {printError, printHelp, printSuccess, printWeather}