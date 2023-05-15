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

          
            <a href="/search/step1"><img class="search" src="./img/search.png"></a>
            <button class="catalog" type="button" @click="confirmInput">Каталог</button>
         
      </div>
    </nav>
  </div>
</template>

<script>
  export default{
    name: 'Header',
    methods:{
    confirmInput(){
      this.$router.push("/catalog");
      }
    }

  }

</script>