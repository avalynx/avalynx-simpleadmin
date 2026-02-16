document.addEventListener('DOMContentLoaded', function () {
    let avalynxSimpleAdminStyle = getComputedStyle(document.documentElement);

    const avalynxSimpleAdminLoader = document.getElementById('avalynx-simpleadmin-loader');
    const avalynxSimpleAdminSidenav = document.getElementById("avalynx-simpleadmin-sidenav");
    const avalynxSimpleAdminSidenavHeader = document.getElementById("avalynx-simpleadmin-sidenav-header");
    const avalynxSimpleAdminSidenavBody = document.getElementById("avalynx-simpleadmin-sidenav-body");
    const avalynxSimpleAdminSidenavOffcanvas = new bootstrap.Offcanvas(avalynxSimpleAdminSidenav);
    const avalynxSimpleAdminDarkmode0 = avalynxSimpleAdminStyle.getPropertyValue('--avalynx-simpleadmin-darkmode-0').trim().slice(1, -1).replace(/\\\"/g, '"');
    const avalynxSimpleAdminDarkmode1 = avalynxSimpleAdminStyle.getPropertyValue('--avalynx-simpleadmin-darkmode-1').trim().slice(1, -1).replace(/\\\"/g, '"');
    const avalynxSimpleAdminDarkmode2 = avalynxSimpleAdminStyle.getPropertyValue('--avalynx-simpleadmin-darkmode-2').trim().slice(1, -1).replace(/\\\"/g, '"');

    let avalynxSimpleAdminSidenavWidthString = avalynxSimpleAdminStyle.getPropertyValue('--avalynx-simpleadmin-breakpoint').trim();
    if (avalynxSimpleAdminSidenavWidthString.endsWith('px')) {
        avalynxSimpleAdminSidenavWidthString = avalynxSimpleAdminSidenavWidthString.slice(0, -2);
    }
    const avalynxSimpleAdmin = parseInt(avalynxSimpleAdminSidenavWidthString, 10);

    avalynxSimpleAdminSetSidenavIcon = function () {
        document.documentElement.setAttribute("data-avalynx-simpleadmin-mode", "desktop");
        avalynxSimpleAdminSidenav.classList.remove("offcanvas");
        avalynxSimpleAdminSidenav.classList.remove("offcanvas-start");
        avalynxSimpleAdminSidenav.classList.remove("jsbvis_sidenav_mobile");
        avalynxSimpleAdminSidenav.classList.add("jsbvis_sidenav_desktop")
        avalynxSimpleAdminSidenav.classList.add("border-end");
        avalynxSimpleAdminSidenavHeader.classList.add("d-none");
        avalynxSimpleAdminSidenavBody.classList.remove("offcanvas-body");

        let avalynxSimpleAdminBacktrop = document.querySelector('#avalynx-simpleadmin-main > .offcanvas-backdrop');
        if (avalynxSimpleAdminBacktrop) {
            avalynxSimpleAdminSidenavOffcanvas.toggle();
        }
    }

    avalynxSimpleAdminSetMobileSideavIcon = function () {
        document.documentElement.setAttribute("data-avalynx-simpleadmin-mode", "mobile");
        avalynxSimpleAdminSidenav.classList.add("offcanvas");
        avalynxSimpleAdminSidenav.classList.add("offcanvas-start");
        avalynxSimpleAdminSidenav.classList.add("jsbvis_sidenav_mobile");
        avalynxSimpleAdminSidenav.classList.remove("jsbvis_sidenav_desktop");
        avalynxSimpleAdminSidenav.classList.remove("border-end");
        avalynxSimpleAdminSidenavHeader.classList.remove("d-none");
        avalynxSimpleAdminSidenavBody.classList.add("offcanvas-body");
    }

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

    avalynxSimpleAdminToggleSidenav = function () {
        if (window.innerWidth < avalynxSimpleAdmin) {
            avalynxSimpleAdminSidenavOffcanvas.toggle();
        } else {
            avalynxSimpleAdminSidenav.classList.toggle("avalynx-simpleadmin-moved");
        }
    }

    avalynxSimpleAdminResizeWindow = function (init = false) {
        let sate_current = document.documentElement.getAttribute("data-avalynx-simpleadmin-mode");
        let state_changed = false;

        if (window.innerWidth < avalynxSimpleAdmin) {
            if (sate_current !== "mobile") {
                state_changed = true;
            }
        } else {
            if (sate_current !== "desktop") {
                state_changed = true;
            }
        }

        if (state_changed === true) {
            if (innerWidth < avalynxSimpleAdmin) {
                avalynxSimpleAdminSetMobileSideavIcon();
            } else {
                avalynxSimpleAdminSetSidenavIcon();
            }
        }
    }

    if (window.innerWidth < avalynxSimpleAdmin) {
        avalynxSimpleAdminSetMobileSideavIcon();
    } else {
        avalynxSimpleAdminSetSidenavIcon();
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
        if (data_bs_theme=="light") {
            avalynxSimpleAdminDrawDarkmodeIcon('dark');
        } else {
            avalynxSimpleAdminDrawDarkmodeIcon('light');
        }
    }

    document.querySelectorAll('.avalynx-simpleadmin-livesearch-input').forEach(function(searchInput) {
        searchInput.addEventListener('keyup', function() {
            var searchTerm = this.value.toLowerCase();
            var dropdownMenu = this.closest('.avalynx-simpleadmin-livesearch');
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
                dropdownMenu.classList.add('avalynx-simpleadmin-livesearch-results');
            } else {
                dropdownMenu.classList.remove('avalynx-simpleadmin-livesearch-results');
            }
        });
    });

    avalynxSimpleAdminResizeWindow(true);

    avalynxSimpleAdminLoader.style.display = 'none';
});

window.addEventListener('resize', function () {
    avalynxSimpleAdminResizeWindow();
});
