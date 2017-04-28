/**
 * Created by david on 20.04.17.
 */

const note = ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/note');

    $stateProvider
        .state('note', {
            url: '/note',
            templateUrl: 'src/view/notes.html',
            controller: 'notesController',
            controllerAs: 'notesCtrl'
        })
        .state('noteView', {
            url: '/note-view',
            templateUrl: 'src/view/note-view.html',
            controller: 'noteViewController',
            controllerAs: 'nv',
            params: {
                note: []
            }
        })
        .state('about', {
            url: '/about',
            templateUrl: 'src/view/about.html',
            controller: 'aboutController',
            controllerAs: 'aboutCtrl'
        })
        .state('tools', {
            url:'/tools',
            templateUrl: 'src/view/tools.html',
            controller: 'toolsController',
            controllerAs: 'toolCtrl'
        })
};

note.$inject = ['$stateProvider', '$urlRouterProvider'];

export default note;
