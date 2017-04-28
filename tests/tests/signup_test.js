/*
Feature('Signup');

xScenario('testing signup', function*(I, signupPage){
	I.amOnPage('/register');
	let url = yield I.grabAttributeFrom('//*[@id="signupModal"]/div/div[2]/div/div/div[2]/iframe', 'src');
	I.amOnPage(url);
	signupPage.signup();
	I.click('Get started now');
});
*/