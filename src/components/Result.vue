<template>
    <div class="container" id="stepstitle">
        <div class="row">
            <div class="col-lg-6 col-sm-12">
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
            <carousel v-if="booksresult.length > 0" :items-to-show="1" class="bookslides">
                <slide v-for="book in booksresult" :key="book.id" class="container" id="books">
                    <div>
                        <img :src="`/img/${book.img}`">
                    </div>
                    <div class="bookinfo">
                        <div>
                            <h5><strong> {{ book.name }}</strong></h5>
                            <h5> {{ book.author }}</h5>
                        </div>
                        <div>
                            <p> {{ book.description }}</p>
                            <div class="rating">
                                <span v-for="n in 5" :key="n" :class="{ filled: n <= book.rating }">&#9733;</span>
                            </div>
                            <p> {{ book.pages }} сторінок</p>

                            <button class="buy" @click="redirectToBookstore(book)">Купити</button>
                        </div>


                    </div>
                </slide>
            </carousel>
            <div v-else class="no-books-message">
                <p>Вибачте, схоже наразі немає книги згідно ваших вподобань.</p>
            </div>
            <div class="buttons">
                <button @click="prevStep"><img src="/img/prev.svg"></button>
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
            booksresult: [],
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
            const ukrainianToLatinMap = {
                а: 'a', б: 'b', в: 'v', г: 'g', ґ: 'g', д: 'd', е: 'e', є: 'e', ж: 'zh', з: 'z',
                и: 'i', і: 'i', ї: 'i', й: 'j', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p',
                р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'c', ч: 'ch', ш: 'sh', щ: 'shch', ю: 'ju', я: 'ja',
                1: '1', 9: '9', 8: '8', 4: '',
            };
            const words = book.name.toLowerCase().split(' ');
            const latinName = words.map((word) => {
                const cleanedWord = word.replace(/«|»/g, '');
                return Array.from(cleanedWord, (char, index) => {
                    if (char === 'ь') {
                        if (index === cleanedWord.length - 1) {
                            return '';
                        } else {
                            return '-';
                        }
                    }
                    return ukrainianToLatinMap[char] || char;
                }).join('');
            }).join('-');
            const searchQueryName = encodeURIComponent(latinName.toLowerCase()).replace(/%2C/g, '').replace(/%20/g, '-');
            const bookstoreUrl = `https://www.yakaboo.ua/ua/${searchQueryName}.html`;
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
  
  