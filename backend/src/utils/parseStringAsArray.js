module.exports = function parseStringAsArray(ArrayAsString) {
    return ArrayAsString.split(',').map(tech => tech.trim());
    //trim - tira os espaços antes e depois
}