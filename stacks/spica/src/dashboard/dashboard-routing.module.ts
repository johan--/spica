import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {Route, RouteCategory, RouteModule} from "@spica-client/core";
import {IdentityGuard, PolicyGuard} from "../passport";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";

const routes: Routes = [
  {pathMatch: "full", path: "", redirectTo: "dashboard"},
  {
    path: "dashboard",
    canActivate: [IdentityGuard, PolicyGuard],
    component: DashboardComponent
  }
];

const route: Route[] = [
  {
    id: "dashboard",
    category: RouteCategory.Primary,
    icon: "dashboard",
    path: "/dashboard",
    display: "Dashboard"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouteModule.forChild(route)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
