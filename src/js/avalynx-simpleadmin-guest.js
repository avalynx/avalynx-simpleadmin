document.addEventListener('DOMContentLoaded', function () {
    let avalynxSimpleAdminStyle = getComputedStyle(document.documentElement);

	const avalynxSimpleAdminLoader = document.getElementById('avalynx-simpleadmin-loader');
	const avalynxSimpleAdminDarkmode0 = avalynxSimpleAdminStyle.getPropertyValue('--avalynx-simpleadmin-darkmode-0').trim().slice(1, -1).replace(/\\\"/g, '"');
	const avalynxSimpleAdminDarkmode1 = avalynxSimpleAdminStyle.getPropertyValue('--avalynx-simpleadmin-darkmode-1').trim().slice(1, -1).replace(/\\\"/g, '"');
	const avalynxSimpleAdminDarkmode2 = avalynxSimpleAdminStyle.getPropertyValue('--avalynx-simpleadmin-darkmode-2').trim().slice(1, -1).replace(/\\\"/g, '"');

	avalynxSimpleAdminDrawDarkmodeIcon = function (state = 'light') {
		let elements = document.getElementsByClassName('avalynx-simpleadmin-toggler-darkmode');
		for (let i = 0; i < elements.length; i++) {
			if (state === "light") {
				elements[i].innerHTML = avalynxSimpleAdminDarkmode0;
			} else if (state === "dark") {
				elements[i].innerHTML = avalynxSimpleAdminDarkmode1;
			} else {
				elements[i].innerHTML = avalynxSimpleAdminDarkmode2;
			}
		}
	}

	avalynxSimpleAdminToggleDarkmode = function () {
		if (typeof avalynxSimpleAdminToggleDarkmodePre === 'function') {
			avalynxSimpleAdminToggleDarkmodePre();
		}
		if (document.documentElement.getAttribute("data-bs-theme") === "light") {
			document.documentElement.setAttribute("data-bs-theme", "dark");
			avalynxSimpleAdminDrawDarkmodeIcon('light');
			if (typeof avalynxSimpleAdminDarkmodeSave === 'function') {
                avalynxSimpleAdminDarkmodeSave('dark');
			}
		} else {
			document.documentElement.setAttribute("data-bs-theme", "light");
			avalynxSimpleAdminDrawDarkmodeIcon('dark');
			if (typeof avalynxSimpleAdminDarkmodeSave === 'function') {
                avalynxSimpleAdminDarkmodeSave('light');
			}
		}
		if (typeof avalynxSimpleAdminToggleDarkmodeAfter === 'function') {
			avalynxSimpleAdminToggleDarkmodeAfter();
		}
	}

	var data_bs_theme = document.documentElement.getAttribute("data-bs-theme");
	if ((data_bs_theme!=="light")&&(data_bs_theme!=="dark")) {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			avalynxSimpleAdminDrawDarkmodeIcon('light');
			document.documentElement.setAttribute("data-bs-theme", "dark");
		} else {
			avalynxSimpleAdminDrawDarkmodeIcon('dark');
			document.documentElement.setAttribute("data-bs-theme", "light");
		}
	} else {
		if (data_bs_theme==="light") {
			avalynxSimpleAdminDrawDarkmodeIcon('dark');
		} else {
			avalynxSimpleAdminDrawDarkmodeIcon('light');
		}
	}

	avalynxSimpleAdminLoader.style.display = 'none';
});
