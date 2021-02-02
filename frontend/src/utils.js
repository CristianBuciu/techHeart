// export const roundToTwo = (num) => {
//   return +(Math.round(num + "e+2") + "e-2");
// };

export const roundToTwo = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
