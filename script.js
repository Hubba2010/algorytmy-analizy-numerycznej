const allTrapezoids = document.querySelectorAll('.trapezoid');
const allSimpsons = document.querySelectorAll('.simpson');

function firstFunction(x) {
	return Math.sqrt(1 + x);
}
function secondFunction(x) {
	return Math.sin(x) ** 2 + 2;
}
function thirdFunction(x) {
	return Math.exp(x) * 2 * x ** 3;
}

function trapezoidal(a, b, n, fn) {
	let h = (b - a) / n;
	let s = fn(a) + fn(b);
	for (let i = 1; i < n; i++) s += 2 * fn(a + i * h);
	return (h / 2) * s;
}

function simpson(ll, ul, n, fn) {
	let h = (ul - ll) / n;
	let x = [];
	let fx = [];

	for (let i = 0; i <= n; i++) {
		x[i] = ll + i * h;
		fx[i] = fn(x[i]);
	}
	let res = 0;
	for (let i = 0; i <= n; i++) {
		if (i == 0 || i == n) res += fx[i];
		else if (i % 2 != 0) res += 4 * fx[i];
		else res += 2 * fx[i];
	}
	res = res * (h / 3);
	return res;
}

allTrapezoids.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		let grids = prompt('Podaj ilosc przedzialow :)', '1');
		const element = e.target.parentNode;
		const index = Array.from(element.parentNode.children).indexOf(element) + 1;
		switch (index) {
			case 1:
				console.log(
					'Wartosc calki dzieki z wzoru trapezow (1 funkcja): ' +
						Math.round(trapezoidal(0, 1, grids, firstFunction) * 10000.0) /
							10000.0
				);
				break;
			case 2:
				console.log(
					'Wartosc calki dzieki z wzoru trapezow (2 funkcja): ' +
						Math.round(
							trapezoidal(0, 2 * Math.PI, grids, secondFunction) * 10000.0
						) /
							10000.0
				);
				break;
			case 3:
				console.log(
					'Wartosc calki dzieki z wzoru trapezow (3 funkcja): ' +
						Math.round(trapezoidal(0, 2, grids, thirdFunction) * 10000.0) /
							10000.0
				);
				break;
		}
	});
});

allSimpsons.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		let grids = prompt('Podaj ilosc przedzialow :)', '1');
		const element = e.target.parentNode;
		const index = Array.from(element.parentNode.children).indexOf(element) + 1;
		if (grids % 2 !== 0) {
			console.error('Liczba przedziałów nieparzysta. Błędne dane');
			return;
		}
		switch (index) {
			case 1:
				console.log(
					'Wartosc calki dzieki z wzoru simpsona (1 funkcja): ' +
						Math.round(simpson(0, 1, grids, firstFunction) * 10000.0) / 10000.0
				);
				break;
			case 2:
				console.log(
					'Wartosc calki dzieki z wzoru simpsona (2 funkcja): ' +
						Math.round(
							simpson(0, 2 * Math.PI, grids, secondFunction) * 10000.0
						) /
							10000.0
				);
				break;
			case 3:
				console.log(
					'Wartosc calki dzieki z wzoru simpsona (3 funkcja): ' +
						Math.round(simpson(0, 2, grids, thirdFunction) * 10000.0) / 10000.0
				);
				break;
		}
	});
});
