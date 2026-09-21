import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { PATHS } from '@/routes/paths'
import { DashboardLayout } from './DashboardLayout'
import type { SidebarNavItem } from './Sidebar'

const NAV_ITEMS: SidebarNavItem[] = [
  { key: 'dashboard', icon: 'dashboard', label: 'Dashboard national', to: PATHS.superAdmin.root, end: true },
  { key: 'utilisateurs', icon: 'group', label: 'Utilisateurs', to: PATHS.superAdmin.utilisateurs },
  { key: 'boitiers', icon: 'memory', label: 'Boîtiers', to: PATHS.superAdmin.boitiers },
  { key: 'incidents', icon: 'report', label: 'Incidents', to: PATHS.superAdmin.incidents },
  { key: 'zones', icon: 'map', label: 'Zones', to: PATHS.superAdmin.zones },
  { key: 'statistiques', icon: 'bar_chart', label: 'Statistiques', to: PATHS.superAdmin.statistiques },
  { key: 'configuration', icon: 'settings', label: 'Configuration', to: PATHS.superAdmin.configuration },
  { key: 'notifications', icon: 'notifications', label: 'Notifications', to: PATHS.superAdmin.notifications },
  { key: 'rapports', icon: 'summarize', label: 'Rapports', to: PATHS.superAdmin.rapports },
  { key: 'logs', icon: 'terminal', label: 'Logs', to: PATHS.superAdmin.logs },
]

export function SuperAdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const initials = user ? `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase() : ''

  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      homeTo={PATHS.superAdmin.root}
      roleLabel="Super Admin"
      userInitials={initials}
      userName={user ? `${user.firstName} ${user.lastName}` : ''}
      userRole="Super Admin"
      onProfileClick={() => {}}
      onLogoutClick={() => {
        logout()
        navigate(PATHS.connexion)
      }}
      searchPlaceholder="Rechercher…"
    />
  )
}
