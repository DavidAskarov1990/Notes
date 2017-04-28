/**
 * Created by david on 20.04.17.
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import LocalStorageModule from 'angular-local-storage';
import CONST  from './constant';
import './src/filter/filter';

import * as route from './src/router';
import * as controllers from './src/controller';
import * as services from './src/services';
import * as directives from './src/directives';

angular.module('appNotes', [
    uiRouter,
    LocalStorageModule,
    'myFilterNote'
])
    .controller(controllers)
    .service(services)
    .directive(directives)
    .config(route.note)
    .run((localStorageService, $http) => {
        $http.get('data.json').then(res => {
            localStorageService.set(CONST.LABELS, res.data[CONST.LABELS]);
            localStorageService.set(CONST.CATEGORY, res.data[CONST.CATEGORY]);
            localStorageService.set(CONST.COLOR, res.data[CONST.COLOR]);
        });
    });







