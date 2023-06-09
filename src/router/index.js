import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import Catalog from '../views/Catalog.vue';
import StepOne from '../views/SearchStepOne.vue';
import StepTwo from '../views/SearchStepTwo.vue';
import StepThree from '../views/SearchStepThree.vue';
import BooksResult from '../views/BooksResult.vue';
import { auth } from "@/firebase/init.js";

const requireAuth = (to, from, next) => {
    console.log('Destination:', to.name);
    const user = auth.currentUser;
    console.log('User:', user);
    if (to.name === 'StepOne' && !user) {
        console.log('Redirecting to Home');
        next({ name: 'Home' });
    } else {
        console.log('Allowing access');
        next();
    }
};


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
        component: StepOne,
        beforeEnter: requireAuth
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
        component: BooksResult,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
