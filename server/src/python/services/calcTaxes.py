from fedTaxes import fedTaxes
from stateTaxes import stateTaxes

def calcTaxes(income):
  fedTaxAmt = fedTaxes(income)
  stateTaxAmt = stateTaxes(income)
  taxes = fedTaxAmt + stateTaxAmt
  taxRate = taxes / income
  
  return taxRate, taxes