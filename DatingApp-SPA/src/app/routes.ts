import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { LogoutComponent } from './logout/logout.component';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { MessagesComponent } from './messages/messages.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    {
        path: 'members', component: MemberListComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
        resolve: { users: MemberListResolver }
    },
    {
        path: 'members/:id', component: MemberDetailComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
        resolve: { user: MemberDetailResolver }
    },
    {
        path: 'member/edit', component: MemberEditComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
        resolve: { user: MemberEditResolver }, canDeactivate: [PreventUnsavedChanges]
    },
    {
        path: 'messages', component: MessagesComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
        resolve: {messages: MessagesResolver}
    },
    {
        path: 'lists', component: ListsComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
        resolve: { users: ListsResolver }
    },
    { path: 'logout', component: LogoutComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
