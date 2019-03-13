const unitTimes =[{unit:"year",value:31536000}, {unit:"day",value:86400}, {unit:"hour",value:3600 }, {unit:"minute",value:60},{unit:"second",value:1}];

function formatIntoText(aTime) {
    switch (aTime.length) {
        case 0: 
          return "none"; break;
        case 1: 
          return `${aTime[0].value} ${aTime[0].unit}`;
        case 2: 
          return `${aTime[0].value} ${aTime[0].unit} and ${aTime[1].value} ${aTime[1].unit}`;
        case 3: 
          return `${aTime[0].value} ${aTime[0].unit}, ${aTime[1].value} ${aTime[1].unit} and ${aTime[2].value} ${aTime[2].unit}`;
        case 4: 
          return `${aTime[0].value} ${aTime[0].unit}, ${aTime[1].value} ${aTime[1].unit}, ${aTime[2].value} ${aTime[2].unit} and ${aTime[3].value} ${aTime[3].unit}`;
        case 5: 
          return `${aTime[0].value} ${aTime[0].unit}, ${aTime[1].value} ${aTime[1].unit}, ${aTime[2].value} ${aTime[2].unit}, ${aTime[3].value} ${aTime[3].unit} and ${aTime[4].value} ${aTime[4].unit}`; 
    }
}

function calcTime(timeInSeconds) {

    let timeRemaining = timeInSeconds;

    function calcTimePerUnit(unitTime) {
        const newValue = Math.floor(timeRemaining/unitTime.value); 
        const newUnit = newValue > 1 ? unitTime.unit+ "s" : unitTime.unit;
        timeRemaining = timeRemaining % unitTime.value;
        return {unit:newUnit, value:newValue};
    }

    return unitTimes.map(calcTimePerUnit);
}

function formatTime(timeInSeconds) {

    function isNonZeroTime(unitTime) {
        return unitTime.value > 0;
    }

    const calcualtedUnitTimes = calcTime(timeInSeconds).filter(isNonZeroTime);
    return formatIntoText(calcualtedUnitTimes);
}

console.log(formatTime(0));
console.log(formatTime(1));
console.log(formatTime(2));
console.log(formatTime(60));
console.log(formatTime(120));
console.log(formatTime(3600));
console.log(formatTime(86400));
console.log(formatTime(31536000));
console.log(formatTime(31536002));
console.log(formatTime(31536062));
console.log(formatTime(31539662));
console.log(formatTime(31712815));
