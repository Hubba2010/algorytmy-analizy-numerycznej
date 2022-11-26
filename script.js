console.log('----------AAN------------');

function Horner(stopien, wspolczynniki, punkt) {
    console.log('Stopien wielomianu: ', stopien);
    console.log('Wspolczynniki wielomianu: ', ...wspolczynniki);
    console.log('Punkt: ', punkt);
    const odwrTablica = wspolczynniki.slice().reverse();
    console.log(odwrTablica);
    let wartoscWielomianu = 0;

    for(let i=0;i<wspolczynniki.length; i++) {
       let chwilowa = Math.pow(punkt, i) * odwrTablica[i]
       console.log(chwilowa)
        wartoscWielomianu+= chwilowa;
    }

    console.log(`WARTOSC WIELOMIANU W PUNKCIE p=${punkt} : `, wartoscWielomianu);
}

Horner(3, [3,3,-2,11], -1);