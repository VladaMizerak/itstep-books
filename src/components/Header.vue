<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="/">BOOKS</a>
      
      <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation" @click="toggleMenu">
        <img v-if="isMobileMenuOpen" src="/img/close.png">
        <img v-else src="/img/menu.png">
      </button>

      <div :class="['collapse', 'navbar-collapse', { 'show': isMobileMenuOpen }]" id="navbarSupportedContent">
        <div class="menu-container">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#about-us" @click="closeMenu">Про нас</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#cooperation" @click="closeMenu">Співпраця</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contacts" @click="closeMenu">Контакти</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="header-icons d-none d-lg-block">
        <button class="catalog" type="button" @click="confirmInputCatalog">Каталог</button>
        <button @click="confirmInputSearch" class="search "><img src="/img/search.png"></button>
      </div>
      <button @click="handleAuthButton" class="auth">
        <img v-if="isLoggedIn" src="/img/sign-in.png" alt="Log Out Icon">
        <img v-else src="/img/account.png" alt="Log In Icon">
      </button>
    </nav>

    <div v-if="showAuthPopup" class="modal">
      <div class="modal-content-logout">
        <auth-user @close="closePopup" v-if="!showLogoutConfirmation" />
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
      isMobileMenuOpen: false,
    };
  },
  computed: {
    authButtonLabel() {
      return this.isLoggedIn ? 'Log Out' : 'Auth';
    },
  },
  methods: {
    closeMenu() {
      this.isMobileMenuOpen = false;
    },
    toggleMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
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
      if (this.isLoggedIn && !this.showLogoutConfirmation) {
        this.showLogoutConfirmation = true;
      } else {
        this.showAuthPopup = true;
      }
    },
    logout() {
      auth
        .signOut()
        .then(() => {
          this.isLoggedIn = false;
          this.showLogoutConfirmation = false;
          this.showAuthPopup = false;
          this.$router.push("/");
        })
        .catch((error) => {
          console.log('Error logging out:', error);
        });
    },
    cancelLogout() {
      this.showLogoutConfirmation = false;
      this.showAuthPopup = false;
      this.$router.push("/");
    },
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user;
    });
  },
};
</script>










