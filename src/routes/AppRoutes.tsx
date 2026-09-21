import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ClientLayout } from '@/components/layout/ClientLayout'
import { PageStub } from '@/components/layout/PageStub'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { SuperAdminLayout } from '@/components/layout/SuperAdminLayout'
import { AlertesPage as AdminAlertesPage } from '@/pages/admin/AlertesPage'
import { CarteRegionalePage } from '@/pages/admin/CarteRegionalePage'
import { DashboardPage as AdminDashboardPage } from '@/pages/admin/DashboardPage'
import { HistoriquePage as AdminHistoriquePage } from '@/pages/admin/HistoriquePage'
import { AccueilPage as ClientAccueilPage } from '@/pages/client/AccueilPage'
import { AlertesPage } from '@/pages/client/AlertesPage'
import { CarteZonesPage } from '@/pages/client/CarteZonesPage'
import { ProfilPage } from '@/pages/client/ProfilPage'
import { SignalementsPage } from '@/pages/client/SignalementsPage'
import { TrajetsPage } from '@/pages/client/TrajetsPage'
import { AccueilPage } from '@/pages/site/AccueilPage'
import { ActualitesPage } from '@/pages/site/ActualitesPage'
import { AProposPage } from '@/pages/site/AProposPage'
import { ArticlePage } from '@/pages/site/ArticlePage'
import { CartePage } from '@/pages/site/CartePage'
import { ConnexionPage } from '@/pages/site/ConnexionPage'
import { ContactPage } from '@/pages/site/ContactPage'
import { InscriptionPage } from '@/pages/site/InscriptionPage'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { PATHS } from '@/routes/paths'

export function AppRoutes() {
  return (
    <Routes>
      {/* Site vitrine */}
      <Route element={<SiteLayout />}>
        <Route path={PATHS.home} element={<AccueilPage />} />
        <Route path={PATHS.carte} element={<CartePage />} />
        <Route path={PATHS.aPropos} element={<AProposPage />} />
        <Route path={PATHS.actualites} element={<ActualitesPage />} />
        <Route path={PATHS.articlePattern} element={<ArticlePage />} />
        <Route path={PATHS.contact} element={<ContactPage />} />
      </Route>
      <Route path={PATHS.connexion} element={<ConnexionPage />} />
      <Route path={PATHS.inscription} element={<InscriptionPage />} />

      {/* Conducteur / Client */}
      <Route element={<ProtectedRoute allowedRoles={['conducteur']} />}>
        <Route element={<ClientLayout />}>
          <Route path={PATHS.client.root} element={<ClientAccueilPage />} />
          <Route path={PATHS.client.carte} element={<CarteZonesPage />} />
          <Route path={PATHS.client.alertes} element={<AlertesPage />} />
          <Route path={PATHS.client.trajets} element={<TrajetsPage />} />
          <Route path={PATHS.client.signalements} element={<SignalementsPage />} />
          <Route path={PATHS.client.profil} element={<ProfilPage />} />
        </Route>
      </Route>

      {/* Sous-Admin */}
      <Route element={<ProtectedRoute allowedRoles={['sous_admin', 'anaser']} />}>
        <Route element={<AdminLayout />}>
          <Route path={PATHS.admin.root} element={<AdminDashboardPage />} />
          <Route path={PATHS.admin.monitoring} element={<PageStub title="Monitoring IoT" />} />
          <Route path={PATHS.admin.carte} element={<CarteRegionalePage />} />
          <Route path={PATHS.admin.incidents} element={<PageStub title="Incidents" />} />
          <Route path={PATHS.admin.zones} element={<PageStub title="Zones à valider" />} />
          <Route path={PATHS.admin.alertes} element={<AdminAlertesPage />} />
          <Route path={PATHS.admin.boitiers} element={<PageStub title="Boîtiers" />} />
          <Route path={PATHS.admin.statistiques} element={<PageStub title="Statistiques" />} />
          <Route path={PATHS.admin.historique} element={<AdminHistoriquePage />} />
        </Route>
      </Route>

      {/* Super Admin */}
      <Route element={<ProtectedRoute allowedRoles={['super_admin']} />}>
        <Route element={<SuperAdminLayout />}>
          <Route path={PATHS.superAdmin.root} element={<PageStub title="Dashboard national" />} />
          <Route path={PATHS.superAdmin.utilisateurs} element={<PageStub title="Utilisateurs" />} />
          <Route path={PATHS.superAdmin.boitiers} element={<PageStub title="Boîtiers" />} />
          <Route path={PATHS.superAdmin.incidents} element={<PageStub title="Incidents" />} />
          <Route path={PATHS.superAdmin.zones} element={<PageStub title="Zones" />} />
          <Route path={PATHS.superAdmin.statistiques} element={<PageStub title="Statistiques" />} />
          <Route path={PATHS.superAdmin.configuration} element={<PageStub title="Configuration" />} />
          <Route path={PATHS.superAdmin.notifications} element={<PageStub title="Notifications" />} />
          <Route path={PATHS.superAdmin.rapports} element={<PageStub title="Rapports" />} />
          <Route path={PATHS.superAdmin.logs} element={<PageStub title="Logs" />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={PATHS.home} replace />} />
    </Routes>
  )
}
