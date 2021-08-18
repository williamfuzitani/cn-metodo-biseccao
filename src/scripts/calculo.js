let x5 = 1;
let x4 = 1;
let x3 = 1;
let x2 = 1;
let x1 = 1;
let x = 1;

let epsilon = 0.01;

let a = 0;
let b = 1;

let iteracoes = [];
let iteracaoX = [];

function calculaFuncao(valor) {
  return Math.pow(valor, 3) - 9 * valor + 3;
  // return (
  //   x5 * Math.pow(valor, 5) +
  //   x4 * Math.pow(valor, 4) +
  //   x3 * Math.pow(valor, 3) +
  //   x2 * Math.pow(valor, 2) +
  //   x1 * valor +
  //   x
  // );
}

function calcula(xA, xB) {
  let xN = (xA + xB) / 2;
  let parada = Math.abs((xB - xA) / 2);
  let fdeA = calculaFuncao(xA);
  let fdeB = calculaFuncao(xB);
  let fdeX = calculaFuncao(xN);

  if (parada < epsilon) {
    iteracoes.push({ xA, fdeA, xB, fdeB, xN, fdeX });
    return iteracoes;
  }

  iteracoes.push({ xA, fdeA, xB, fdeB, xN, fdeX });

  if (fdeX < 0) {
    xB = xN;
    calcula(xA, xB);
  } else {
    xA = xN;
    calcula(xA, xB);
  }
}

calcula(a, b);

console.table(iteracoes);
