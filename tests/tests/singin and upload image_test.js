/*
Feature('Singin and upload image');

xScenario('Signin and upload image to new gallery', (I, signinPage, newGalleryPage) => {
	I.amOnPage('/mem/home');
	signinPage.signin();
	newGalleryPage.newGallery();
	I.wait(5);
	I.attachFile('#ubFile > div > input[type="file"]', "data/harambeIcon.png");
	I.wait(5);
	I.dontSee('0/1');
});
*/