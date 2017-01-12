import template from './wiki.html';

export default {
  template,
  controller
};

controller.$inject = ['wikiService', '$timeout'];

function controller (wikiService) {

  //initialization logic
  this.$onInit = () => {
    this.visited = [];
    this.found = false;
  };

  function formatLinks (array) {
    //drop first item every time
    array.shift();
    const formatted = array.map(string => {
      let link = string.slice(0);
      let index = link.indexOf('"');
      link = link.slice(0,index);
      return link;
    });
    return formatted;
  }

  function addVisited (string, array) {
    array.push(string);
  }

  let offLimits = ['.jpg', '.svg', '.PNG', '.gif'];

  function checkForImage (string, array) {
    let status = true;
    array.forEach(offLimit => {
      if (string.indexOf(offLimit) > 0) {
        status = false;
      }
    });
    return status;
  }

  function removeImages (array) {
    return array.filter(string => {
      return checkForImage(string, offLimits);
    });
  }
  
  function removeColons (array) {
    return array.filter(string => {
      return string.indexOf(':') === -1;
    });
  }

  //determining success as having found string Jesus in the array of /wiki/ hrefs
  function hasFoundJesus (array) {
    if (array.indexOf('Jesus') > -1) {
      return true;
    } else {
      return false;
    }
  }

  function nextToVisit (newArray, visitedArray) {
    let toVisit = null;
    let count = 0;
    //check if first item in the newArray has already been visited
    //if yes check the next item, if no return the item
    while (toVisit === null && count < newArray.length) {
      if (visitedArray.indexOf(newArray[count]) < 0) {
        toVisit = newArray[count];
      }
      count++;
    }
    if (!toVisit) {
      toVisit = newArray[0];
    }
    return toVisit;
  }

  //currently requires underscore to be input by the user where space would be
  this.searchPage = (resource) => {
    //initial search term pushed to visited array
    if (this.visited.length === 0) { this.visited.push(resource); };
    wikiService.getWiki(resource)
      .then(res => {
        let linksArray = res.text['*'].split('href="/wiki/');
        let formattedArray = formatLinks(linksArray);
        formattedArray = removeImages(formattedArray);
        formattedArray = removeColons(formattedArray);
        if (hasFoundJesus(formattedArray)) {
          this.found = true;
          return;
        } else {
          //visit new page
          let newPage = nextToVisit(formattedArray, this.visited);
          console.log(newPage);
          addVisited(newPage, this.visited);
          this.searchPage(newPage);
        }
      });
  };

};