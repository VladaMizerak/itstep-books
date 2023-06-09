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
          :class="{ active: stepsData.step3Selection === lang }" @click="stepsData.step3Selection = lang">{{
            lang.lang }}</button>
      </div>
      <div class="container">
        <div v-if="showError" class="error-message">
          Без наявності будь-яких даних, ми не можемо скласти перелік книг.
        </div>
      </div>
    </div>
    <div class="buttons">
      <button @click="prevStep"><img src="/img/prev.svg"></button>
      <button @click="submitForm"><img src="/img/next.svg"></button>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/init.js";
import { collection, getDocs } from 'firebase/firestore';
import stepsData from "./stepsData.json";
import VModal from 'vue-js-modal';

export default {
  name: 'StepThree',
  components: {
    VModal,
  },
  data() {
    return {
      currentStep: 3,
      totalSteps: 4,
      languagelist: [],
      stepsData: stepsData,
      books: [],
      showError: false,
    };
  },
  methods: {
    async getData() {
      const querySnapshotLang = await getDocs(collection(db, 'stepThreeLanguages'));
      const querySnapshotBooks = await getDocs(collection(db, 'books'));
      querySnapshotLang.forEach((doc) => {
        this.languagelist.push(doc.data());
      });
      querySnapshotBooks.forEach((doc) => {
        this.books.push(doc.data());
      });
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.$router.push("/search/step2");
      }
    },
    submitForm() {
      if (
        this.stepsData.step1Selection.length === 0 &&
        this.stepsData.step2Selection.length === 0 &&
        !this.stepsData.step3Selection
      ) {
        this.showError = true;
        return;
      }

      console.log("Form submitted!");

      let filteredBooks = this.books;

      if (this.stepsData.step1Selection.length > 0) {
        filteredBooks = filteredBooks.filter(book =>
          this.stepsData.step1Selection.some(
            category => category.name === book.category
          )
        );
      }

      if (this.stepsData.step2Selection.length > 0) {
        filteredBooks = filteredBooks.filter(book =>
          this.stepsData.step2Selection.some(
            author => author.name === book.author
          )
        );
      }

      if (this.stepsData.step3Selection) {
        filteredBooks = filteredBooks.filter(book =>
          this.stepsData.step3Selection.lang === book.language
        );
      }

      filteredBooks = filteredBooks.filter(
        book => book.rate >= 4 && book.rate <= 5
      );

      if (filteredBooks.length === 0) {
        this.$router.push({ name: "Result" });
        return;
      }

      console.log("Filtered Books:", filteredBooks);
      console.log("stepsData:", this.stepsData);

      this.$router.push({ name: "Result", query: { booksresult: JSON.stringify(filteredBooks) } });

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
  },
  mounted() {
    this.getData();
  },
};
</script>
