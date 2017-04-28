/**
 * Created by user on 26.04.17.
 */

import '../style/tools.less';

class toolsController{
    constructor(labelsService, categoriesService, $q){
        this.$q = $q;
        this.labelsService = labelsService;
        this.categoriesService = categoriesService;
        this.data = {};
        this.init();
    }

    init(){
        this.getAllLabels();
        this.getAllCategory();
    };

    getAllLabels(){
        this.labelsService.getAllLabels()
            .then(res => {
                this.data.newLabel = [];
                this.data.labels = res.data;
            }, err => {
                console.log(err);
            })
    }

    getAllCategory(){
        this.categoriesService.getAllCategories()
            .then(res => {
                this.data.newCategoryList = [];
                this.data.categories = res.data;
            }, err => {
                console.log(err)
            })
    }

    /**
     * Methods for Label
    */

    createLabel(label){
        if(_.find(this.data.labels, l => _.lowerCase(l) == _.lowerCase(label))){
            return;
        } else if(!label || label==''){
            return;
        }
        else{
            this.data.newLabel.push(label);
            this.data.newLabel = _.uniq(this.data.newLabel)
        }
    }

    removeLabel(type, name){
        if(type == 'labels'){
            _.pull(this.data.labels, name);
        } else {
            _.pull(this.data.newLabel, name);
        }
        this.labelsService.removeLabel(this.data.labels)
            .then(res => {
            }, err => {
                console.log(err);
            });
    }


    /**
     * Methods for Category
     */
    createCategoryParent(category){
        if(_.find(this.data.newCategoryList, c => _.lowerCase(c.category_parent.name) == _.lowerCase(category))){
            return;
        }else if(_.find(this.data.categories, c => _.lowerCase(c.category_parent.name) == _.lowerCase(category))) {
            return;
        }
        else if(!category || category==''){
            return;
        }
        else{
            let categoryNew = {
                category_parent : {
                    name:category,
                    category:[]
                }
            };
            this.data.newCategoryList.push(categoryNew);
        }
    }

    createCategory(category){
        let selectCategory = _.find(this.data.newCategoryList, c => c.category_parent.name == this.data.newNameCategoryParent);

        if(!selectCategory){
            selectCategory = _.find(this.data.categories, c => c.category_parent.name == this.data.newNameCategoryParent);
        }
        if(selectCategory){
            if(_.find(selectCategory.category_parent.category, c => _.lowerCase(c) == _.lowerCase(category))){
                return;
            } else if(!category || category==''){
                return;
            }
            else{
                selectCategory.category_parent.category.push(category);
            }
        }
    }

    getCategory(array){
        if(this.data.newNameCategoryParent){
            let category = _.find(array, item => {
                return item.category_parent.name == this.data.newNameCategoryParent
            });
            if(!category){
                return [];
            }
            return category.category_parent.category;
        }
    }

    removeCategory(type, name){
        switch (type){
            case 'parent-category':
                _.remove(this.data.categories, category => category.category_parent.name == name);
                _.remove(this.data.newCategoryList, category => category.category_parent.name == name);
                this.data.newNameCategoryParent = undefined;
                break;
            case 'category':
                let isDelete;
                _.forEach(this.data.categories, category => {
                    if(category.category_parent.name == this.data.newNameCategoryParent){
                        isDelete = _.pull(category.category_parent.category, name);
                    }
                });
                _.forEach(this.data.newCategoryList, category => {
                    if(category.category_parent.name == this.data.newNameCategoryParent){
                        _.pull(category.category_parent.category, name);
                    }
                });
                break;
        }
        this.categoriesService.removeCategory(this.data.categories)
            .then(res => {
                console.log(res)
            }, err => {
                console.log(err);
            });
    }

    /**
     * Save change
     */
    apply(){
        this.data.labels = _.concat(this.data.labels, this.data.newLabel);
        this.data.categories = _.concat(this.data.categories, this.data.newCategoryList);
        let prom1 = this.labelsService.addLabel(this.data.labels);
        let prom2 = this.categoriesService.addCategory(this.data.categories);


        this.$q.all([prom1, prom2])
            .then(res => {
                this.data.newLabel = [];
                this.data.newNameCategoryParent = undefined;
                this.data.newCategoryList = [];
            }, err => {
                console.log('err ', err)
            })
    }
}

toolsController.$inject = ['labelsService', 'categoriesService', '$q'];

export default toolsController;