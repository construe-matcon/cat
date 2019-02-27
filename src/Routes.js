import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import CadUser from '@/pages/_CadUser/_CadUser';
import ErrorPage from '@/pages/Error/Error';
// Core
import TypographyPage from '@/pages/Typography/Typography';

// Tables
import TablesBasicPage from '@/pages/Tables/Basic';

// Maps
import GoogleMapPage from '@/pages/Maps/Google';

// Main
import Dashboard from '@/pages/Dashboard/Dashboard';

// Charts
import ChartsPage from '@/pages/Charts/Charts';

// Ui
import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';

// Catalogo
import Catalogo from '@/pages/Catalogo/Catalogo';

// Lojas
import Lojas from '@/pages/Lojas/Lojas';

// Categorias
import CategoriasPage from '@/pages/Categorias/Basic';
// Produto
import ProdutoPage from '@/pages/Produto/Produto';
// Associacoes
import RejeitadoPage from '@/pages/Associacoes/Associacoes';

// Importar
import UploadPage from '@/pages/Upload/Upload';


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
          path: '',
          redirect: 'dashboard'
        },
        {
          path: '/admin/cadastro',
          name: 'CadUser',
          component: CadUser,
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'catalogo',
          name: 'Catalogo',
          component: Catalogo,
          children: [
            {
              path: ':id',
              component: Catalogo,
              params: {
                id: ':id'
              },
              children: [
              {
                path: ':idc',
                component: Catalogo,
                params: {
                  id: ':idc'
                }
              }
              ]
            }
          ]
        },
        {
          path: 'lojas',
          name: 'Lojas',
          component: Lojas,
          children: [
            {
              path: ':cnpj',
              component: Lojas,
              params: {
                id: ':cnpj'
              }
            }
          ]
        },
        {
          path: 'categorias',
          name: 'AllCategoriasPage',
          component: CategoriasPage,
          children: [
            {
              path: ':id',
              component: CategoriasPage,
              params: {
                id: ':id'
              }
            }
          ]
        },
        {
          path: 'produto/:id',
          name: 'ProdutoPage',
          component: ProdutoPage,
        },
        {
          path: 'associacoes',
          name: 'RejeitadoPage',
          component: RejeitadoPage,
        },
        {
          path: 'typography',
          name: 'TypographyPage',
          component: TypographyPage,
        },
        {
          path: 'upload',
          name: 'UploadPage',
          component: UploadPage,
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
  } else if (window.location.pathname != '/') {
    window.location = window.location.origin + '#' + window.location.pathname;
  } else {
    next();
  }

});

export default router;