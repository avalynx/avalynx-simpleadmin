document.addEventListener('DOMContentLoaded', function () {
	var appContainer = document.getElementById('avalynx-app-container');
	var scrollToTopButton = document.getElementById('avalynx-scroll-to-top');

	appContainer.addEventListener('scroll', function() {
		var scrollDistance = this.scrollTop;
		if (scrollDistance > 10) {
			scrollToTopButton.style.display = 'block';
		} else {
			scrollToTopButton.style.display = 'none';
		}
	});

	scrollToTopButton.addEventListener('click', function(e) {
		e.preventDefault();
		appContainer.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
});