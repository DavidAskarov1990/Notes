
import './view/item-note/note.less';

class noteDirective {
    constructor(notesService, $rootScope){
        this.$rootScope = $rootScope;
        this.notesService = notesService;

        this.templateUrl = 'src/directives/view/item-note/note.html';
        this.restrict = 'E';
        this.scope = {
            note:'=noteData'
        };
    }

    link(scope){

        scope.contraction = (type, text) => {
           if(!text){
                return;
           }
           let count = type == 'title' ? 16 : 230;
           if(text.length > count){
               let convertText = '';
               _.times(count, c =>{
                   convertText += text[c];
               });
               convertText += '...';
               return convertText;
           } else {
               return text;
           }
        };

        scope.removeNote = (id) => {
            this.notesService.removeNote(id)
                .then(res => {
                    this.$rootScope.$broadcast('remove-note', {id:id})
                }, err => {
                    console.log(err)
                })
        }
    }
}

noteDirective.$$ngIsClass = true;

export default noteDirective;