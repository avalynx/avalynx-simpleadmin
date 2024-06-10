const shell = require('shelljs');

shell.rm('-rf', 'dist');
shell.mkdir('-p', 'dist/js/');
shell.cp('src/js/avalynx-admin.js', 'dist/js/avalynx-admin.js');
shell.cp('src/js/avalynx-admin-guest.js', 'dist/js/avalynx-admin-guest.js');
shell.mkdir('-p', 'dist/css/');
shell.mkdir('-p', 'dist/css/custom/');
shell.cp('src/css/avalynx-admin.vars.css', 'dist/css/avalynx-admin.vars.css');
shell.cp('src/css/avalynx-admin.css', 'dist/css/avalynx-admin.css');
shell.cp('src/css/avalynx-admin-guest.css', 'dist/css/avalynx-admin-guest.css');
shell.cp('src/css/avalynx-admin-sidenav.css', 'dist/css/avalynx-admin-sidenav.css');
shell.cp('src/css/avalynx-admin-sidenav.vars.css', 'dist/css/avalynx-admin-sidenav.vars.css');
shell.cp('src/css/avalynx-admin-sidenav-sub1.css', 'dist/css/avalynx-admin-sidenav-sub1.css');
shell.cp('src/css/avalynx-admin-sidenav-sub1.vars.css', 'dist/css/avalynx-admin-sidenav-sub1.vars..css');
shell.cp('src/css/custom/avalynx-admin-light.css', 'dist/css/custom/avalynx-admin-light.css');


