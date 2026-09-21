import { useMemo, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import {
  DEVICE_HISTORY,
  HISTORY_WEEK_STATS,
  REGIONAL_TRIPS,
  type DeviceEventType,
  type DeviceHistoryEntry,
  type RegionalTrip,
} from '@/data/adminHistorique'

type MetricKey = 'trajets' | 'distanceKm' | 'boitiersActifs' | 'disponibilite'
type TableTab = 'trajets' | 'boitiers'

const METRICS: { key: MetricKey; label: string; color: string; unit: string }[] = [
  { key: 'trajets', label: 'Trajets', color: '#2b6cb0', unit: '' },
  { key: 'distanceKm', label: 'Distance', color: '#0e9e7a', unit: ' km' },
  { key: 'boitiersActifs', label: 'Boîtiers actifs', color: '#7c3aed', unit: '' },
  { key: 'disponibilite', label: 'Disponibilité', color: '#e8940c', unit: '%' },
]

const EVENT_META: Record<DeviceEventType, { label: string; icon: string; fg: string; bg: string }> = {
  connexion: { label: 'Connexion', icon: 'wifi', fg: '#1f9d55', bg: '#e9f6ee' },
  deconnexion: { label: 'Déconnexion', icon: 'wifi_off', fg: '#dc3a2f', bg: '#fdeeec' },
  maintenance: { label: 'Maintenance', icon: 'build', fg: '#2b6cb0', bg: '#e8f0f9' },
}

function alertBadge(count: number): { label: string; fg: string; bg: string } {
  if (count === 0) return { label: 'Aucune', fg: '#1f9d55', bg: '#e9f6ee' }
  if (count <= 2) return { label: `${count} alerte${count > 1 ? 's' : ''}`, fg: '#e8940c', bg: '#fdf4e6' }
  return { label: `${count} alertes`, fg: '#dc3a2f', bg: '#fdeeec' }
}

function scoreBadge(score: number): { tint: string; bg: string; icon: string } {
  if (score >= 90) return { tint: '#1f9d55', bg: '#e9f6ee', icon: 'verified' }
  if (score >= 80) return { tint: '#e8940c', bg: '#fdf4e6', icon: 'shield' }
  return { tint: '#dc3a2f', bg: '#fdeeec', icon: 'warning' }
}

function HistoryBarChart({ metric }: { metric: MetricKey }) {
  const max = useMemo(() => Math.max(...HISTORY_WEEK_STATS.map((d) => d[metric]), 1), [metric])
  const color = METRICS.find((m) => m.key === metric)!.color

  return (
    <div className="flex h-[150px] items-end gap-2.5">
      {HISTORY_WEEK_STATS.map((d) => (
        <div key={d.date} className="flex min-w-0 flex-1 flex-col items-center gap-2">
          <div className="flex h-[112px] w-full items-end">
            <div
              className="w-full rounded-t-[5px] transition-all"
              style={{ height: `${(d[metric] / max) * 100}%`, backgroundColor: color, minHeight: 4 }}
              title={`${d.date} : ${d[metric]}`}
            />
          </div>
          <span className="text-[10px] font-semibold text-faint">{d.date}</span>
        </div>
      ))}
    </div>
  )
}

function TripRow({ trip }: { trip: RegionalTrip }) {
  const alert = alertBadge(trip.alerts)
  const score = scoreBadge(trip.score)
  return (
    <div className="flex flex-wrap items-start gap-4 border-b border-page px-5 py-4 last:border-b-0 sm:items-center sm:flex-nowrap">
      <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-xl bg-info-50 text-info-600">
        <span className="ic text-[22px]">route</span>
      </span>

      <div className="min-w-0 flex-1 basis-[190px]">
        <p className="m-0 text-sm font-extrabold leading-tight text-ink">{trip.route}</p>
        <p className="m-0 mt-1.5 text-[11.5px] font-medium text-muted">
          {trip.vehicle} · {trip.driver}
        </p>
      </div>

      <span className="flex-none whitespace-nowrap text-[11px] font-semibold text-faint sm:min-w-[110px]">
        {trip.date} · {trip.duration}
      </span>

      <span className="flex-none whitespace-nowrap font-mono text-[13px] font-bold text-ink sm:min-w-[64px]">
        {trip.km} km
      </span>

      <span
        className="flex-none whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-bold"
        style={{ color: alert.fg, background: alert.bg }}
      >
        {alert.label}
      </span>

      <span
        className="flex flex-none items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-[12.5px] font-extrabold"
        style={{ color: score.tint, background: score.bg }}
      >
        <span className="ic text-[15px]">{score.icon}</span>
        {trip.score}/100
      </span>
    </div>
  )
}

function DeviceRow({ entry }: { entry: DeviceHistoryEntry }) {
  const meta = EVENT_META[entry.event]
  return (
    <div className="flex flex-wrap items-start gap-4 border-b border-page px-5 py-4 last:border-b-0 sm:items-center sm:flex-nowrap">
      <span
        className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-xl"
        style={{ background: meta.bg, color: meta.fg }}
      >
        <span className="ic text-[22px]">{meta.icon}</span>
      </span>

      <div className="min-w-0 flex-1 basis-[190px]">
        <p className="m-0 text-sm font-extrabold leading-tight text-ink">Boîtier {entry.deviceId}</p>
        <p className="m-0 mt-1.5 text-[11.5px] font-medium text-muted">{entry.detail}</p>
      </div>

      <span className="flex-none whitespace-nowrap font-mono text-[12px] font-bold text-body sm:min-w-[90px]">
        {entry.vehicle ?? '—'}
      </span>

      <span
        className="flex-none whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-bold"
        style={{ color: meta.fg, background: meta.bg }}
      >
        {meta.label}
      </span>

      <span className="flex-none whitespace-nowrap text-[11.5px] font-semibold text-faint">
        {entry.date} · {entry.time}
      </span>
    </div>
  )
}

export function HistoriquePage() {
  const { user } = useAuth()
  const region = user?.region ?? 'Dakar'
  const [tab, setTab] = useState<TableTab>('trajets')
  const [metric, setMetric] = useState<MetricKey>('trajets')

  const kpis = useMemo(() => {
    const count = REGIONAL_TRIPS.length
    const totalKm = REGIONAL_TRIPS.reduce((sum, t) => sum + t.km, 0)
    const avgScore = Math.round(REGIONAL_TRIPS.reduce((sum, t) => sum + t.score, 0) / count)
    const activeDevices = HISTORY_WEEK_STATS[HISTORY_WEEK_STATS.length - 1].boitiersActifs
    const avgAvailability = Math.round(
      HISTORY_WEEK_STATS.reduce((sum, d) => sum + d.disponibilite, 0) / HISTORY_WEEK_STATS.length,
    )
    return [
      { value: String(count), label: 'Trajets effectués', tint: '#2b6cb0' },
      { value: `${totalKm} km`, label: 'Distance totale', tint: '#0e9e7a' },
      { value: `${avgScore}/100`, label: 'Score moyen', tint: scoreBadge(avgScore).tint },
      { value: String(activeDevices), label: 'Boîtiers actifs', tint: '#7c3aed' },
      { value: `${avgAvailability}%`, label: 'Disponibilité moyenne', tint: '#e8940c' },
    ]
  }, [])

  return (
    <div>
      <section className="mx-6 mt-5 flex flex-wrap items-end justify-between gap-3.5">
        <div className="min-w-0">
          <h1 className="text-[clamp(23px,2.8vw,30px)] font-extrabold leading-[1.15] tracking-[-0.026em] text-ink">
            Historique
          </h1>
          <p className="mt-2.5 text-sm leading-6 text-body">
            Trajets des véhicules connectés et activité des boîtiers de {region}.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <select
            defaultValue="7"
            className="min-h-[44px] rounded-[10px] border-[1.5px] border-line bg-white px-4 text-[13px] font-medium text-ink outline-none"
          >
            <option value="7">7 derniers jours</option>
            <option value="30">30 derniers jours</option>
            <option value="12m">12 derniers mois</option>
          </select>
          <button
            type="button"
            className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-[10px] border-[1.5px] border-line bg-white px-[18px] text-[13px] font-bold text-ink transition-colors hover:bg-page"
          >
            <span className="ic text-lg">download</span>
            Exporter
          </button>
        </div>
      </section>

      <section className="mx-6 mt-4.5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="min-w-0 rounded-2xl border border-line bg-white p-5 shadow-card">
            <p
              className="m-0 font-mono text-[26px] font-extrabold leading-none tracking-tight"
              style={{ color: kpi.tint }}
            >
              {kpi.value}
            </p>
            <p className="m-0 mt-2.5 text-[12.5px] font-semibold text-body">{kpi.label}</p>
          </div>
        ))}
      </section>

      <section className="mx-6 mt-4.5 rounded-2xl border border-line bg-white p-5 shadow-card">
        <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
          <p className="m-0 text-sm font-extrabold text-ink">Évolution — 7 derniers jours</p>
          <span className="text-[11px] font-semibold text-faint">Survolez une barre pour le détail</span>
        </div>
        <div className="mb-4 flex flex-wrap gap-1.5 rounded-full bg-page p-1">
          {METRICS.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setMetric(m.key)}
              className={`flex-1 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
                metric === m.key ? 'bg-white text-ink shadow-card' : 'text-faint'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <HistoryBarChart metric={metric} />
      </section>

      <section className="mx-6 mt-4.5 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => setTab('trajets')}
          className={`whitespace-nowrap rounded-full border-[1.5px] px-5 py-3 text-[12.5px] font-bold transition-colors ${
            tab === 'trajets'
              ? 'border-brand-600 bg-brand-600 text-white'
              : 'border-line bg-white text-body hover:border-brand-200'
          }`}
        >
          Trajets véhicules ({REGIONAL_TRIPS.length})
        </button>
        <button
          type="button"
          onClick={() => setTab('boitiers')}
          className={`whitespace-nowrap rounded-full border-[1.5px] px-5 py-3 text-[12.5px] font-bold transition-colors ${
            tab === 'boitiers'
              ? 'border-brand-600 bg-brand-600 text-white'
              : 'border-line bg-white text-body hover:border-brand-200'
          }`}
        >
          Appareils connectés ({DEVICE_HISTORY.length})
        </button>
      </section>

      <section className="mx-6 mb-6 mt-4 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <div className="flex flex-col">
          {tab === 'trajets'
            ? REGIONAL_TRIPS.map((trip) => <TripRow key={trip.id} trip={trip} />)
            : DEVICE_HISTORY.map((entry) => <DeviceRow key={entry.id} entry={entry} />)}
        </div>
      </section>
    </div>
  )
}
