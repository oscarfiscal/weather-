import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Tables from '@/pages/Tables/Tables';
import Icons from '@/pages/Icons/Icons';
import Maps from '@/pages/Maps/Maps';

import Dashboard from '@/pages/Visits/Visits';

import ErrorPage from '@/pages/Error/Error';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
   
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
      
        {
          path: 'tables',
          name: 'Typography',
          component: Tables,
        },
       
        {
          path: 'components/icons',
          name: 'Icons',
          component: Icons,
        },
        {
          path: 'components/maps',
          name: 'Maps',
          component: Maps,
        },
       
      ],
    },
    {
      path: '*',
      name: 'Error',
      component: ErrorPage,
    }
  ],
});
