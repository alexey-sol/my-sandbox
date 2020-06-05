// Finds an object whose "property" equals "value", in the given array of
// objects.

module.exports = function findElement(array, property, value) {
  return array.find(element => {
    if (element[property] === value)
      return element;
  });
}