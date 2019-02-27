import Vue from 'vue';
import Router from 'vue-router';
import jwt from 'jsonwebtoken';

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
// Usuario
import UserPage from '@/pages/User/User';
// Importar
import UploadPage from '@/pages/Upload/Upload';

//beforeEnter

let user = jwt.decode(JSON.parse(window.localStorage.getItem('account')).token).usuario
,   validateUser = function(page, cb) {
		if (user.id_perfil == 1) {
			cb();
		} else {
			if (user.acessos.indexOf(page) >= 0) {
				cb();
			} else {
				cb('/error');
			}
		}
	}


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
			beforeEnter(to, from, next) {
				validateUser('USUARIOS', next)
			},
		},
		{
			path: 'dashboard',
			name: 'Dashboard',
			component: Dashboard,
			beforeEnter(to, from, next) {
				validateUser('DASHBOARD', next)
			},
		},
		{
			path: 'catalogo',
			name: 'Catalogo',
			component: Catalogo,
			beforeEnter(to, from, next) {
				validateUser('CATALOGOS', next)
			},
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
			path: 'categorias',
			name: 'AllCategoriasPage',
			component: CategoriasPage,
			beforeEnter(to, from, next) {
				validateUser('CATEGORIAS', next)
			},
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
			path: 'associacoes',
			name: 'RejeitadoPage',
			component: RejeitadoPage,
			beforeEnter(to, from, next) {
				validateUser('REJEITADOS', next)
			},
		},
		{
			path: 'minha-conta',
			name: 'UserPage',
			component: UserPage,
		},
		{
			path: 'upload',
			name: 'UploadPage',
			component: UploadPage,
			beforeEnter(to, from, next) {
				validateUser('IMPORTAR_CATALOGO', next)
			},
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
} else if (window.location.pathname != '/') {
	window.location = window.location.origin + '#' + window.location.pathname;
} else {
	next();
}

});

export default router;