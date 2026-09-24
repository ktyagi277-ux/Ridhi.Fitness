/** Brand palette as three.js-friendly hex values — keep in sync with globals.css. */
export const PALETTE = {
  cream: "#fbf8f3",
  cream200: "#ede5d6",
  clay: "#c8592f",
  clayDeep: "#a03e1c",
  clayLight: "#eec4ac",
  sage: "#6e7f53",
  sageDeep: "#4c5938",
  sageLight: "#cfd6bb",
  gold: "#d9a441",
  goldDeep: "#c9973a",
  ink: "#2c2621",
  inkDeep: "#1d1814",
  steel: "#d8d2c8",
} as const;

/** Soft matte "clay" finish used on the plates and kettlebell bodies. */
export const clayFinish = {
  roughness: 0.42,
  metalness: 0.02,
  clearcoat: 0.55,
  clearcoatRoughness: 0.32,
  sheen: 0.35,
  sheenRoughness: 0.6,
} as const;

/** Polished metal for bars, collars and rings. */
export const metalFinish = {
  roughness: 0.22,
  metalness: 0.95,
  envMapIntensity: 1.4,
} as const;
