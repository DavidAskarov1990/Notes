/**
 * Created by david on 20.04.17.
 */

import _ from 'lodash';
import '../style/main.less';
import '../style/notePage.less';

class notesController {

    constructor(notesService, categoriesService, labelsService, $rootScope){
        this.$rootScope = $rootScope;
        this.notesService = notesService;
        this.categoriesService = categoriesService;
        this.labelsService = labelsService;
        this.data = {};
        this.init();

        this.$rootScope.$on('remove-note', (event, data) => {
            this.getAllNotes();
        })
    }

    init(){
        this.getAllLabels();
        this.getAllNotes();
        this.getAllCategory();
    };

    getAllNotes(){
        this.notesService.getAllNotes()
            .then(res => {
                this.data.notes = res.data;
            }, err => {
                console.log(err);
            })
    }

    getAllLabels(){
        this.labelsService.getAllLabels()
            .then(res => {
                this.data.labels = res.data;
            }, err => {
                console.log(err);
            })
    }

    getAllCategory(){
        this.categoriesService.getAllCategories()
            .then(res => {
                this.data.categories = res.data;
            }, err => {
                console.log(err)
            })
    }
}

notesController.$inject = ['notesService', 'categoriesService', 'labelsService', '$rootScope'];

export default notesController;

