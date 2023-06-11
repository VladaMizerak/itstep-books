<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-5 col-sm-12" id="stepstitle">
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
        <button v-for="author in authorlist" :key="author.id" :class="{ active: isAuthorSelected(author) }"
          @click="toggleAuthorSelection(author)">
          {{ author.name }}
        </button>
      </div>
      <h4>або напиши автора самостійно</h4>
      <input type="text" class="form-control" v-model="userInput" placeholder="Стівен Кінг...">
    </div>
    <div class="buttons">
      <button @click="prevStep"><img src="/img/prev.svg"></button>
      <button @click="nextStep"><img src="/img/next.svg"></button>
    </div>
  </div>
</template>

<script>
import stepsData from "./stepsData.json";
import { db } from "@/firebase/init.js";
import { collection, getDocs } from 'firebase/firestore';

export default {
  name: 'StepTwo',
  data() {
    return {
      currentStep: 2,
      totalSteps: 4,
      authorlist: [],
      stepsData: stepsData,
      userInput: "",
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        const selectedAuthors = this.authorlist.filter(author => author.selected);
        if (this.userInput.trim() !== "") {
          selectedAuthors.push({ name: this.formatInput(this.userInput.trim()) });
        }
        console.log("Selected Authors:", selectedAuthors);
        this.stepsData.step2Selection = selectedAuthors;
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
    toggleAuthorSelection(author) {
      author.selected = !author.selected;
    },
    isAuthorSelected(author) {
      return author.selected;
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
    async getData() {
      const querySnapshot = await getDocs(collection(db, 'stepTwoAuthors'));
      this.authorlist = querySnapshot.docs.map((doc) => {
        const authorData = doc.data();
        authorData.selected = false;
        return authorData;
      });
    },
    formatInput(input) {
      const words = input.split(" ");
      const capitalizedWords = words.map(word => {
        if (word.length > 0) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      });
      return capitalizedWords.join(" ");
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
