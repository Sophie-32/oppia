// Copyright 2021 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Module for the contributor-dashboard-admin page.
 */

import { CommonModule } from '@angular/common';

import { APP_INITIALIZER, NgModule, StaticProvider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { downgradeComponent } from '@angular/upgrade/static';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RequestInterceptor } from 'services/request-interceptor.service';
import { SharedComponentsModule } from 'components/shared-component.module';
import { OppiaAngularRootComponent } from 'components/oppia-angular-root.component';
import { ContributorDashboardAdminNavbarComponent } from './navbar/contributor-dashboard-admin-navbar.component';
import { ContributorAdminDashboardPageComponent } from './contributor-admin-dashboard-page.component';
import { ContributorAdminStatsTable } from './contributor-dashboard-tables/contributor-admin-stats-table.component';
import { platformFeatureInitFactory, PlatformFeatureService } from 'services/platform-feature.service';
import { SmartRouterModule } from 'hybrid-router-module-provider';
import { TopicFilterComponent } from './topic-filter/topic-filter.component';
import { ToastrModule } from 'ngx-toastr';
import { MyHammerConfig, toastrConfig } from 'pages/oppia-root/app.module';
import { AppErrorHandlerProvider } from 'pages/oppia-root/app-error-handler';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    // TODO(#13443): Remove smart router module provider once all pages are
    // migrated to angular router.
    SmartRouterModule,
    RouterModule.forRoot([]),
    ReactiveFormsModule,
    SharedComponentsModule,
    ToastrModule.forRoot(toastrConfig)
  ],
  declarations: [
    ContributorDashboardAdminNavbarComponent,
    ContributorAdminDashboardPageComponent,
    ContributorAdminStatsTable,
    TopicFilterComponent
  ],
  entryComponents: [
    ContributorDashboardAdminNavbarComponent,
    ContributorAdminDashboardPageComponent,
    ContributorAdminStatsTable,
    TopicFilterComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: platformFeatureInitFactory,
      deps: [PlatformFeatureService],
      multi: true
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    AppErrorHandlerProvider,
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ]
})
class ContributorDashboardAdminPageModule {
  // Empty placeholder method to satisfy the `Compiler`.
  ngDoBootstrap() {}
}

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { downgradeModule } from '@angular/upgrade/static';

const bootstrapFnAsync = async(extraProviders: StaticProvider[]) => {
  const platformRef = platformBrowserDynamic(extraProviders);
  return platformRef.bootstrapModule(ContributorDashboardAdminPageModule);
};
const downgradedModule = downgradeModule(bootstrapFnAsync);

declare var angular: ng.IAngularStatic;

angular.module('oppia').requires.push(downgradedModule);

angular.module('oppia').directive(
  // This directive is the downgraded version of the Angular component to
  // bootstrap the Angular 8.
  'oppiaAngularRoot',
  downgradeComponent({
    component: OppiaAngularRootComponent
  }) as angular.IDirectiveFactory);
