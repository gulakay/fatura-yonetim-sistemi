import "primevue/resources/primevue.min.css";
//import "primevue/resources/themes/lara-dark-purple/theme.css";
import "primevue/resources/themes/aura-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import PrimeVue from "primevue/config";


import Menubar from "primevue/megamenu";
import Button from "primevue/button";
import InputText from 'primevue/inputtext';

import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';

import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';

import Dialog from 'primevue/dialog';

import ConfirmationService from 'primevue/confirmationservice';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';



export const prime = (app) => {
    app.use(PrimeVue)
    app.use(ConfirmationService);
    app.use(ToastService); // Use ToastService
    app.component("PvMenubar", Menubar);
    app.component("PvButton", Button);
    app.component("PvInputText", InputText);
    app.component('PvCalendar', Calendar);
    app.component('PvInputNumber', InputNumber);
    app.component('PvDropdown', Dropdown);
    app.component('PvDataTable', DataTable);
    app.component('PvColumn', Column);
    app.component('PvUseConfirm', useConfirm);
    app.component('PvConfirmDialog', ConfirmDialog);
    app.component('PvToast', Toast);
    app.component('PvDialog', Dialog);

    
};  


