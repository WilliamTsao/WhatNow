
'use strict';

let I;

module.exports = {

  _init() {
    I = actor();
  },
  //XPATH for top nav
  nav : 'body > header > nav',

  //words expected to be in top nav
  nav_ele : ["News Feed", "Relationship", "Travel", "Food", "Sports", "Technology", "Career"]
}
