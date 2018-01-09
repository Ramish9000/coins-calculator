import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'calculator',
	templateUrl: './calculator.component.html',
	styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

	amount: string;
	denominationsArray = [];
	penniesObject = {'£2':200,'£1':100,"50p":50,"20p":20,"10p":10,"5p":5,"2p":2,"1p":1};
	inputError: string;
	canonicalAmount: number;

	constructor() { }

	ngOnInit() {
	}

	inputValidation() {

  	// Parsing
  	this.amount = this.amount.replace(/\s/g,'');
  	// Validation
  	var amountWithoutSigns = this.amount.replace(/£|p/g, "");
  	var numNumericalValue = Number(amountWithoutSigns).toFixed(2);
  	var regexValidInput = /^([£][0-9]|[0-9])\d*((\.\d{1,100})?[p]?)$/;
  	var regexNoDecimal = /^([£]([0-9])\d*[p])$/;
  	
  	if(regexValidInput.test(this.amount) && (Number(numNumericalValue) != 0) && !(regexNoDecimal.test(this.amount))){

  		return true;

  	} else {

  		return false;

  	}

  };

  canonicalEquivalent() {

  	var amountWithoutSigns = this.amount.replace(/£|p/g, "");
  	
  	// If the first character is a £
  	if(this.amount.charAt(0) == '£'){

  		// £100.0p
  		var regexDecimalWithZero = /^([£][0-9])\d*((\.\d)[0][p]?)$/;

  		if(regexDecimalWithZero.test(this.amount)){

  			return Number(amountWithoutSigns) * 100;

  		} else {

  			return parseFloat(Number(amountWithoutSigns).toFixed(2)) * 100;

  		}
  		
  	} else {

  		var regexDecimal = /^([0-9])\d*((\.\d{1,100})[p]?)$/;

  		if(regexDecimal.test(this.amount)){

  			return parseFloat(Number(amountWithoutSigns).toFixed(2)) * 100;

  		} else {

  			return Number(amountWithoutSigns);

  		}

  	}

  }

  getCoinsValue(amount = this.amount) {

  	this.inputError = "";
  	this.denominationsArray = [];
  	this.inputValidation();

  	if(this.amount == null || this.amount == '') {

  		this.inputError = "Please enter a monetary value";

  	} else if (!this.inputValidation()) {

  		this.inputError = "Invalid input";

  	} else {

  		var canonicalAmount = this.canonicalEquivalent();
  		var penniesObject = this.penniesObject;
  		var penniesObjectLength = Object.keys(penniesObject).length;

  		for (var key in penniesObject) {

  			var numberOfCoins = Math.floor(canonicalAmount/penniesObject[key]);

  			if (numberOfCoins > 0){

  				this.denominationsArray.push(numberOfCoins + ' x ' + key);
  				canonicalAmount = canonicalAmount%penniesObject[key];

  			}

  		}

  	}

  }

}