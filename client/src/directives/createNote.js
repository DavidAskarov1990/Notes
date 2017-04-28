/**
 * Created by david on 21.04.17.
 */

import './view/create-note/createNote.less';
import CONST  from '../../constant';
import _ from 'lodash';

class createNoteDirective {

    constructor(localStorageService, notesService){
        this.localStorageService = localStorageService;
        this.notesService = notesService;

        this.templateUrl = 'src/directives/view/create-note/createNote.html';
        this.restrict = 'E';
        this.scope = {
            isCreate:'=',
            data:'='
        };
    }

    link(scope){
        scope.colors = this.localStorageService.get(CONST.COLOR);
        scope.page = 1;
        scope.newNote = {};
        scope.selectCategory = {};
        scope.selectLabel = [];
        scope.selectColor = scope.colors ? scope.colors[0] : "#FFFACD";

        scope.dismiss = () => {
            scope.isCreate = false;
        };

        scope.next = (action) => {
            if(action == 1){
                scope.page = scope.page >= 5 ? 5 : scope.page + 1;
            } else {
                scope.page = scope.page < 1 ? 1 : scope.page - 1;
            }
        };

        scope.getCategory = () => {
            return (_.find(scope.data.categories, c => {
                if(c.category_parent.name == _.trim(scope.selectCategory.name)){
                    return c.category_parent.category;
                }
            })).category_parent.category;
        };

        scope.addCategory = (type, param) => {
            if(!param || param==''){
                return;
            }
            switch (type){
                case 'parent':
                    if(scope.selectCategory.name != param){
                        scope.selectCategory.category = [];
                        scope.selectCategory.name = _.trim(param);
                    }
                    break;
                case 'category':{
                    scope.selectCategory.category = scope.selectCategory.category ? scope.selectCategory.category : [];
                    scope.selectCategory.category.push(_.trim(param));
                    scope.selectCategory.category = _.uniq(scope.selectCategory.category);
                    break;
                }
                case 'label':
                    scope.selectLabel = scope.selectLabel ? scope.selectLabel : [];
                    scope.selectLabel.push(_.trim(param));
                    scope.selectLabel = _.uniq(scope.selectLabel);
                    break;

                default: return;
            }
        };



        scope.setColor = (color) =>{
            scope.selectColor = color;
        };

        scope.addNote = () => {
            scope.newNote.id = Date.now();
            scope.newNote.categories = scope.selectCategory;
            scope.newNote.labels = scope.selectLabel;
            scope.newNote.color = scope.selectColor;

            if(!scope.newNote.title || scope.newNote.title == ''){
                scope.newNote.title = 'You title';
            }

            this.notesService.addNote(scope.newNote)
                .then(res => {
                    if(scope.data.notes == undefined){
                        scope.data.notes=[];
                    }
                    scope.data.notes.push(scope.newNote);
                }, err => {
                    console.log(err)
            }).finally(()=>{
                scope.dismiss();
            });
        }

        scope.remove = (type, item) => {
            switch (type){
                case 'name':
                    scope.selectCategory = {};
                    break;
                case 'category':
                    _.remove(scope.selectCategory[type], c => c == item);
                    break;
                case 'label':
                    _.remove(scope.selectLabel, l => l == item);
                    break;

                default : return;
            }
        };
    }
}
createNoteDirective.$$ngIsClass = true;

export default createNoteDirective;
