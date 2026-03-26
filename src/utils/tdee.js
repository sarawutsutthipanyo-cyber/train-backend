/**
 * BMR using Mifflin-St Jeor
 * gender: 'male' | 'female'
 */
const calcBMR = (weight, height, age, gender) => {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
};

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const calcTDEE = (bmr, activityLevel) => Math.round(bmr * (ACTIVITY_MULTIPLIERS[activityLevel] || 1.55));

const calcTargetCalories = (tdee, goal) => {
  if (goal === 'lose_weight') return tdee - 500;
  if (goal === 'gain_muscle') return tdee + 300;
  return tdee;
};

const calcMacros = (targetCalories, weight) => {
  const protein = Math.round(weight * 2);
  const fat = Math.round((targetCalories * 0.25) / 9);
  const carbs = Math.round((targetCalories - protein * 4 - fat * 9) / 4);
  return { protein, fat, carbs };
};

module.exports = { calcBMR, calcTDEE, calcTargetCalories, calcMacros };
