
Feature('See Top Nav Items');

xScenario('See Top Nav Items', (I, TopNavItems) => {
	const items = ["FEATURES", "TEMPLATES", "IMAGES", "LEARN", "PRICING", "MORE"];
	I.amOnPage('/');
	I.seeElement(TopNavItems.nav);
	TopNavItems.nav_ele.forEach((ele)=>{
		I.see(ele, TopNavItems.nav);
	})
});
