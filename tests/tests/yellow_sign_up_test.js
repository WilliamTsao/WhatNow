
Feature('See Yellow SIGN UP NOW');

xScenario('See Yellow Sign Up Button', (I) => {
	const buttonContent = "SIGN UP NOW";
	I.amOnPage('/');
	I.see(buttonContent, '.hero-cta');
});
