export interface RegionalTrip {
  id: string
  vehicle: string
  driver: string
  route: string
  date: string
  duration: string
  km: number
  alerts: number
  score: number
}

/** Historique des trajets effectués par les véhicules connectés de la région. */
export const REGIONAL_TRIPS: RegionalTrip[] = [
  {
    id: 'rt1',
    vehicle: 'DK-2145-AB',
    driver: 'Ibrahima Sarr',
    route: 'Yoff → RN1 Km 45',
    date: '15/09/2026',
    duration: '28 min',
    km: 19,
    alerts: 1,
    score: 84,
  },
  {
    id: 'rt2',
    vehicle: 'DK-4471-EF',
    driver: 'Moussa Diop',
    route: 'Médina → Avenue Bourguiba',
    date: '15/09/2026',
    duration: '22 min',
    km: 14,
    alerts: 1,
    score: 88,
  },
  {
    id: 'rt3',
    vehicle: 'DK-1187-GH',
    driver: 'Fatou Camara',
    route: 'Guédiawaye → Pikine',
    date: '15/09/2026',
    duration: '19 min',
    km: 11,
    alerts: 2,
    score: 79,
  },
  {
    id: 'rt4',
    vehicle: 'DK-0932-CD',
    driver: 'Aïssatou Ndao',
    route: 'Plateau → Rond-point Liberté',
    date: '14/09/2026',
    duration: '15 min',
    km: 8,
    alerts: 0,
    score: 95,
  },
  {
    id: 'rt5',
    vehicle: 'DK-2803-IJ',
    driver: 'Cheikh Fall',
    route: 'Ouakam → Technopole',
    date: '14/09/2026',
    duration: '24 min',
    km: 16,
    alerts: 1,
    score: 90,
  },
  {
    id: 'rt6',
    vehicle: 'DK-2145-AB',
    driver: 'Ibrahima Sarr',
    route: 'RN1 Km 45 → Centre-ville',
    date: '13/09/2026',
    duration: '31 min',
    km: 21,
    alerts: 2,
    score: 81,
  },
  {
    id: 'rt7',
    vehicle: 'DK-4471-EF',
    driver: 'Moussa Diop',
    route: 'Avenue Bourguiba → Médina',
    date: '13/09/2026',
    duration: '20 min',
    km: 13,
    alerts: 0,
    score: 93,
  },
  {
    id: 'rt8',
    vehicle: 'DK-1187-GH',
    driver: 'Fatou Camara',
    route: 'Pikine → Route de Rufisque',
    date: '12/09/2026',
    duration: '17 min',
    km: 9,
    alerts: 1,
    score: 87,
  },
]

export type DeviceEventType = 'connexion' | 'deconnexion' | 'maintenance'

export interface DeviceHistoryEntry {
  id: string
  deviceId: string
  vehicle?: string
  event: DeviceEventType
  date: string
  time: string
  detail: string
}

/** Journal de connectivité des boîtiers IoT de la région. */
export const DEVICE_HISTORY: DeviceHistoryEntry[] = [
  {
    id: 'dh1',
    deviceId: 'SR-03',
    vehicle: undefined,
    event: 'deconnexion',
    date: '15/09/2026',
    time: '14:18',
    detail: 'Pikine — perte de signal depuis 42 min',
  },
  {
    id: 'dh2',
    deviceId: 'SR-07',
    vehicle: 'DK-2803-IJ',
    event: 'deconnexion',
    date: '15/09/2026',
    time: '13:35',
    detail: 'Technopole — coupure prolongée',
  },
  {
    id: 'dh3',
    deviceId: 'SR-01',
    vehicle: 'DK-2145-AB',
    event: 'connexion',
    date: '15/09/2026',
    time: '08:02',
    detail: 'Reconnexion automatique après redémarrage',
  },
  {
    id: 'dh4',
    deviceId: 'SR-05',
    vehicle: 'DK-4471-EF',
    event: 'maintenance',
    date: '14/09/2026',
    time: '16:40',
    detail: 'Mise à jour du firmware effectuée',
  },
  {
    id: 'dh5',
    deviceId: 'SR-02',
    vehicle: 'DK-0932-CD',
    event: 'connexion',
    date: '14/09/2026',
    time: '07:55',
    detail: 'Mise en service du boîtier',
  },
  {
    id: 'dh6',
    deviceId: 'SR-06',
    vehicle: 'DK-1187-GH',
    event: 'connexion',
    date: '13/09/2026',
    time: '09:12',
    detail: 'Reconnexion après coupure réseau',
  },
  {
    id: 'dh7',
    deviceId: 'SR-04',
    vehicle: undefined,
    event: 'maintenance',
    date: '12/09/2026',
    time: '11:20',
    detail: 'Contrôle technique périodique',
  },
]

export interface HistoryDayStat {
  date: string
  trajets: number
  distanceKm: number
  boitiersActifs: number
  disponibilite: number
}

/** Série des 7 derniers jours — alimente le graphique à bascule de la page Historique. */
export const HISTORY_WEEK_STATS: HistoryDayStat[] = [
  { date: '09/09', trajets: 9, distanceKm: 96, boitiersActifs: 6, disponibilite: 82 },
  { date: '10/09', trajets: 11, distanceKm: 118, boitiersActifs: 7, disponibilite: 88 },
  { date: '11/09', trajets: 8, distanceKm: 84, boitiersActifs: 6, disponibilite: 79 },
  { date: '12/09', trajets: 12, distanceKm: 131, boitiersActifs: 7, disponibilite: 90 },
  { date: '13/09', trajets: 10, distanceKm: 107, boitiersActifs: 6, disponibilite: 85 },
  { date: '14/09', trajets: 9, distanceKm: 99, boitiersActifs: 7, disponibilite: 91 },
  { date: '15/09', trajets: 7, distanceKm: 76, boitiersActifs: 6, disponibilite: 86 },
]
