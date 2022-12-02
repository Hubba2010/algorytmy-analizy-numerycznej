let factorsArray = [];
let xValue;

////////////// UI

const parent = document.getElementById('pd-1');
const polynomialDegInput = document.getElementById('polynomialDeg');
const polynomialDegBtn = document.getElementById('confirmPolynomialDeg');
const calculateBtn = document.getElementById('calculate');
const resetFormBtn = document.getElementById('resetForm');
const inputsDiv = document.querySelector('.inputs');

polynomialDegBtn.addEventListener('click', () => {
	if (document.querySelectorAll('.factor').length) {
		return;
	}
	const polDegree = +polynomialDegInput.value;
	if (!polDegree && polDegree !== 0) {
		return;
	}
	for (let i = 0; i <= polDegree; i++) {
		const numInput = document.createElement('input');
		const inputLabel = document.createElement('label');
		numInput.setAttribute('type', 'number');
		numInput.setAttribute('id', i);
		inputLabel.setAttribute('for', i);
		inputLabel.setAttribute('class', 'inputLabel');
		inputLabel.textContent = `Współczynnik ${polDegree - i} potęgi x [x^${
			polDegree - i
		}]:`;
		numInput.classList.add('factor');
		inputsDiv.appendChild(inputLabel);
		inputsDiv.appendChild(numInput);
	}
	const xValueInput = document.createElement('input');
	const xValueLabel = document.createElement('label');
	xValueInput.setAttribute('type', 'number');
	xValueInput.setAttribute('id', 'xValue');
	xValueLabel.setAttribute('for', 'xValue');
	xValueLabel.setAttribute('id', 'xValueLabel');
	xValueLabel.textContent = 'Wartość x: ';
	inputsDiv.appendChild(xValueLabel);
	inputsDiv.appendChild(xValueInput);
	console.log(polDegree);
});

resetFormBtn.addEventListener('click', () => {
	removeInputs();
	polynomialDegInput.value = '';
});

calculateBtn.addEventListener('click', () => {
	if (!document.querySelectorAll('.factor').length) {
		return;
	}
	setInputValues();
	setXValue();
	Horner(+polynomialDegInput.value, factorsArray, xValue);
});

function removeInputs() {
	const inputs = document.querySelectorAll('.factor');
	const inputLabels = document.querySelectorAll('.inputLabel');
	inputs.forEach((input) => {
		input.remove();
	});
	inputLabels.forEach((label) => {
		label.remove();
	});
	document.getElementById('xValueLabel').remove();
	document.getElementById('xValue').remove();
}

function setInputValues() {
	factorsArray = Array.from(document.querySelectorAll('.factor')).map(
		(input) => +input.value
	);
	console.log('Współczynniki: ', factorsArray);
}

function setXValue() {
	xValue = +document.getElementById('xValue').value;
	console.log('Wartość x: ', xValue);
}

///////////////////////////////// Algorithms

function Horner(degree, factorsTable, xValue) {
	let state;
	let result = [];

	for (let i = 0; i <= degree; i++) {
		for (let j = 0; j <= degree - i; j++) {
			if (j === 0) {
				state = factorsTable[j];
			} else {
				factorsTable[j] += xValue * factorsTable[j - 1];
			}
			state = factorsTable[j];
		}
		result[i] = state * Factorial(i);
	}

	for (let k = 0; k < degree + 1; k++) {
		if (k === 0) {
			console.log(`Wartosc funkcji w punkcie x: ${result[k]}`);
		} else {
			console.log(`Pochodna ${k}-tego rzędu: ${result[k]}`);
		}
	}
}

function Factorial(num) {
	if (num < 0) {
		return;
	} else if (num === 0) {
		return 1;
	} else {
		let fact = 1;
		for (i = 1; i <= num; i++) {
			fact *= i;
		}
		return fact;
	}
}
