
'use strict';

let I;

module.exports = {

  _init() {
    I = actor();
  },

  // insert your locators and methods here
  galleryNameInput: '//*[@id="Dialog_ClcGal_Create"]/form/fieldset[1]/input',
  newGallery(){
  	I.wait(15);
  	I.click('//*[@id="navbar"]/ul[1]/li[3]');//crashes here
  	I.click('to New Gallery');
  	I.wait(5);
  	I.fillField(this.galleryNameInput, new Date().toLocaleDateString());
  	I.pressKey('Enter');
  }
}
