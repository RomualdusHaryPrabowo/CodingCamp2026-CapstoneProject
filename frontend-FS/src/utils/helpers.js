export const getAccuracyLabel = (percent) => {
  if (percent <= 20) return "Tidak Direkomendasikan";
  if (percent <= 40) return "Kurang Cocok";
  if (percent <= 60) return "Cukup Cocok";
  if (percent <= 75) return "Cocok";
  if (percent <= 90) return "Sangat Cocok";
  return "Ideal untuk Kamu";
};
