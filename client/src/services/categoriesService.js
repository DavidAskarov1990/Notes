/**
 * Created by david on 20.04.17.
 */

import CONST  from '../../constant';

class categoriesService{
    constructor(localStorageService, $q){
        this.$q = $q;
        this.localStorage = localStorageService;
    }

    getAllCategories() {
        let deferred = this.$q.defer();
        let result = this.localStorage.get(CONST.CATEGORY);
        if(result){
            deferred.resolve({data:result, msg: 'All categories got it successfully'});
        } else {
            deferred.reject({data:null, msg: 'Error! We didn\'t get categories'});
        }
        return deferred.promise;
    }

    addCategory(category){
        let deferred = this.$q.defer();
        let result = this.localStorage.set(CONST.CATEGORY, category);
        if(result){
            deferred.resolve({data:result, msg: 'Add new categories is successfully'});
        } else {
            deferred.reject({data:null, msg: 'Error!'});
        }
        return deferred.promise;
    }


    removeCategory(categories){
        let deferred = this.$q.defer();
        let result = this.localStorage.set(CONST.CATEGORY, categories);
        if(result){
            deferred.resolve({data:result, msg: 'Remove category is successfully'});
        } else {
            deferred.reject({data:null, msg: 'Error!'});
        }
        return deferred.promise;
    }

}

categoriesService.$inject = ['localStorageService', '$q'];
export default categoriesService;