/**
 * Created by david on 23.04.17.
 */

import '../style/viewNote.less';
import _ from 'lodash';

class noteViewController{

    constructor($stateParams, labelsService, categoriesService, notesService, colorsService) {
        this.colorsService = colorsService;
        this.notesService = notesService;
        this.categoriesService = categoriesService;
        this.labelsService = labelsService;
        this.note = $stateParams.note;

        this.isEdit = false;
        this.data= {};

        this.init();
    }

    init(){
        this.getAllLabels();
        this.getAllCategory();
        this.getAllColors();
    };

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

    getAllColors(){
        this.colorsService.getAllColors()
            .then(res => {
                this.data.colors = res.data;
            }, err => {
                console.log(err)
            })
    }

    addItem(type, item){
        item = _.trim(item);
        switch (type){
            case 'labels':
                if(_.isUndefined(_.find(this.note.labels, l => l == item)) && item != ''){
                    this.note.labels.push(item);
                }
                break;
            case 'parent_category':
                if(this.note.categories.name != item){
                    this.note.categories.name = item;
                    this.note.categories.category = [];
                }
                break;
            case 'category':
                if(_.isUndefined(_.find(this.note.categories.category, c => c == item)) && item != ''){
                    this.note.categories.category.push(item)
                }
                break;
        }
    }

    getSubcategory(){
         let array =  _.find(this.data.categories, c => {
             if(c.category_parent.name == this.note.categories.name){
                 return c;
             }
         });
         if(array){
             return array.category_parent.category
         }
         return null;
    }

    updateNote(){
        this.notesService.updateNote(this.note)
            .then(res => {
                this.isEdit = false;
            }, err => {
                console.log(err)
            });
    }

    remove(type, item){
        switch (type){
            case 'parent_category':
                this.note.categories.name = null;
                this.note.categories.category = [];
                break;
            case 'labels':
                _.remove(this.note[type], l => l == item);
                break;
            case 'category':
                _.remove(this.note.categories.category, c => c == item);
                break;

            default : return;
        }
    }
}

noteViewController.$inject = ['$stateParams', 'labelsService', 'categoriesService', 'notesService', 'colorsService'];
export default noteViewController;