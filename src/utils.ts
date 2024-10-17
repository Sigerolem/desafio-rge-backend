export function numberMonth(month: string) {
  switch (month.toLowerCase()) {
    case 'jan':
      return 1;
    case 'fev':
      return 2;
    case 'mar':
      return 3;
    case 'abr':
      return 4;
    case 'mai':
      return 5;
    case 'jun':
      return 6;
    case 'jul':
      return 7;
    case 'ago':
      return 8;
    case 'set':
      return 9;
    case 'out':
      return 10;
    case 'nov':
      return 11;
    case 'dez':
      return 12;
    default:
      return -1;
  }
}
