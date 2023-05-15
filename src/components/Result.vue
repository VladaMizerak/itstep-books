<template>
    <div class="container" id="stepstitle">
        <div class="row">
            <div class="col-6">
                <div>
                    <h3 class="title">ТУТ ДЕКІЛЬКА КНИЖОК, ЯКІ МОЖУТЬ БУТИ ТОБІ ЦІКАВІ!</h3>
                    <h6>ти можеш обрати будь-яку та придбати її в книжковому інтернет-магазині з хорошою знижою,
                        використавши промокод “BOOKSLOVER”</h6>
                </div>
            </div>

            <div class="container" id="step-progress">
                <div class="steps">
                    <div v-for="index in totalSteps" :key="index"
                        :class="[index < currentStep ? 'step passed' : 'step', { active: index === currentStep }]"
                        class="step" @click="goToStep(index)">
                        <span class="step-number">{{ index }}</span>
                    </div>
                </div>
            </div>
            <carousel :items-to-show="1" class="bookslides">
                <slide v-for="book in booksresult" :key="book.id" class="container" id="books">
                    <div>
                        <img src="./img/book1.png">
                    </div>
                    <div class="bookinfo">
                        <div>
                            <h5><strong> {{ book.name }}</strong></h5>
                            <h5> {{ book.author }}</h5>
                        </div>
                        <div>
                            <p> {{ book.description }}</p>
                            <p> {{ book.pages }}</p>
                            <button class="buy" @click="redirectToBookstore(book)">Купити</button>
                        </div>

                    </div>
                </slide>
            </carousel>
            <div class="buttons">
                <button @click="prevStep"><img src="./img/prev.svg"></button>
            </div>
        </div>

    </div>
</template>
  
<script>
import { Carousel, Slide } from 'vue3-carousel'


export default {
    name: 'Result',
    components: {
        Carousel,
        Slide,
    },

    data() {
        return {
            currentStep: 4,
            totalSteps: 4,
        };
    },
    mounted() {
        const queryBooksResult = this.$route.query.booksresult;
        if (queryBooksResult) {
            this.booksresult = JSON.parse(queryBooksResult).flatMap(book => book);
        }
    },

    methods: {
        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
                this.$router.push("/search/step3");
            }
        },
        redirectToBookstore(book) {
            const searchQueryName = book.name.replace(/ /g, '+');
            const bookstoreUrl = `https://www.yakaboo.ua/ua/search?q=${searchQueryName}&for_filter_is_in_stock=Tovary_v_nalichii`;
            window.open(bookstoreUrl, '_blank');
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
};


</script>
  