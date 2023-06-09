<template>
    <div class="auth-popup">
      <span class="close-button" @click="closePopup">&times;</span>
      <div class="auth-content">
        <h4>{{ formType === 'signin' ? 'Увійти в обліковий запис' : 'Зареєструвати обліковий запис' }}</h4>
        <p v-if="formType === 'signin' && !showLogoutConfirmation && logoutConfirmation" class="logout-confirmation">{{ logoutConfirmation }}</p>
        <form @submit.prevent="submitForm">
          <!-- Sign-in form -->
          <div v-if="formType === 'signin'">
            <label for="email" class="auth-control">Поштова скринька:</label>
            <input type="email" class="auth-label" v-model="email" required>
  
            <label for="password" class="auth-control">Пароль:</label>
            <input type="password" class="auth-label" v-model="password" required>
  
            <button type="submit">Увійти </button>
            <p class="switch-message">Не маєте облікового запису? <a @click="switchFormType">Зареєструватись</a></p>
          </div>
  
          <!-- Sign-up form -->
          <div v-else>
            <label for="email" class="auth-control">Поштова скринька:</label>
            <input type="email" class="auth-label" v-model="email" required>
            <label for="password" class="auth-control">Пароль:</label>
            <input type="password" class="auth-label" v-model="password" required>
            <label for="confirmPassword" class="auth-control">Підтвердити пароль:</label>
            <input type="password" class="auth-label" v-model="confirmPassword" required>
            <button type="submit">Зареєструватись</button>
            <p class="switch-message">Вже маєте обліковий запис? <a @click="switchFormType">Увійти</a></p>
          </div>
  
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </template>
  
  
  
  <script>
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from "@/firebase/init.js";
  
  export default {
    name: 'AuthUser',
    data() {
      return {
        formType: 'signin',
        email: '',
        password: '',
        confirmPassword: '',
        errorMessage: '',
        logoutConfirmation: '',
        showLogoutConfirmation: false,
      };
    },
    methods: {
      async submitForm() {
        if (this.formType === 'signin') {
          await this.signIn();
        } else {
          await this.signUp();
        }
      },
      async signIn() {
        try {
          await signInWithEmailAndPassword(auth, this.email, this.password);
          const user = auth.currentUser;
          this.$store.dispatch('setUser', user);
          this.closePopup();
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
      async signUp() {
        try {
          if (this.password !== this.confirmPassword) {
            throw new Error("Passwords do not match");
          }
          await createUserWithEmailAndPassword(auth, this.email, this.password);
          this.closePopup();
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
      closePopup() {
        if (this.showLogoutConfirmation) {
          this.showLogoutConfirmation = false;
        } else {
          this.$emit('close');
        }
      },
      switchFormType() {
        this.formType = this.formType === 'signin' ? 'signup' : 'signin';
        this.errorMessage = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
      },
    },
  };
  </script>