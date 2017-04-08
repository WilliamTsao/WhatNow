
'use strict';

let I;

module.exports = {

  _init() {
    I = actor();
  },

  // insert your locators and methods here
  username: 'williamtsao1202@gmail.com',
  password: 'foobar',
  submit: 'sign in',
  signin(){
  	I.fillField('U_EMAIL', this.username);
  	I.fillField('U_PASSWORD', this.password);
  	I.click(this.submit);
  }
}
