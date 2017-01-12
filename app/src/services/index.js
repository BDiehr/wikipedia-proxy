import angular from 'angular';
import wikiService from './wikiService';

// create the module to put the resources in
const module = angular.module('services', []);

module.factory('wikiService', wikiService);

// export the name of the module for 
// adding as a dependecy at the app level
export default module.name;