export function roman(decimal) {
  if (decimal < 1 && decimal > 6) return null;

  const romans = ["I  ", "II ", "III", "IV ", "V  ", "VI "];

  return romans[decimal - 1];
}
