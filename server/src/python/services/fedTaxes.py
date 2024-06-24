def fedTaxes(income):
  if income >= 232000:
    return 0.37 * (income - 232000) + 52540
  if income >= 183000:
    return 0.32 * (income - 183000) + 36860
  if income >= 101000:
    return 0.24 * (income - 101000) + 17180
  if income >= 48000:
    return 0.22 * (income - 48000) + 5520
  if income >= 12000:
    return 0.12 * (income - 12000) + 1200
  return 0.1 * income

