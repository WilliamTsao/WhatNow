
Feature('Signup, see nav, post questions, see posted questions, Sign out, Login');

Scenario('Signup, see nav, post questions, post suggestions, Sign out, Login', (I, TopNavItems, register) => {	
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
	I.wait(2);
	I.see(testMsg);

	// make a comment
	I.click('.fa-comment');
	I.seeElement('.newComment');
	let testComment = `comment+${Math.random().toString(36).substring(20)}`
	I.fillField('.newComment', testComment);
	I.pressKey('Enter');
	I.wait(2);
	I.see(testComment);

	// make a post to category "Travel"
	I.selectOption('body > header > form > div:nth-child(3) > select', 'Travel');
	let travelPost = `travel post ${Math.random().toString(36).substring(20)}`
	I.fillField('body > header > form > input[type="text"]', travelPost);
	I.pressKey('Enter');
	I.wait(2);
	I.click('Travel');
	I.wait(2);
	I.see(travelPost);

	// logout
	I.click('.fa-sign-out');
	I.wait(2);
	I.see('Login');

	// login again
	register.signin();
	I.see('News Feed');
});
