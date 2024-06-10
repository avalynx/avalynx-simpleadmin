document.addEventListener('DOMContentLoaded', function () {
	const loaderWrapper = document.getElementById('avalynx-simpleadmin-loader');
	const Sidenav = document.getElementById("avalynx-simpleadmin-sidenav");
	const SidenavHeader = document.getElementById("avalynx-simpleadmin-sidenav-header");
	const SidenavBody = document.getElementById("avalynx-simpleadmin-sidenav-body");
	const Sidenavoffcanvas = new bootstrap.Offcanvas(Sidenav);
	let avalynx_style = getComputedStyle(document.documentElement);
	let avalynx_sidenav_width_string = avalynx_style.getPropertyValue('--avalynx-breakpoint').trim();
	const avalynx_darkmode_0 = avalynx_style.getPropertyValue('--avalynx-darkmode-0').trim().slice(1, -1).replace(/\\\"/g, '"');
	const avalynx_darkmode_1 = avalynx_style.getPropertyValue('--avalynx-darkmode-1').trim().slice(1, -1).replace(/\\\"/g, '"');
	const avalynx_darkmode_2 = avalynx_style.getPropertyValue('--avalynx-darkmode-2').trim().slice(1, -1).replace(/\\\"/g, '"');
	if (avalynx_sidenav_width_string.endsWith('px')) {
		avalynx_sidenav_width_string = avalynx_sidenav_width_string.slice(0, -2);
	}
	const avalynx_breakpoint = parseInt(avalynx_sidenav_width_string, 10);

	avalynx_setSideNavicon = function () {
		document.documentElement.setAttribute("data-avalynx-mode", "desktop");
		Sidenav.classList.remove("offcanvas");
		Sidenav.classList.remove("offcanvas-start");
		Sidenav.classList.remove("jsbvis_sidenav_mobile");
		Sidenav.classList.add("jsbvis_sidenav_desktop")
		Sidenav.classList.add("border-end");
		SidenavHeader.classList.add("d-none");
		SidenavBody.classList.remove("offcanvas-body");

		let backdrop = document.querySelector('#avalynx-simpleadmin-main > .offcanvas-backdrop');
		if (backdrop) {
			Sidenavoffcanvas.toggle();
		}
	}

	avalynx_setMobileSideNavicon = function () {
		document.documentElement.setAttribute("data-avalynx-mode", "mobile");
		Sidenav.classList.add("offcanvas");
		Sidenav.classList.add("offcanvas-start");
		Sidenav.classList.add("jsbvis_sidenav_mobile");
		Sidenav.classList.remove("jsbvis_sidenav_desktop");
		Sidenav.classList.remove("border-end");
		SidenavHeader.classList.remove("d-none");
		SidenavBody.classList.add("offcanvas-body");
	}

	avalynx_drawDarkmodeIcon = function (state = 'light') {
		let elements = document.getElementsByClassName('avalynx-toggler-darkmode');
		for (let i = 0; i < elements.length; i++) {
			if (state == "light") {
				elements[i].innerHTML = avalynx_darkmode_0;
			} else if (state == "dark") {
				elements[i].innerHTML = avalynx_darkmode_1;
			} else {
				elements[i].innerHTML = avalynx_darkmode_2;
			}
		}
	}

	avalynx_toggleDarkmode = function () {
		if (document.documentElement.getAttribute("data-bs-theme") === "light") {
			document.documentElement.setAttribute("data-bs-theme", "dark");
			avalynx_drawDarkmodeIcon('light');
			if (typeof avalynx_darkmode_save === 'function') {
				avalynx_darkmode_save('dark');
			}
		} else {
			document.documentElement.setAttribute("data-bs-theme", "light");
			avalynx_drawDarkmodeIcon('dark');
			if (typeof avalynx_darkmode_save === 'function') {
				avalynx_darkmode_save('light');
			}
		}
	}

	avalynx_toggleSidenav = function () {
		if (window.innerWidth < avalynx_breakpoint) {
			Sidenavoffcanvas.toggle();
		} else {
			Sidenav.classList.toggle("avalynx-moved");
		}
	}

	avalynx_resizeWindow = function (init = false) {
		let sate_current = document.documentElement.getAttribute("data-avalynx-mode");
		let state_changed = false;

		if (window.innerWidth < avalynx_breakpoint) {
			if (sate_current != "mobile") {
				state_changed = true;
			}
		} else {
			if (sate_current != "desktop") {
				state_changed = true;
			}
		}

		if (state_changed === true) {
			if (innerWidth < avalynx_breakpoint) {
				avalynx_setMobileSideNavicon();
			} else {
				avalynx_setSideNavicon();
			}
		}
	}

	if (window.innerWidth < avalynx_breakpoint) {
		avalynx_setMobileSideNavicon();
	} else {
		avalynx_setSideNavicon();
	}

	var data_bs_theme = document.documentElement.getAttribute("data-bs-theme");
	if ((data_bs_theme!=="light")&&(data_bs_theme!=="dark")) {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			avalynx_drawDarkmodeIcon('light');
			document.documentElement.setAttribute("data-bs-theme", "dark");
		} else {
			avalynx_drawDarkmodeIcon('dark');
			document.documentElement.setAttribute("data-bs-theme", "light");
		}
	} else {
		if (data_bs_theme=="light") {
			avalynx_drawDarkmodeIcon('dark');
		} else {
			avalynx_drawDarkmodeIcon('light');
		}
	}

	document.querySelectorAll('.avalynx-livesearch-input').forEach(function(searchInput) {
		searchInput.addEventListener('keyup', function() {
			var searchTerm = this.value.toLowerCase();
			var dropdownMenu = this.closest('.avalynx-livesearch');
			var items = dropdownMenu.querySelectorAll('.dropdown-item');
			var count = 0;
			items.forEach(function(item) {
				var itemText = item.textContent.toLowerCase();
				if (itemText.indexOf(searchTerm) !== -1) {
					count++;
					item.parentElement.classList.remove('d-none');
				} else {
					item.parentElement.classList.add('d-none');
				}
			});
			if (count>0) {
				dropdownMenu.classList.add('avalynx-livesearch-results');
			} else {
				dropdownMenu.classList.remove('avalynx-livesearch-results');
			}
		});
	});

	avalynx_resizeWindow(true);

	loaderWrapper.style.display = 'none';
});

window.addEventListener('resize', function () {
	avalynx_resizeWindow();
});
