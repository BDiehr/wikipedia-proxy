import angular from 'angular';
import components from './components';
import services from './services';
// import './css/main.css';

angular.module('wikiApp', [ components, services ])
  .constant('apiUrl', 'http://localhost:3000');