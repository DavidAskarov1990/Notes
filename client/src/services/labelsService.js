/**
 * Created by david on 20.04.17.
 */

import CONST  from '../../constant';
import _ from 'lodash';

class labelsService{
    constructor(localStorageService, $q){
        this.$q = $q;
        this.localStorage = localStorageService;
    }

    getAllLabels() {
        let deferred = this.$q.defer();
        let result = this.localStorage.get(CONST.LABELS);
        if(result){
            deferred.resolve({data:result, msg: 'All labels got it successfully'});
        } else {
            deferred.reject({data:null, msg: 'Error! We didn\'t get labels'});
        }
        return deferred.promise;
    }

    addLabel(labels){
        let deferred = this.$q.defer();
        let result = this.localStorage.set(CONST.LABELS, labels);
        if(result){
            deferred.resolve({data:result, msg: 'Add new labels is successfully'});
        } else {
            deferred.reject({data:null, msg: 'Error!'});
        }
        return deferred.promise;
    }

    removeLabel(labels){
        let deferred = this.$q.defer();
        let result = this.localStorage.set(CONST.LABELS, labels);
        if(result){
            deferred.resolve({data:result, msg: 'Remove label is successfully'});
        } else {
            deferred.reject({data:null, msg: 'Error!'});
        }
        return deferred.promise;
    }

}

labelsService.$inject = ['localStorageService', '$q'];
export default labelsService;