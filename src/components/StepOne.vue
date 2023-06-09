<template>
    <div class="container">
        <div class="row">
            <div class="col-5" id="stepstitle">
                <h3 class="title">РОЗКАЖИ НАМ ПРО СВОЇ ІНТЕРЕСИ</h3>
                <h6>слідуй <strong>3 </strong>прості кроки та отримай перелік книжкових пропозицій</h6>
            </div>
        </div>
    </div>
    <div class="container" id="step-progress">
        <div class="steps">
            <div v-for="index in totalSteps" :key="index"
                :class="[index < currentStep ? 'step passed' : 'step', { active: index === currentStep }]" class="step"
                @click="goToStep(index)">
                <span class="step-number">{{ index }}</span>
            </div>
        </div>

        <div class="stepblock">
            <h2>Який жанр тобі б хотілось прочитати сьогодні?</h2>
            <h4>обери свої улюблені жанри</h4>
            <div class="stepsdata">
                <button v-for="category in categorylist" :key="category.id"
                    :class="{ active: isCategorySelected(category) }" @click="toggleCategorySelection(category)">
                    {{ category.name }}
                </button>
            </div>
            <h4>або напиши його самостійно</h4>
            <input type="text" class="form-control" v-model="userInput" placeholder="Драма...">

        </div>
        <div class="buttons">
            <button @click="prevStep"><img src="/img/prev.svg"></button>
            <button @click="nextStep"><img src="/img/next.svg"></button>
        </div>
    </div>
</template>
    
<script>
import { db } from "@/firebase/init.js";
import { collection, getDocs } from 'firebase/firestore';
import stepsData from "./stepsData.json";

export default {
    name: 'StepOne',
    data() {
        return {
            currentStep: 1,
            totalSteps: 4,
            categorylist: [],
            stepsData: stepsData,
            userInput: "",
        };
    },
    methods: {
        nextStep() {
            if (this.currentStep < this.totalSteps) {
                const selectedCategories = this.categorylist.filter(category => category.selected);
                if (this.userInput.trim() !== "") {
                    selectedCategories.push({ name: this.formatInput(this.userInput.trim()) });
                }
                console.log("Selected Categories:", selectedCategories);
                this.stepsData.step1Selection = selectedCategories;
                this.currentStep++;
                this.$router.push("/search/step2");
            }
        },
        prevStep() {
            this.$router.go(-1);
        },
        async getData() {
            const querySnapshot = await getDocs(collection(db, 'stepOneCategories'));
            querySnapshot.forEach((doc) => {
                const category = doc.data();
                category.selected = false; 
                this.categorylist.push(category);
            });
        },
        toggleCategorySelection(category) {
            category.selected = !category.selected;
        },
        isCategorySelected(category) {
            return category.selected;
        },
        goToStep(step) {
            this.currentStep = step;
            switch (step) {
                case 1:
                    this.$router.push("/search/step1");
                    break;
                case 2:
                    this.$router.push("/search/step2");
                    break;
                case 3:
                    this.$router.push("/search/step3");
                    break;
                case 4:
                    this.$router.push("/search/result");
                    break;
                default:
                    break;
            }
        },
        formatInput(input) {
            return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        },
    },
    async mounted() {
        await this.getData();
    },
};
</script>
    
  
  
  
  





