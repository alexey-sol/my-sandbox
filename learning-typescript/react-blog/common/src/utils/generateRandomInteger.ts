const generateRandomInteger: (min: number, max: number) => number =

  function(min: number = 0, max: number = 9): number {
    return Math.floor(Math.random() * (max - min)) + min;
  };

export default generateRandomInteger;