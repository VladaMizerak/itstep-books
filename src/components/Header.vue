<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href='/'>BOOKS</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#about-us">Про нас</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#cooperation">Співпраця</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#contacts">Контакти</a>
          </li>
        </ul>

        <button @click="confirmInputSearch" class="search"><img src="/img/search.png"></button>
        <button class="catalog" type="button" @click="confirmInputCatalog">Каталог</button>

        <button @click="handleAuthButton" class="auth">
          <img v-if="isLoggedIn" src="/img/sign-in.png" alt="Log Out Icon">
          <img v-else src="/img/account.png" alt="Log In Icon">
        </button>
      </div>
    </nav>

    <div v-if="showAuthPopup || showLogoutConfirmation" class="modal">
      <div class="modal-content-logout">
        <auth-user @close="closePopup" />
        <div v-if="showLogoutConfirmation" class="logout-confirmation">
          <p class="title">Ви впевнені, що хочете вийти?</p>
          <div class="logout-confirmation-buttons">
            <button class="logout-confirmation-button" @click="logout">Так</button>
            <button class="logout-confirmation-button" @click="cancelLogout">Відмінити</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthUser from './AuthUser.vue';
import { auth } from "@/firebase/init.js";

export default {
  name: 'Header',
  components: {
    AuthUser,
  },
  data() {
    return {
      showAuthPopup: false,
      isLoggedIn: false,
      showLogoutConfirmation: false,
    };
  },
  computed: {
    authButtonLabel() {
      return this.isLoggedIn ? 'Log Out' : 'Auth';
    },
  },
  methods: {
    confirmInputCatalog() {
      this.$router.push("/catalog");
    },
    confirmInputSearch() {
      if (auth.currentUser) {
          this.$router.push("/search/step1");
        } else {
          this.showPopup();
        }
    },
    showPopup() {
      this.showAuthPopup = true;
    },
    closePopup() {
      this.showAuthPopup = false;
      this.showLogoutConfirmation = false;
    },
    handleAuthButton() {
      if (this.isLoggedIn) {
        this.showLogoutConfirmation = true;
      } else {
        this.showPopup();
      }
    },
    logout() {
      auth.signOut()
        .then(() => {
          this.isLoggedIn = false;
          this.showLogoutConfirmation = false;
          this.$router.push("/");
        })
        .catch((error) => {
          console.log('Error logging out:', error);
        });
    },
    cancelLogout() {
      this.showLogoutConfirmation = false;
    },
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user;
    });
  },
};
</script>







