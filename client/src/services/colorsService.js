/**
 * Created by david on 25.04.17.
 */
import CONST  from '../../constant';

class colorsService{
    constructor(localStorageService, $q){
        this.$q = $q;
        this.localStorage = localStorageService;
    }

    getAllColors() {
        let deferred = this.$q.defer();
        let result = this.localStorage.get(CONST.COLOR);
        if(result){
            deferred.resolve({data:result, msg: 'All colors got it successfully'});
        } else {
            deferred.reject({data:null, msg: 'Error! We didn\'t get colors'});
        }
        return deferred.promise;
    }
}

colorsService.$inject = ['localStorageService', '$q'];
export default colorsService;