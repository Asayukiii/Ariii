# Embed Parser
Este es una breve introducción al embed parser de Erisa.

## ¿Qué es el "Embed Parser"?
Es una función que te permite convertir texto en un mensaje embebido, usando una sintaxis predefinida.

## ¿Cuál es la sintaxis del embed parser?
### Prefix: $
El símbolo de dinero es el prefijo de la función, necesario para ejecutar los builders.
### Corchete (abierto): [
Este simboliza el inicio de los parámetros de la función.
### Corchete (cerrado): ]
Este simboliza el final de los parámetros de la función.
### Punto y coma: ;
Este simboliza el separador de parámetros de la función.
### Ejemplo
```javascript
`
$funcion[PARAM_1;PARAM_2;PARAM_3]
`
```

## ¿Cómo crear embeds?
Para crear un embed debes usar la función: `$newEmbed[]` y dentro de estas usar las subfunciones del embed builder.

## Lista de sub-functiones.
- `$setTitle[TEXTO]`
- `$setThumbnail[IMAGEN_URL]`
- `$setDescription[TEXTO]`
- `$setImage[IMAGEN_URL]`
- `$setColor[COLOR_HEX]`
- `$setFooter[TEXTO;IMAGEN_URL]`
- `$addField[NOMBRE;VALOR;true/false]`

### Ejemplo
```javascript
`
$newEmbed[
    $setTitle[Mi primer embed con Erisa]
    $setDescription[¡Que bonito se ve! uwu]
    $setColor[2F3136]
]
`
```
PD: Para crear múltiples embeds en un sólo mensaje, puedes usar `$newEmbed` hasta 25 veces por mensaje.