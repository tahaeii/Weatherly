import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "src/app/components/home/home.component";

const routes: Routes = [ // Add Components

    //   { path: "XXX", component: XXXComponent },
    //   { path: "XXX/:id", component: XXXComponent },

    { path: '', component: HomeComponent }, // canActivate: [AuthGuard]
    // { path: 'login', component: AuthComponent },
    // { path: 'panel', component: PanelComponent, canActivate: [AuthGuard]},

    // { path: "blogs", component: BlogDraftComponent },
    // { path: "blogs/:id", component: BlogDraftDetailsComponent },


    // { path: "panel", loadChildren: () => import('../../core/module/panel-components.module').then(m => m.PanelComponentsModule)}


];

export const HomeRoutes = RouterModule.forChild(routes);
