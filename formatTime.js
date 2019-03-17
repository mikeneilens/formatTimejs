const Unit = Object.freeze({
  second: { secondsPerUnit:1, maxValue:60, text:"second"},
  minute: { secondsPerUnit:60, maxValue:60, text:"minute"},
  hour: { secondsPerUnit:3600, maxValue:24, text:"hour"},
  day: { secondsPerUnit:86400, maxValue:365, text:"day"},
  year: { secondsPerUnit:31536000, maxValue:100, text:"year"}
});

class UnitTime {
  constructor(unit, quantity) {
    this.unit = unit;
    this.value = quantity;
  }
  text() {
    if (this.value > 1) {
      return `${this.value} ${this.unit.text}s`;
    } else {
      return `${this.value} ${this.unit.text}`;
    }
  }
}

function formatTime(timeInSeconds) {

    function isNonZeroTime(unitTime) {
        return unitTime.value > 0;
    }

    const calcualtedUnitTimes = calcTime(timeInSeconds).filter(isNonZeroTime);
    return formatIntoText(calcualtedUnitTimes);
}

const units = [Unit.year, Unit.day, Unit.hour, Unit.minute, Unit.second];

function calcTime(timeInSeconds) {

  function calcTimePerUnit(unit) {
    const newValue = Math.floor(timeInSeconds/unit.secondsPerUnit) % unit.maxValue; 
    return new UnitTime(unit, newValue);
  }
  return units.map(calcTimePerUnit);
}

function formatIntoText(unitTimes) {
    switch (unitTimes.length) {
        case 0: 
          return "none"; break;
        case 1: 
          return `${unitTimes[0].text()}`;
        case 2: 
          return `${unitTimes[0].text()} and ${unitTimes[1].text()}`;
        case 3: 
          return `${unitTimes[0].text()}, ${unitTimes[1].text()} and ${unitTimes[2].text()}`;
        case 4: 
          return `${unitTimes[0].text()}, ${unitTimes[1].text()}, ${unitTimes[2].text()} and ${unitTimes[3].text()}`;
        case 5: 
          return `${unitTimes[0].text()}, ${unitTimes[1].text()}, ${unitTimes[2].text()}, ${unitTimes[3].text()} and ${unitTimes[4].text()}`; 
    }
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
