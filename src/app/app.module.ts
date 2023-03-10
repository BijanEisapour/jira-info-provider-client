import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HeaderModule} from './components/header/header.module';

import {HomeModule} from './pages/home/home.module';

import {PipesModule} from './pipes/pipes.module';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {fa_IR} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import fa from '@angular/common/locales/fa';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxEchartsModule} from 'ngx-echarts';

registerLocaleData(fa);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HeaderModule,
        HomeModule,
        PipesModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),
    ],
    providers: [{provide: NZ_I18N, useValue: fa_IR}],
    bootstrap: [AppComponent],
})
export class AppModule {}
