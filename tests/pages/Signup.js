
'use strict';

let I;

module.exports = {

	_init() {
	I = actor();
	},

	// insert your locators and methods here
	username : `williamtsao1202+${Math.random().toString(36).substring(20)}@gmail.com`,
	password : 'testing',
	reason: 'Build my website',
	fname: 'William',
	lname: 'Tsao',

	signup(){
		I.fillField('U_FIRST_NAME', this.fname);
		I.fillField('U_LAST_NAME', this.lname);
		I.fillField('U_EMAIL', this.username);
		I.fillField('U_PASSWORD', this.password);
		I.wait(3);
		I.click('.next');
		I.selectOption('ULD_REASON', this.reason);
		I.wait(5);
		I.click('#button_submit');
		I.wait(5);
	}
}
