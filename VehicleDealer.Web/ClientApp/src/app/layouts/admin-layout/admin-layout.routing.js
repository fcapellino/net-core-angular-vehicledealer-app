"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminLayoutRoutes = void 0;
var vehicle_form_component_1 = require("../../vehicle-form/vehicle-form.component");
var home_component_1 = require("../../home/home.component");
var user_component_1 = require("../../user/user.component");
var tables_component_1 = require("../../tables/tables.component");
var typography_component_1 = require("../../typography/typography.component");
var icons_component_1 = require("../../icons/icons.component");
var maps_component_1 = require("../../maps/maps.component");
var notifications_component_1 = require("../../notifications/notifications.component");
var upgrade_component_1 = require("../../upgrade/upgrade.component");
exports.AdminLayoutRoutes = [
    { path: 'vehicles/new', component: vehicle_form_component_1.VehicleFormComponent },
    { path: 'dashboard', component: home_component_1.HomeComponent },
    { path: 'user', component: user_component_1.UserComponent },
    { path: 'table', component: tables_component_1.TablesComponent },
    { path: 'typography', component: typography_component_1.TypographyComponent },
    { path: 'icons', component: icons_component_1.IconsComponent },
    { path: 'maps', component: maps_component_1.MapsComponent },
    { path: 'notifications', component: notifications_component_1.NotificationsComponent },
    { path: 'upgrade', component: upgrade_component_1.UpgradeComponent },
];
//# sourceMappingURL=admin-layout.routing.js.map