class AvalynxSimpleAdmin {
    constructor() {
        this.loaderWrapper = document.getElementById('avalynx-simpleadmin-loader');
        this.Sidenav = document.getElementById("avalynx-simpleadmin-sidenav");
        this.SidenavHeader = document.getElementById("avalynx-simpleadmin-sidenav-header");
        this.SidenavBody = document.getElementById("avalynx-simpleadmin-sidenav-body");

        if (!this.Sidenav) {
            console.error("Element 'avalynx-simpleadmin-sidenav' nicht gefunden.");
            return;
        }

        this.Sidenavoffcanvas = new bootstrap.Offcanvas(this.Sidenav);
        this.avalynx_style = getComputedStyle(document.documentElement);
        this.avalynx_sidenav_width_string = this.avalynx_style.getPropertyValue('--avalynx-simpleadmin-breakpoint').trim();
        this.avalynx_darkmode_0 = this.avalynx_style.getPropertyValue('--avalynx-simpleadmin-darkmode-0').trim().slice(1, -1).replace(/\\\"/g, '"');
        this.avalynx_darkmode_1 = this.avalynx_style.getPropertyValue('--avalynx-simpleadmin-darkmode-1').trim().slice(1, -1).replace(/\\\"/g, '"');
        this.avalynx_darkmode_2 = this.avalynx_style.getPropertyValue('--avalynx-simpleadmin-darkmode-2').trim().slice(1, -1).replace(/\\\"/g, '"');
        if (this.avalynx_sidenav_width_string.endsWith('px')) {
            this.avalynx_sidenav_width_string = this.avalynx_sidenav_width_string.slice(0, -2);
        }
        this.avalynx_breakpoint = parseInt(this.avalynx_sidenav_width_string, 10);

        this.init();
    }

    init() {
        this.setupSidenav();
        this.setupDarkmode();
        this.setupLiveSearch();
        this.setupEventListeners();
        if (this.loaderWrapper) {
            this.loaderWrapper.style.display = 'none';
        }
        window.addEventListener('resize', this.resizeWindow.bind(this));
    }

    setupSidenav() {
        if (window.innerWidth < this.avalynx_breakpoint) {
            this.setMobileSideNavicon();
        } else {
            this.setSideNavicon();
        }
    }

    setSideNavicon() {
        document.documentElement.setAttribute("data-avalynx-mode", "desktop");
        this.Sidenav.classList.remove("offcanvas", "offcanvas-start", "jsbvis_sidenav_mobile");
        this.Sidenav.classList.add("jsbvis_sidenav_desktop", "border-end");
        this.SidenavHeader.classList.add("d-none");
        this.SidenavBody.classList.remove("offcanvas-body");

        let backdrop = document.querySelector('#avalynx-simpleadmin-main > .offcanvas-backdrop');
        if (backdrop) {
            this.Sidenavoffcanvas.toggle();
        }
    }

    setMobileSideNavicon() {
        document.documentElement.setAttribute("data-avalynx-mode", "mobile");
        this.Sidenav.classList.add("offcanvas", "offcanvas-start", "jsbvis_sidenav_mobile");
        this.Sidenav.classList.remove("jsbvis_sidenav_desktop", "border-end");
        this.SidenavHeader.classList.remove("d-none");
        this.SidenavBody.classList.add("offcanvas-body");
    }

    drawDarkmodeIcon(state = 'light') {
        let elements = document.getElementsByClassName('avalynx-toggler-darkmode');
        for (let i = 0; i < elements.length; i++) {
            if (state == "light") {
                elements[i].innerHTML = this.avalynx_darkmode_0;
            } else if (state == "dark") {
                elements[i].innerHTML = this.avalynx_darkmode_1;
            } else {
                elements[i].innerHTML = this.avalynx_darkmode_2;
            }
        }
    }

    toggleDarkmode() {
        if (document.documentElement.getAttribute("data-bs-theme") === "light") {
            document.documentElement.setAttribute("data-bs-theme", "dark");
            this.drawDarkmodeIcon('light');
            if (typeof avalynx_darkmode_save === 'function') {
                avalynx_darkmode_save('dark');
            }
        } else {
            document.documentElement.setAttribute("data-bs-theme", "light");
            this.drawDarkmodeIcon('dark');
            if (typeof avalynx_darkmode_save === 'function') {
                avalynx_darkmode_save('light');
            }
        }
    }

    toggleSidenav() {
        if (window.innerWidth < this.avalynx_breakpoint) {
            this.Sidenavoffcanvas.toggle();
        } else {
            this.Sidenav.classList.toggle("avalynx-moved");
        }
    }

    resizeWindow(init = false) {
        let sate_current = document.documentElement.getAttribute("data-avalynx-mode");
        let state_changed = false;

        if (window.innerWidth < this.avalynx_breakpoint) {
            if (sate_current != "mobile") {
                state_changed = true;
            }
        } else {
            if (sate_current != "desktop") {
                state_changed = true;
            }
        }

        if (state_changed === true) {
            if (innerWidth < this.avalynx_breakpoint) {
                this.setMobileSideNavicon();
            } else {
                this.setSideNavicon();
            }
        }
    }

    setupDarkmode() {
        var data_bs_theme = document.documentElement.getAttribute("data-bs-theme");
        if ((data_bs_theme !== "light") && (data_bs_theme !== "dark")) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.drawDarkmodeIcon('light');
                document.documentElement.setAttribute("data-bs-theme", "dark");
            } else {
                this.drawDarkmodeIcon('dark');
                document.documentElement.setAttribute("data-bs-theme", "light");
            }
        } else {
            if (data_bs_theme == "light") {
                this.drawDarkmodeIcon('dark');
            } else {
                this.drawDarkmodeIcon('light');
            }
        }
    }

    setupLiveSearch() {
        document.querySelectorAll('.avalynx-livesearch-input').forEach((searchInput) => {
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
                if (count > 0) {
                    dropdownMenu.classList.add('avalynx-livesearch-results');
                } else {
                    dropdownMenu.classList.remove('avalynx-livesearch-results');
                }
            });
        });
    }

    setupEventListeners() {
        document.querySelectorAll('.avalynx-toggler-sidenav').forEach((button) => {
            button.addEventListener('click', () => this.toggleSidenav());
        });

        document.querySelectorAll('.avalynx-toggler-darkmode').forEach((button) => {
            button.addEventListener('click', () => this.toggleDarkmode());
        });
    }
}
