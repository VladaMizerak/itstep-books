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

    <div v-show="currentStep === 2" class="stepblock">
      <h2>Продовжимо про твого улюбленого автора</h2>
      <h4>обери, чий стиль написання тобі подобається</h4>
      <div class="stepsdata">
        <button id="tab" v-for="author in authorlist" :key="author.id"
          :class="{ active: stepsData.step2Selection === author }" @click="stepsData.step2Selection = author">{{
            author.name }}</button>
      </div>
      <!--<div class="inputblock">
        <h4>або напиши автора самостійно</h4>
        <label>
          <input type="text" class="form-control" placeholder="Стівен Кінг...">
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
import authors from "./authors.json";
import stepsData from "./stepsData.json";

export default {
  name: 'StepTwo',
  data() {
    return {
      currentStep: 2,
      totalSteps: 4,
      authorlist: authors,
      stepsData: stepsData,

    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.$router.push("/search/step3");
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.$router.push("/search/step1");
      }
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