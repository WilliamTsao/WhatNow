
Feature('Signup, see nav, post questions, see posted questions, Sign out, Login');

Scenario('Signup, see nav, post questions, see posted questions, Sign out, Login', (I, TopNavItems, register) => {	
	//signup
	I.amOnPage('/register');
	register.signup();
	
	// see top nav
	I.seeElement(TopNavItems.nav);
	TopNavItems.nav_ele.forEach((ele)=>{
		I.see(ele, TopNavItems.nav);
	});

	// make a post
	let testMsg = `testing+${Math.random().toString(36).substring(20)}`
	I.fillField('body > header > form > input[type="text"]', testMsg);
	I.pressKey('Enter');
	I.see(testMsg);

	// make a comment
	I.click('Suggestions');
	I.seeElement('.newComment');
	let testComment = `comment+${Math.random().toString(36).substring(20)}`
	I.fillField('.newComment', testComment);
	I.pressKey('Enter');
	I.see(testComment);

});
