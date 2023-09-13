import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})


export class HomePage {
  selectedMetric: string;
  selectedUnitFrom: string;
  selectedUnitTo: string;
  inputValue: number;
  result: string;
  inputError: boolean;

  constructor() {
    this.selectedMetric = '';
    this.selectedUnitFrom = '';
    this.selectedUnitTo = '';
    this.inputValue = 0;
    this.result = '';
    this.inputError = false;
    
  }
  

  convert() {
    // Reset result and input error
    this.result = '';
    this.inputError = false;
  
    // Check if the input is numeric
    if (isNaN(this.inputValue)) {
      this.inputError = true;
      return;
    }
  
    // Implement conversion logic based on selectedMetric, selectedUnitFrom, and selectedUnitTo
    if (this.selectedMetric === 'Panjang') {
      this.convertPanjang();
    } else if (this.selectedMetric === 'Massa') {
      this.convertMassa();
    } else if (this.selectedMetric === 'Waktu'){
      this.convertWaktu();
      // Handle other metrics here
    } else if (this.selectedMetric === 'Suhu'){
      this.convertSuhu();
    }
  }
  
  convertPanjang() {
    // Define conversion factors
    const panjangFactors: Record<string, number> = {
      km: 1000,
      hm: 100,
      dam: 10,
      m: 1,
      dm: 0.1,
      cm: 0.01,
      mm: 0.001,
    };
  
    // Check if the selected units exist in the factors object
    if (!panjangFactors.hasOwnProperty(this.selectedUnitFrom) || !panjangFactors.hasOwnProperty(this.selectedUnitTo)) {
      this.result = 'Invalid units';
      return;
    }
  
    // Calculate the conversion result
    const factorFrom = panjangFactors[this.selectedUnitFrom];
    const factorTo = panjangFactors[this.selectedUnitTo];
  
    // Ensure inputValue is a valid number
    const inputValue: number = +this.inputValue; // Ensure inputValue is a number
  
    if (!isNaN(inputValue)) {
      const result = (inputValue * factorFrom) / factorTo;
      this.result = `${inputValue} ${this.selectedUnitFrom} = ${result} ${this.selectedUnitTo}`;
    } else {
      this.result = 'Invalid input';
    }
  }
  

  convertMassa() {
    // Define conversion factors for Massa
    const massaFactors: Record<string, number> = {
      kg: 1,
      hg: 0.1,
      dag: 0.01,
      g: 0.001,
      dg: 0.0001,
      cg: 0.00001,
      mg: 0.000001,
    };
  
    // Check if the selected units exist in the factors object
    if (!massaFactors.hasOwnProperty(this.selectedUnitFrom) || !massaFactors.hasOwnProperty(this.selectedUnitTo)) {
      this.result = 'Invalid units';
      return;
    }
  
    // Ensure inputValue is a valid number
    const inputValue: number = +this.inputValue;
  
    if (!isNaN(inputValue)) {
      // Calculate the conversion result
      const factorFrom = massaFactors[this.selectedUnitFrom];
      const factorTo = massaFactors[this.selectedUnitTo];
      const result = (inputValue * factorFrom) / factorTo;
      this.result = `${inputValue} ${this.selectedUnitFrom} = ${result} ${this.selectedUnitTo}`;
    } else {
      this.result = 'Invalid input';
    }
  }

  // Define conversion factors for Waktu

convertWaktu(){
const waktuFactors: Record<string, number> ={
  jam: 1,
  menit: 60,
  detik: 3600,
};

// ...
// Dalam fungsi konversi

// Ensure inputValue is a valid number
const inputValue: number = +this.inputValue;
  
if (!isNaN(inputValue)) {
  // Calculate the conversion result
  const factorFrom = waktuFactors[this.selectedUnitFrom];
  const factorTo = waktuFactors[this.selectedUnitTo];
  const result = (inputValue * factorTo) / factorFrom;
  this.result = `${inputValue} ${this.selectedUnitFrom} = ${result} ${this.selectedUnitTo}`;
} else {
  this.result = 'Invalid input';
}


}

convertSuhu() {
  const suhuFactors: Record<string, Record<string, (value: number) => number>> = {
    C: {
      F: (celsius) => (celsius * 9/5) + 32,
      K: (celsius) => celsius + 273.15,
    },    
    F: {
      C: (fahrenheit) => (fahrenheit - 32) * 5/9,
      K: (fahrenheit) => (fahrenheit - 32) * 5/9 + 273.15,
    },
    K: {
      C: (kelvin) => kelvin - 273.15,
      F: (kelvin) => (kelvin - 273.15) * 9/5 + 32,
    },
  };
  

  const conversionFunction = suhuFactors[this.selectedUnitFrom][this.selectedUnitTo];

  if (conversionFunction) {
    const result = conversionFunction(this.inputValue);
    this.result = `${this.inputValue} ${this.selectedUnitFrom} = ${result} ${this.selectedUnitTo}`;
  } else {
    this.result = 'Invalid units';
  }
}


  
  
  

  validateInput(event: any) {
    const inputValue = event.target.value;
    // Check if the input is numeric
    if (/^\d*\.?\d*$/.test(inputValue)) {
      this.inputError = false;
    } else {
      this.inputError = true;
    }
  }
}
