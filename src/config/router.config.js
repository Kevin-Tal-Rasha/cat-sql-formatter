export default [
  { path: '/', component: () => import('@/HomePage') },
  {
    path: '/CatSqlFormatter',
    component: () => import('@/components/CatSqlFormatter'),
  },
];
