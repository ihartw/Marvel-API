import Vue from 'vue'
import VueRouter from 'vue-router'
import CharacterList from '../views/CharacterList.vue'
import CharacterDetail from '../views/CharacterDetail.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'CharacterList',
    component: CharacterList,
    params: true
  },
  {
    path: '/CharacterDetail/:id',
    name: 'CharacterDetail',
    component: CharacterDetail,
    params: true
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
