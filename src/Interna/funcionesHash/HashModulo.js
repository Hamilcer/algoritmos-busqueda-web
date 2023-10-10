export function hashModulo(clave, rango, numClaves) {
  let hashValue = clave % rango;
  hashValue = hashValue >= numClaves ? 0 : hashValue;
  return hashValue;
}

export function hashCuadrado(clave, rango, numClaves) {
  let cuadrado = clave * clave; // Usamos long para evitar desbordamiento

  let digitos = contarCeros(rango);
  let cuadradoStr = cuadrado.toString();

  // Comprobamos si el cuadrado tiene menos dígitos que lo requerido
  if (cuadradoStr.length < digitos) {
    return cuadrado; // Simplemente retornamos el cuadrado si es demasiado corto
  }

  // Tomamos los dígitos del medio
  let inicio = (cuadradoStr.length - digitos) / 2;
  let fin = inicio + digitos;
  let subconjunto = cuadradoStr.substring(inicio, fin);
  let hashValue = parseInt(subconjunto);
  console.log("Posicion en la estructura: " + (hashValue + 1));

  return parseInt(subconjunto);
}

export function hashTruncamiento(clave, rango, numClaves) {
  let digitos = contarCeros(rango);
  let strClave = clave;
  if (strClave.length < digitos) {
    console.log("Posicion en la estructura: " + (clave + 1));
    return clave;
  }
  let inicio = (strClave.length - digitos) / 2;
  let fin = inicio + digitos;
  let subconjunto = strClave.substring(inicio, fin);
  let hashValue = parseInt(subconjunto);
  console.log("Posicion en la estructura: " + (hashValue + 1));

  return hashValue;
}

export function hashPlegamiento(clave, rango, numClaves) {
  let segmentoSize = contarCeros(rango);
  let hashValue = 0;

  for (let i = 0; i < clave.length; i += segmentoSize) {
    let segmento;
    if (i + segmentoSize <= clave.length) {
      segmento = clave.substring(i, i + segmentoSize);
    } else {
      segmento = clave.substring(i);
    }
    hashValue += parseInt(segmento);
  }
  hashValue = hashValue >= rango ? hashValue % rango : hashValue;
  console.log("Posicion en la estructura: " + (hashValue + 1));
  return hashValue;
}

export function calcularRango(cantidadClaves) {
  let numero = 0;
  /*switch (opcion) {
            case 1:
                if (cantidadClaves < 2) {
                    return -1; // No hay números primos menores que 2
                }

                numero = cantidadClaves - 1; // Empezamos buscando desde el número anterior al dado
                while (numero > 1) {
                    if (esPrimo(numero)) {
                        return numero; // Devolvemos el primer primo encontrado
                    }
                    numero--;
                }
                return -1;

            case 2:*/
  numero = parseInt(cantidadClaves) + 1;
  while (!esPrimo(numero)) {
    numero++;
  }
  /*break;
            case 3:
                numero = cantidadClaves;
                break;
        }*/
  return numero;
}

function esPrimo(n) {
  if (n <= 1) {
    return false;
  }
  if (n <= 3) {
    return true;
  }
  if (n % 2 == 0 || n % 3 == 0) {
    return false;
  }
  let i = 5;
  while (i * i <= n) {
    if (n % i == 0 || n % (i + 2) == 0) {
      return false;
    }
    i += 6;
  }
  return true;
}

function contarCeros(potenciaDeDiez) {
  let contador = 0;
  while (potenciaDeDiez > 1) {
    contador++;
    potenciaDeDiez /= 10;
  }
  return contador;
}
