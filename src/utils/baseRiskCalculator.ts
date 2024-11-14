// Base risk calculator for maternal age and previous T21 history
export const calculateBaseRisk = (maternalAge: number, previousT21: boolean): number => {
  // Base risk values based on maternal age according to FMF
  let baseRisk = 1/1500;
  if (maternalAge < 20) baseRisk = 1/1500;
  else if (maternalAge < 25) baseRisk = 1/1350;
  else if (maternalAge < 30) baseRisk = 1/900;
  else if (maternalAge < 35) baseRisk = 1/400;
  else if (maternalAge < 37) baseRisk = 1/250;
  else if (maternalAge < 40) baseRisk = 1/100;
  else if (maternalAge < 43) baseRisk = 1/50;
  else if (maternalAge < 45) baseRisk = 1/20;
  else baseRisk = 1/10;

  // Adjust for previous T21 history
  if (previousT21) baseRisk *= 75;

  return baseRisk;
};