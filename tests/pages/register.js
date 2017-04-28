
'use strict';

let I;

module.exports = {

	_init() {
	I = actor();
	},

	// insert your locators and methods here
	username : `testing+${Math.random().toString(36).substring(20)}`,
	password : 'testing123',
	

	signup(){
		I.fillField('body > div > form:nth-child(1) > input[type="text"]:nth-child(2)', this.username);
		I.fillField('body > div > form:nth-child(1) > input[type="password"]:nth-child(3)', this.password);
		I.click('body > div > form:nth-child(1) > input[type="submit"]:nth-child(4)');
		I.wait(3);
	}
}
