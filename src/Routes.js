import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
// Core
import TypographyPage from '@/pages/Typography/Typography';

// Tables
import TablesBasicPage from '@/pages/Tables/Basic';

// Maps
import GoogleMapPage from '@/pages/Maps/Google';

// Main
import Catalogo from '@/pages/Catalogo/Dashboard';

// Charts
import ChartsPage from '@/pages/Charts/Charts';

// Ui
import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';

// Catalogo
import CategoriasPage from '@/pages/Categorias/Basic';
// Produto
import ProdutoPage from '@/pages/Produto/Produto';


Vue.use(Router);

let router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '',
      component: Layout,
      children: [
        {
          path: 'categorias',
          name: 'CategoriasPage',
          component: CategoriasPage,
        },
        {
          path: 'produto/:id',
          name: 'ProdutoPage',
          component: ProdutoPage,
        },
        {
          path: '',
          redirect: 'catalogo'
        },
        {
          path: 'catalogo',
          name: 'Catalogo',
          component: Catalogo,
        },
        {
          path: 'typography',
          name: 'TypographyPage',
          component: TypographyPage,
        },
        {
          path: 'components/icons',
          name: 'IconsPage',
          component: IconsPage,
        },
        {
          path: 'notifications',
          name: 'NotificationsPage',
          component: NotificationsPage,
        },
        {
          path: 'components/charts',
          name: 'ChartsPage',
          component: ChartsPage,
        },
        {
          path: 'tables',
          name: 'TablesBasicPage',
          component: TablesBasicPage,
        },
        {
          path: 'components/maps',
          name: 'GoogleMapPage',
          component: GoogleMapPage,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {

  // document.title = 'Catálogos Matcon - Construe'

  if (to.name == 'Error' && to.path !== '/error') {
    next('/error');
  } else if(window.localStorage.getItem('authenticated') !== 'true' && to.name !== 'login') {
    next('/login');
  } else if(window.localStorage.getItem('authenticated') === 'true' && to.name === 'login') {
    next(from.path);
  } else if(window.localStorage.getItem("account") == null && to.name !== 'login') {
    window.localStorage.setItem('authenticated','false');
    next('/login');
  } else {
    next();
  }

});

export default router;