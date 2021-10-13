import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import Start from './views/Start.vue'
import Element from './views/Element.vue'
import ProductionView from './views/ProductionView.vue'
import ProductionPlanningView from './views/ProductionPlanningView.vue'

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
    }, {
        path: '/production-view',
        name: "ProductionView",
        component: ProductionView
    }, {
        path: '/production-planning-view',
        name: "ProductionPlanningView",
        component: ProductionPlanningView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const store = createStore({
    state() {
        return {
            selectedMenuItem: null,
            selectedOperation: null
        }
    },
    mutations: {
        setMenuItemActive(state, id) {
            state.selectedMenuItem = id
        },
        selectOperationToMove(state, operation) {
            state.selectedOperation = operation
        }

    }
})

createApp(App).use(router).use(store).mount('#app')

