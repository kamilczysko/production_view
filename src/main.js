import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Start from './views/Start.vue'
import Element from './views/Element.vue'

require('@/assets/css/normalize.css')
require('@/assets/css/style.css')

const routes = [
    {
        path: '/start',
        name: "Start",
        component: Start
    }, {
        path: '/element',
        name: "Element",
        component: Element
    }, {
        path: '/element/:number',
        name: "Element",
        component: Element
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const store = createStore({
    state() {
        return {
            selectedMenuItem: null
        }
    },
    mutations: {
        setMenuItemActive(state, id) {
            state.selectedMenuItem = id
        }
    }
})

createApp(App).use(router).use(store).mount('#app')

