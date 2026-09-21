export type VehicleStatus = 'en_route' | 'stationne' | 'hors_ligne'

export interface ConnectedVehicle {
  id: string
  matricule: string
  driverName: string
  status: VehicleStatus
  speed: number
  lastUpdate: string
  /** Trace récente du trajet — le dernier point est la position actuelle. */
  path: [number, number][]
}

/** Véhicules connectés circulant (ou récemment vus) dans la région du Sous-Admin. */
export const CONNECTED_VEHICLES: ConnectedVehicle[] = [
  {
    id: 'v1',
    matricule: 'DK-2145-AB',
    driverName: 'Ibrahima Sarr',
    status: 'en_route',
    speed: 62,
    lastUpdate: 'il y a 30 s',
    path: [
      [14.7801, -17.3766],
      [14.7732, -17.3811],
      [14.7688, -17.3844],
      [14.7645, -17.3877],
    ],
  },
  {
    id: 'v2',
    matricule: 'DK-0932-CD',
    driverName: 'Aïssatou Ndao',
    status: 'stationne',
    speed: 0,
    lastUpdate: 'il y a 4 min',
    path: [
      [14.694, -17.4498],
      [14.6975, -17.4527],
      [14.7008, -17.4559],
    ],
  },
  {
    id: 'v3',
    matricule: 'DK-4471-EF',
    driverName: 'Moussa Diop',
    status: 'en_route',
    speed: 45,
    lastUpdate: 'il y a 45 s',
    path: [
      [14.6612, -17.4291],
      [14.665, -17.4331],
      [14.6689, -17.4358],
      [14.6726, -17.4381],
    ],
  },
  {
    id: 'v4',
    matricule: 'DK-1187-GH',
    driverName: 'Fatou Camara',
    status: 'en_route',
    speed: 71,
    lastUpdate: 'il y a 15 s',
    path: [
      [14.741, -17.402],
      [14.7481, -17.3979],
      [14.7519, -17.3941],
      [14.7549, -17.3903],
    ],
  },
  {
    id: 'v5',
    matricule: 'DK-2803-IJ',
    driverName: 'Cheikh Fall',
    status: 'hors_ligne',
    speed: 0,
    lastUpdate: 'il y a 25 min',
    path: [
      [14.7189, -17.4581],
      [14.7217, -17.4613],
      [14.7245, -17.4644],
    ],
  },
]

export const VEHICLE_STATUS_META: Record<VehicleStatus, { label: string; color: string; soft: string; text: string }> = {
  en_route: { label: 'En circulation', color: '#2b6cb0', soft: '#e8f0f9', text: '#2b6cb0' },
  stationne: { label: 'À l\'arrêt', color: '#e8940c', soft: '#fdf4e6', text: '#e8940c' },
  hors_ligne: { label: 'Hors ligne', color: '#94a3b8', soft: '#f1f5f9', text: '#64748b' },
}
