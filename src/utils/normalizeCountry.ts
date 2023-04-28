export function normalizeCountry(countryIso: string) {
  return countryCode.get(countryIso);
}

const countryCode = new Map([
  ["US", { code: 40, isEu: false }],
  ["AU", { code: 50, isEu: false }],
  ["CA", { code: 20, isEu: false }],
  ["CK", { code: 70, isEu: false }],
  ["HK", { code: 80, isEu: false }],
  ["PH", { code: 90, isEu: false }],
  ["IS", { code: 100, isEu: false }],
  ["CH", { code: 120, isEu: false }],
  ["NO", { code: 130, isEu: false }],
  ["SG", { code: 150, isEu: false }],
  ["MY", { code: 160, isEu: false }],
  ["LB", { code: 180, isEu: false }],
  ["AE", { code: 190, isEu: false }],
  ["TH", { code: 200, isEu: false }],
  ["BR", { code: 220, isEu: false }],
  ["IL", { code: 230, isEu: false }],
  ["KP", { code: 260, isEu: false }],
  ["KH", { code: 290, isEu: false }],
  ["CL", { code: 300, isEu: false }],
  ["SA", { code: 310, isEu: false }],
  ["PR", { code: 330, isEu: false }],
  ["JP", { code: 331, isEu: false }],
  ["ZA", { code: 340, isEu: false }],
  ["RE", { code: 380, isEu: true }],
  ["FO", { code: 770, isEu: false }],
  ["KE", { code: 780, isEu: false }],
  ["GR", { code: 1000, isEu: true }],
  ["AT", { code: 1001, isEu: true }],
  ["BE", { code: 1002, isEu: true }],
  ["BG", { code: 1003, isEu: true }],
  ["FR", { code: 1004, isEu: true }],
  ["DE", { code: 1005, isEu: true }],
  ["DK", { code: 1006, isEu: true }],
  ["EE", { code: 1007, isEu: true }],
  ["GB", { code: 1008, isEu: false }],
  ["IE", { code: 1009, isEu: true }],
  ["ES", { code: 1010, isEu: true }],
  ["IT", { code: 1011, isEu: true }],
  ["NL", { code: 1012, isEu: true }],
  ["HR", { code: 1013, isEu: true }],
  ["CY", { code: 1014, isEu: true }],
  ["LV", { code: 1015, isEu: true }],
  ["LT", { code: 1016, isEu: true }],
  ["LU", { code: 1017, isEu: true }],
  ["MT", { code: 1018, isEu: true }],
  ["HI", { code: 1019, isEu: true }],
  ["PL", { code: 1020, isEu: true }],
  ["PT", { code: 1021, isEu: true }],
  ["RO", { code: 1022, isEu: true }],
  ["SK", { code: 1023, isEu: true }],
  ["SI", { code: 1024, isEu: true }],
  ["SE", { code: 1025, isEu: true }],
  ["CZ", { code: 1026, isEu: true }],
  ["FI", { code: 1027, isEu: true }],
  ["TR", { code: 1028, isEu: false }],
  ["RS", { code: 1029, isEu: false }],
  ["AL", { code: 1030, isEu: true }],
  ["EG", { code: 1031, isEu: false }],
  ["MU", { code: 2001, isEu: false }],
]);
