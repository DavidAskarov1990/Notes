/**
 * Created by user on 20.04.17.
 */

let notesFilter = ($filter) => (array, param, search) =>
    $filter('orderBy')($filter('filter')(array, {[param]: search }), [param]);

export default notesFilter