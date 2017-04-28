/**
 * Created by user on 20.04.17.
 */

import angular from 'angular';
import notesFilter from './noteFilter';

const FilterNote = angular.module('myFilterNote', [])
    .filter('notesFilter', notesFilter);

export default FilterNote;