const math = require("mathjs");

function ConvertHandler(){
    this.getNum = function(input){
        let indexOfUnits = input.search(/a-zA-Z/);
        let numbers;
        if(indexOfUnits == -1){numbers = input}
        else {numbers = input.subString(0, indexOfUnits)};
        if (numbers.length == 0) {numbers = "1";
            // saved as a string in order to be able to run string operators on it
        };
    // no double division in the input
    if(numbers.split(/\//).length>=2){
        return "invalid number"
    };
    return math.eval(numbers);
        };
        
this.getUnit = function(input){
    let indexOfUnits = input.search(/[\sa-zA-Z]/);
    let units = input.substring(indexOfUnits, input.length);
    
    let acceptable = ["gal", "mi", "lbs", "GAL", "MI", "LBS", "L", "KM", "KG", "l", "km", "kg"];
    let outputUnits = ["gal", "mi", "lbs", "L", "km", "kg"];
    
    let acceptableIndex = acceptable.indexOf(units);
    
    if (acceptableIndex>=0){
        return acceptable[acceptableIndex]
    }
    else{return "Invalid Unit";}
}


this.getReturnUnit = function(initUnit){
    let input = ["lbs", "mi", "gal", "kg", "km", "l", "LBS", "MI", "GAL", "KG", "KM", "L"];
    let output = ["kg", "km", "L", "lbs", "mi", "gal", "kg", "km", "L", "lbs", "mi", "gal"];
    
    let inputIndex = input.indexOf(initUnit);

    if(inputIndex >= 0){return output[inputIndex];}
    else {return "invalid unit";}
};


this.spellOutUnit = function(unit){
    let input = ["lbs", "mi", "gal", "kg", "km", "l", "LBS", "MI", "GAL", "KG", "KM", "L"];
    let output = ["pounds", "miles", "gallons", "kilograms", "kilometers", "liters", "pounds", "miles", "gallons", "kilograms", "kilometers", "liters"];
    if(input.indexOf(unit) >=0){
        return output[input.indexOf(unit)];}
    else {return "Invalid Unit";}
};



this.convert = function(initNum, initUnit){
const rates = {
      gal: 3.78541,
      L: 1/3.78541,
      lbs: 0.453592,
      kg: 1/0.453592,
      mi: 1.60934,
      km: 1/1.60934
    };
    
    let conversion = parseFloat(initNum*rates[initUnit].toFixed(5));
    
if (initNum == "invalid number" && initUnit == "invalid unit") {
      return "invalid number and unit";
    }
    else if (initNum == "invalid number") {
      return "invalid number";
    }
    else if (initUnit == "invalid unit") {
      return "invalid unit";
    }
    else {
      return conversion;
    };
};



this.getString = function(initNum, initUnit, returnNum, returnUnit){
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${this.convert(initNum, initUnit)} ${this.spellOutUnit(returnUnit)}`
};
        
};


module.exports = ConvertHandler;

