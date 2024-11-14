import { calculateBaseRisk } from './baseRiskCalculator';

interface SecondTrimesterMarkers {
  maternalAge: number;
  previousT21: boolean;
  nasalBone: 'present' | 'absent/hypoplastic';
  cardiacFocus: string;
  ventriculomegaly: string;
  nuchalFold: string;
  shortFemur: string;
  aberrantSubclavian: string;
  hyperechogenicBowel: string;
  pyelectasis: string;
  hasFirstTrimesterScreening: boolean;
  firstTrimesterRisk?: number;
}

export const calculateSecondTrimesterRisk = (markers: SecondTrimesterMarkers): number => {
  // Start with either first trimester risk or base risk
  let risk = markers.hasFirstTrimesterScreening && markers.firstTrimesterRisk 
    ? markers.firstTrimesterRisk 
    : calculateBaseRisk(markers.maternalAge, markers.previousT21);
    
  let likelihoodRatio = 1;

  // Nasal bone
  if (markers.nasalBone === 'absent/hypoplastic') likelihoodRatio *= 50.5;
  else likelihoodRatio *= 0.38;

  // Cardiac focus
  if (markers.cardiacFocus === 'present') likelihoodRatio *= 5.83;
  else likelihoodRatio *= 0.80;

  // Ventriculomegaly
  if (markers.ventriculomegaly === 'present') likelihoodRatio *= 27.52;
  else likelihoodRatio *= 0.94;

  // Nuchal fold
  if (markers.nuchalFold === 'increased') likelihoodRatio *= 53.05;
  else likelihoodRatio *= 0.46;

  // Short femur
  if (markers.shortFemur === 'short') likelihoodRatio *= 3.72;
  else likelihoodRatio *= 0.85;

  // Aberrant right subclavian artery
  if (markers.aberrantSubclavian === 'present') likelihoodRatio *= 21.48;
  else likelihoodRatio *= 0.71;

  // Hyperechogenic bowel
  if (markers.hyperechogenicBowel === 'present') likelihoodRatio *= 6.73;
  else likelihoodRatio *= 0.93;

  // Pyelectasis
  if (markers.pyelectasis === 'present') likelihoodRatio *= 7.63;
  else likelihoodRatio *= 0.92;

  return risk * likelihoodRatio;
};