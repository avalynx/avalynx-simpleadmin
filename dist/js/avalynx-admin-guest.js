document.addEventListener('DOMContentLoaded', function () {
	const loaderWrapper = document.getElementById('avalynx-simpleadmin-loader');
	let avalynx_style = getComputedStyle(document.documentElement);
	const avalynx_darkmode_0 = avalynx_style.getPropertyValue('--avalynx-simpleadmin-darkmode-0').trim().slice(1, -1).replace(/\\\"/g, '"');
	const avalynx_darkmode_1 = avalynx_style.getPropertyValue('--avalynx-simpleadmin-darkmode-1').trim().slice(1, -1).replace(/\\\"/g, '"');
	const avalynx_darkmode_2 = avalynx_style.getPropertyValue('--avalynx-simpleadmin-darkmode-2').trim().slice(1, -1).replace(/\\\"/g, '"');

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

	loaderWrapper.style.display = 'none';
});
