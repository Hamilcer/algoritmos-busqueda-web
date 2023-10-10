export function crearFilas(filas, columnas) {
  let nueva = [];
  for (let i = 0; i < filas; i++) {
    nueva[i] = {};
    for (let j = 0; j < columnas; j++) {
      nueva[i][j] = "-";
    }
  }
  const estructura = nueva;
  return estructura;
}

export function crearColumnas(columnas) {
  let nueva = [];
  for (let i = 0; i < columnas; i++) {
    nueva[i] = {"field":i.toString()};
  }
  const estructura = nueva;
  return estructura;
}

export function hashModulo(clave, rango) {
    return clave % rango;
  }