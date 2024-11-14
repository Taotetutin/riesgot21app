import { calculateBaseRisk } from './baseRiskCalculator';

interface FirstTrimesterMarkers {
  maternalAge: number;
  previousT21: boolean;
  crl: number;
  heartRate: number;
  nuchalTranslucency: number;
  nasalBone: 'present' | 'absent/hypoplastic';
  tricuspidRegurgitation: 'normal' | 'abnormal';
  ductusVenosus: 'normal' | 'abnormal';
}

export const calculateFirstTrimesterRisk = (markers: FirstTrimesterMarkers): number => {
  // Calculate base risk from maternal age
  let risk = calculateBaseRisk(markers.maternalAge, markers.previousT21);
  let likelihoodRatio = 1;

  // CRL-adjusted NT risk (based on FMF algorithm)
  const expectedNT = 1.6219 + 0.0127 * markers.crl;
  const ntMoM = markers.nuchalTranslucency / expectedNT;
  
  if (ntMoM > 2.5) likelihoodRatio *= Math.pow(2.5, ntMoM - 1);
  else likelihoodRatio *= 0.5;
  
  // Nasal bone adjustment
  if (markers.nasalBone === 'absent/hypoplastic') likelihoodRatio *= 48.5;
  else likelihoodRatio *= 0.45;

  // Tricuspid flow adjustment
  if (markers.tricuspidRegurgitation === 'abnormal') likelihoodRatio *= 55.9;
  else likelihoodRatio *= 0.62;

  // Ductus venosus flow adjustment
  if (markers.ductusVenosus === 'abnormal') likelihoodRatio *= 21.3;
  else likelihoodRatio *= 0.70;

  // Heart rate adjustment
  if (markers.heartRate > 180 || markers.heartRate < 120) likelihoodRatio *= 2.0;
  else likelihoodRatio *= 0.8;

  return risk * likelihoodRatio;
};