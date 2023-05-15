<template>
    <div class="herosection">
        <div class="container">
            <div class="row">
                <div class="col-5">
                    <div class="maininfo">
                        <h6 class="bestchoice">НАЙКРАЩИЙ ВИБІР</h6>
                        <h1 class="maintext">BOOKS FOR ALL</h1>
                    </div>

                    <button class="findyourbook" type="button" @click="confirmInput">Знайди свою книгу</button>
                
                    <h1 class="addtext">Наша платформа підбере для тебе книгу в три кліки </h1>
                </div>
                <div class="col-7">
                    <img class="books" src="./img/books.svg">
                </div>
            </div>
        </div>
    </div> 
    <div class="container-fluid" id="quote">
        <div class="symbol">"</div>
        <div class="quotes">Якщо ти не любиш читати, означає, що ти ще не знайшов потрібну книгу.</div>
        <div class="author"> Дж. К. Роулінг</div>
    </div>
</template>

<script>
  export default{
    name: 'HeroSection',
    methods:{
    confirmInput(){
      this.$router.push("/search/step1");
      }
    }
  }

</script>