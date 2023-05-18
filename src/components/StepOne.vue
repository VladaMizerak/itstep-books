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

        <div v-show="currentStep === 1" class="stepblock">
            <h2>Який жанр тобі б хотілось прочитати сьогодні?</h2>
            <h4>обери свої улюблені жанри</h4>
            <div class="stepsdata">
                <button v-for="category in categorylist" :key="category.id"
                    :class="{ active: stepsData.step1Selection === category }"
                    @click="stepsData.step1Selection = category">{{ category.name }}</button>
            </div>
            <!--<div class="inputblock">
                <h4>або напиши його самостійно</h4>
                <label>
                    <input type="text" class="form-control" placeholder="Психологія...">
                </label> 
            </div>-->

        </div>
        <div class="buttons">
            <button @click="prevStep"><img src="./img/prev.svg"></button>
            <button @click="nextStep"><img src="./img/next.svg"></button>
        </div>
    </div>
</template>

<script>
import categories from "./categories.json";
import stepsData from "./stepsData.json";

export default {
    name: 'StepOne',
    data() {
        return {
            currentStep: 1,
            totalSteps: 4,
            categorylist: categories,
            stepsData: stepsData,
        };
    },
    methods: {
        nextStep() {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.$router.push("/search/step2");
            }
        },
        prevStep() {
            this.$router.go(-1);
        },
        goToStep(step) {
            this.currentStep = step;
            switch (step) {
                case 1:
                    window.location.href = '/search/step1';
                    break;
                case 2:
                    window.location.href = '/search/step2';
                    break;
                case 3:
                    window.location.href = '/search/step3';
                    break;
                case 4:
                    window.location.href = '/search/result';
                    break;
                default:
                    break;
            }
        }
    },

}
</script>









