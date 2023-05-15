import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import StepOne from '../views/SearchStepOne.vue'
import StepTwo from '../views/SearchStepTwo.vue'
import StepThree from '../views/SearchStepThree.vue'
import BooksResult from '../views/BooksResult.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/catalog',
        name: 'Catalog',
        component: Catalog
    },
    {
        path: '/search/step1',
        name: 'StepOne',
        component: StepOne
    },
    {
        path: '/search/step2',
        name: 'StepTwo',
        component: StepTwo
    },
    {
        path: '/search/step3',
        name: 'StepThree',
        component: StepThree
    },
    {
        path: '/search/result',
        name: 'Result',
        component: BooksResult
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
