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


    <div v-show="currentStep === 3" class="stepblock">
      <h2>Якою мовою повинна бути книга?</h2>
      <h4>обери з двох варіантів</h4>
      <div class="stepsdata">
        <button id="tab" v-for="lang in languagelist" :key="lang.id"
          :class="{ active: stepsData.step3Selection === lang }" @click="stepsData.step3Selection = lang">{{ lang.lang
          }}</button>
      </div>
      <div class="container">
        <div v-if="showError" class="error-message">
          Без наявності будь-яких даних, ми не можемо скласти перелік книг.
        </div>
      </div>
  
    </div>
    <div class="buttons">
      <button @click="prevStep"><img src="./img/prev.svg"></button>
      <button @click="submitForm"><img src="./img/next.svg"></button>
    </div>
  </div>

</template>

<script >
import languages from "./languages.json";
import stepsData from "./stepsData.json";
import books from "./books.json";
import VModal from 'vue-js-modal';

export default {
  
  name: 'StepThree',
  components:{
    VModal,
  },
  data() {
    return {
      currentStep: 3,
      totalSteps: 4,
      languagelist: languages,
      stepsData: stepsData,
      books: books,
      booksresult: [],
      showError: false,
    };
  },

  methods: {
  
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.$router.push("/search/step2");
      }
    },

    submitForm() {

      if (!this.stepsData.step1Selection && !this.stepsData.step2Selection && !this.stepsData.step3Selection) {
        this.showError = true; 
        return; 
      }
      console.log("Form submitted!");

      let result = this.books.filter(
        book =>
          book.category === this.stepsData.step1Selection.name &&
          book.author === this.stepsData.step2Selection.name &&
          book.language === this.stepsData.step3Selection.lang

      );
      this.booksresult.push(result)

      this.$router.push({ name: "Result", query: { booksresult: JSON.stringify(this.booksresult) } });
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
    },
    closePopup() {
      this.$modal.hide('popup');
    },
    

  }
}

</script >