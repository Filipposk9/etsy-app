export function normalizeCountry(countryIso: string) {
  return countryCode.get(countryIso);
}

const countryCode = new Map([
  ["US", { code: 40, isEu: false }],
  ["AU", { code: 50, isEu: false }],
  ["CA", { code: 60, isEu: false }],
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
  ["RE", { code: 380, isEu: false }],
  ["FO", { code: 770, isEu: false }],
  ["KE", { code: 780, isEu: false }],
  ["CO", { code: 930, isEu: false }],
  ["GR", { code: 1000, isEu: true, deliveryCostVat: 1.24 }],
  ["AT", { code: 1001, isEu: true, deliveryCostVat: 1.2 }],
  ["BE", { code: 1002, isEu: true, deliveryCostVat: 1.21 }],
  ["BG", { code: 1003, isEu: true, deliveryCostVat: 1.2 }],
  ["FR", { code: 1004, isEu: true, deliveryCostVat: 1.2 }],
  ["DE", { code: 1005, isEu: true, deliveryCostVat: 1.19 }],
  ["DK", { code: 1006, isEu: true, deliveryCostVat: 1.25 }],
  ["EE", { code: 1007, isEu: true, deliveryCostVat: 1.2 }],
  ["GB", { code: 1008, isEu: false }],
  ["IE", { code: 1009, isEu: true, deliveryCostVat: 1.23 }],
  ["ES", { code: 1010, isEu: true, deliveryCostVat: 1.21 }],
  ["IT", { code: 1011, isEu: true, deliveryCostVat: 1.22 }],
  ["NL", { code: 1012, isEu: true, deliveryCostVat: 1.21 }],
  ["HR", { code: 1013, isEu: true, deliveryCostVat: 1.25 }],
  ["CY", { code: 1014, isEu: true, deliveryCostVat: 1.19 }],
  ["LV", { code: 1015, isEu: true, deliveryCostVat: 1.21 }],
  ["LT", { code: 1016, isEu: true, deliveryCostVat: 1.21 }],
  ["LU", { code: 1017, isEu: true, deliveryCostVat: 1.16 }],
  ["MT", { code: 1018, isEu: true, deliveryCostVat: 1.18 }],
  ["HU", { code: 1019, isEu: true, deliveryCostVat: 1.27 }],
  ["PL", { code: 1020, isEu: true, deliveryCostVat: 1.23 }],
  ["PT", { code: 1021, isEu: true, deliveryCostVat: 1.23 }],
  ["RO", { code: 1022, isEu: true, deliveryCostVat: 1.19 }],
  ["SK", { code: 1023, isEu: true, deliveryCostVat: 1.2 }],
  ["SI", { code: 1024, isEu: true, deliveryCostVat: 1.22 }],
  ["SE", { code: 1025, isEu: true, deliveryCostVat: 1.25 }],
  ["CZ", { code: 1026, isEu: true, deliveryCostVat: 1.21 }],
  ["FI", { code: 1027, isEu: true, deliveryCostVat: 1.24 }],
  ["TR", { code: 1028, isEu: false }],
  ["RS", { code: 1029, isEu: false }],
  ["AL", { code: 1030, isEu: false }],
  ["EG", { code: 1031, isEu: false }],
  ["MU", { code: 2001, isEu: false }],
]);
