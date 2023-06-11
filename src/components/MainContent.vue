
<template>
  <div class="maincontent">
    <div class="container" id="about-us">
      <div class="row">
        <div class="col-lg-7 col-sm-12">
          <img class="books2" src="/img/books(3).svg">
        </div>
        <div class="col-lg-5 col-sm-12">
          <div class="block1">
            <h3 class="title">ХТО МИ?</h3>
            <h1 class="text">якщо ти не знаєш, що прочитати сьогодні, наша платформа допоможе тобі
              знайти ідеальну книгу з урахуванням всіх уподобань.</h1>
          </div>
          <div class="block2">
            <h3 class="title">НАШІ ПЕРЕВАГИ</h3>
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th><img src="/img/icon2.svg"></th>
                  <th><img src="/img/icon1.svg"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="text2">отримай нашу знижку в книжкових магазинах </th>
                  <th class="text2">збережи свій час на пошук книги</th>
                </tr>
              </tbody>

              <thead>
                <tr>
                  <th><img src="/img/icon3.svg"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="text2">зроби свій пошук простим та комфортним</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <hr class="line1">
    </div>
    <div class="container" id="suggestion">
      <div class="row">
        <div class="col-lg-10 col-sm-12">
          <h1 class="title2">НАШІ ПРОПОЗИЦІЇ</h1>
        </div>
        <div class="col-lg-2 col-sm-12">
          <a href="/catalog">переглянути більше ></a>
        </div>
      </div>

      <carousel :items-to-show="getItemsToShow()" class="mainslides">
      <slide v-for="book in books" :key="book.id">
        <div class="itembook">
          <img class="bookimage" :src="`/img/${book.img}`">
          <div class="bookname">
            <span>{{ book.name }}</span>
          </div>
          <div class="bookauthor">
            <span>{{ book.author }}</span>
          </div>
          <button class="bookbutton" @click="findSimilarBooks(book)"> Знайти схоже</button>
        </div>
      </slide>
    </carousel>

    </div>
    <div class="container-fluid" id="calltoaction">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 col-sm-12">
            <div class="text3">Не знайшов нічого цікавого для cебе?</div>
            <div class="text4">ми можемо допомогти</div>
          </div>
          <div class="col-lg-2 col-sm-12">
            <button class="booksearch2" type="button" @click="confirmInput">Знайди свою книгу</button>
          </div>
        </div>
      </div>

    </div>
    <div class="container" id="cooperation">
      <div class="row">
        <div class="col-lg-7 col-sm-12">
          <img class="books3" src="/img/books(2).svg">
        </div>
        <div class="col-lg-5 col-sm-12">
          <div class="block1">
            <h3 class="title">ЯКЩО ТИ ВЛАСНИК КНИЖКОВОГО МАГАЗИНУ</h3>
            <h1 class="text">ти можеш долучитись до нашої команди та ділитись своїм асортиментом з читачами.
              Якщо зацікавила пропозиція, залиш, будь ласка, свою заявку.</h1>
          </div>
          <div class="block2">
            <h3 class="title">ПЕРЕВАГИ ДЛЯ ТЕБЕ</h3>
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th><img src="/img/icon1.svg"></th>
                  <th><img src="/img/icon2.svg"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="text2">збільшити продажі</th>
                  <th class="text2">отримати регулярних покупців </th>
                </tr>
              </tbody>

              <thead>
                <tr>
                  <th><img src="/img/icon3.svg"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="text2">прорекламувати свій магазин</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <hr class="line1">
    </div>
    <div class="container" id="contacts">
      <div class="row">
        <div class="col-lg-7 col-sm-12">
          <div class="block1">
            <h3 class="title">СКОНТАКТУЙ!</h3>
            <h1 class="text">якщо виникли питання, то залиш, будь ласка, нам своє повідомлення і наш менеджер зв'яжеться з
              тобою якомога швидше!</h1>
            <h1 class="text">також слідкуй за нами в наших соціальних мережах, щоб дізнаватися про всі новини та
              рекомендації:</h1>
          </div>
          <a href="#"><img class="socialmedia" src="/img/facebook.png"></a>
          <a href="#"><img class="socialmedia" src="/img/instagram.png"></a>
        </div>

        <div class="col-lg-5 col-sm-12" id="contactform">
          <div class="row">
            <div class="col-lg-6 col-sm-12">
              <label class="form-label">Ім'я або назва компанії *</label>
              <input type="text" class="form-control" required v-model="nameOrCompany">
            </div>
            <div class="col-lg-6 col-sm-12">
              <label class="form-label">Номер телефону *</label>
              <input type="tel" class="form-control" required v-model="phoneNumber">
            </div>
          </div>
          <label class="form-label">Коментар</label>
          <input type="text" class="form-control" v-model="comment">
          <div v-if="formError" class="error-message">Заповніть, будь ласка, всі обов'язкові поля</div>
          <button class="submit" type="button" @click="submitForm"><img src="/img/submit.svg"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/init.js";
import { addDoc, collection, getDocs } from 'firebase/firestore';

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  name: 'MainContent',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      books: [],
      nameOrCompany: '',
      phoneNumber: '',
      comment: '',
      formError: false,
    }
  },
  methods: {
    confirmInput() {
      this.$router.push("/search/step1");
    },


    async getData() {
      const querySnapshot = await getDocs(collection(db, 'books'));
      querySnapshot.forEach((doc) => {
        this.books.push(doc.data());
      });
    },
    findSimilarBooks(book) {

      let result = this.books.filter(b => b.category === book.category);

      if (result.length === 0) {
        this.$router.push({ name: "Result" });
        return;
      }

      this.$router.push({ name: "Result", query: { booksresult: JSON.stringify(result) } });
    },
    submitForm() {
      if (this.nameOrCompany.trim() === '' || this.phoneNumber.trim() === '') {
        console.log('Please fill in all required fields');
        this.formError = true
      } else {
        this.saveContactForm();
        this.nameOrCompany = '';
        this.phoneNumber = '';
        this.comment = '';
        this.formError = false;
      }
    },
    saveContactForm() {
      const formData = {
        nameOrCompany: this.nameOrCompany,
        phoneNumber: this.phoneNumber,
        comment: this.comment,
      };
      const collectionRef = collection(db, 'contactForms');
      addDoc(collectionRef, formData)
        .then(() => {
          console.log('Contact form data saved successfully!');
        })
        .catch((error) => {
          console.error('Error saving contact form data:', error);
        });
    },
    getItemsToShow() {
      if (window.innerWidth < 576) {
        return 1.25;
      } else {
        return 3.5;
      }
    },


  },
  mounted() {
    this.getData();
  },
}



</script>


