<template>
    <div class="herosection">
      <div class="container">
        <div class="row">
          <div class="col-5">
            <div class="maininfo">
              <h6 class="bestchoice">НАЙКРАЩИЙ ВИБІР</h6>
              <h1 class="maintext">BOOKS FOR ALL</h1>
            </div>
  
            <button class="findyourbook" type="button" @click="handleSearchClick">Знайди свою книгу</button>
  
            <h1 class="addtext">Наша платформа підбере для тебе книгу в три кліки</h1>
          </div>
          <div class="col-7">
            <img class="books" src="/img/books.svg">
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid" id="quote">
      <div class="symbol">"</div>
      <div class="quotes">Якщо ти не любиш читати, означає, що ти ще не знайшов потрібну книгу.</div>
      <div class="author">Дж. К. Роулінг</div>
    </div>
  
    <div v-if="showAuthPopup" class="modal">
      <div class="modal-content-logout">
        <auth-user @close="closePopup" />
      </div>
    </div>
  </template>
  
  <script>
  import AuthUser from './AuthUser.vue';
  import { auth } from "@/firebase/init.js";
  
  export default {
    name: 'HeroSection',
    components: {
      AuthUser,
    },
    data() {
      return {
        showAuthPopup: false,
        formType: 'signin',
      };
    },
    methods: {
      handleSearchClick() {
        if (auth.currentUser) {
          this.$router.push("/search/step1");
        } else {
          this.showAuthPopup = true;
        }
      },
      closePopup() {
        this.showAuthPopup = false;
      },
      switchFormType() {
        this.formType = this.formType === 'signin' ? 'signup' : 'signin';
      },
    },
    created() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.closePopup();
        }
      });
    },
  };
  </script>
  
  