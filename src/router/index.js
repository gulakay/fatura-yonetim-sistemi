import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import InvoiceList from '../views/InvoiceList.vue'
import CreateInvoice from '../views/CreateInvoice.vue'
import CustomerManagement from '../views/CustomerManagement.vue'

import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'homeView',
    component: HomeView,
    meta: { requiresAuth: false },
  },
  {
    path: '/fatura-listesi',
    name: 'invoiceList',
    component: InvoiceList,
    meta: { requiresAuth: true },
  },
  {
    path: '/fatura-olustur',
    name: 'createInvoice',
    component: CreateInvoice,
    meta: { requiresAuth: true },
  },
  {
    path: '/musteri-yonetimi',
    name: 'customerManagement',
    component: CustomerManagement,
    meta: { requiresAuth: true },
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    

  if (requiresAuth && !user) {
    next('/'); 
  } else if (!requiresAuth && user && to.path === '/') {
    next('/fatura-listesi');
  } else {
    next();
  }
});
});

export default router;
