/**
 * Created by david on 22.04.17.
 */
import CONST from '../../constant';

class notesService {
    constructor($q, localStorageService){
        this.localStorage = localStorageService;
        this.$q = $q;
    }

    addNote(note){
        let deferred = this.$q.defer();
        let notes = this.localStorage.get(CONST.NOTES);
        if(notes == undefined){
            notes = [];
        }
        notes.push(note);
        let result = this.localStorage.set(CONST.NOTES, notes);

        if(result){
            deferred.resolve({data:notes, msg: 'Add note successfully'});
        } else {
            deferred.reject({data:null, msg: 'Error!'});
        }
        return deferred.promise;
    }

    updateNote(note){
        let deferred = this.$q.defer();
        let notes = this.localStorage.get(CONST.NOTES);
        _.map(notes, (n, index) => {
            if(n.id == note.id){
                notes[index] =  note;
            }
        });
        let result = this.localStorage.set(CONST.NOTES, notes);

        if(result){
            deferred.resolve({data:notes, msg: 'Update note successfully'});
        } else {
            deferred.reject({data:null, msg: 'Error!'});
        }
        return deferred.promise;
    }

    removeNote(id){
        let deferred = this.$q.defer();
        let notes = this.localStorage.get(CONST.NOTES);
        _.remove(notes, {id:id});
        let result = this.localStorage.set(CONST.NOTES, notes);

        if(result){
            deferred.resolve({data:notes, msg: 'Remove note successfully'});
        } else {
            deferred.reject({data:null, msg: 'Error!'});
        }
        return deferred.promise;
    }

    getAllNotes() {
        let deferred = this.$q.defer();
        let result = this.localStorage.get(CONST.NOTES) || [];
        if(result){
            deferred.resolve({data:result, msg: 'All notes got it successfully'});
        }
        else {
            deferred.reject({data:null, msg: 'Error! We didn\'t get notes!'});
        }
        return deferred.promise;
    }
}

notesService.$inject = ['$q', 'localStorageService'];
export default notesService;