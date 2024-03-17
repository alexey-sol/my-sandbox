const ID_GENERATOR_RADIX = 36;

export const generateId = () => Date.now().toString(ID_GENERATOR_RADIX) +
   Math.random().toString(ID_GENERATOR_RADIX).slice(2);
