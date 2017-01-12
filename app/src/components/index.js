import angular from 'angular';
import wiki from './wiki/wiki';

// create the module to put the resources in
const module = angular.module('components', []);

module.component('wiki', wiki);

// export the name of the module for 
// adding as a dependecy at the app level
export default module.name;