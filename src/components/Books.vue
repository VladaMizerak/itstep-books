<template>
  <div class="container" id="catalog">
    <div class="row">
      <div class="col-3">
        <div>
          <h3 class="title">СПИСОК КНИГ</h3>
        </div>
        <div class="filters">
          <h4>Категорії</h4>
          <div v-for="category in categories" :key="category.id">
            <input type="checkbox" :id="category.id" :value="category.name" v-model="selectedCategory">
            <label :for="category.id">{{ category.name }}</label>
          </div>
        </div>

      </div>
      <div class="col-9">
        <div class="grid-container" id="bookslist">
          <div v-for="book in filteredBooks" :key="book.id">
            <img class="bookimage" src="./img/book1_v1.png" @click="redirectToBookstore(book)">
            <div class="bookname" >
              <span @click="redirectToBookstore(book)">{{ book.name }}</span>
            </div>
            <div class="bookauthor">
              <span>{{ book.author }}</span>
            </div>
            <button class="bookbutton"> Знайти схоже</button>
          </div>
        </div>
      </div>

    </div>

  </div>

  <div class="container-fluid" id="calltoaction">
    <div class="container">
      <div class="row">
        <div class="col-10">
          <div class="text3">Не знайшов нічого цікавого для тебе?</div>
          <div class="text4">ми можемо допомогти</div>
        </div>
        <div class="col-2">
          <button class="booksearch2" type="button" @click="confirmInput">Знайди свою книгу</button>
        </div>

      </div>
    </div>
  </div>
  <calltoaction></calltoaction>
</template>
  
  
<script>
import booksData from "./books.json";
import category from "./categories.json"

export default {
  name: 'Books',
  data() {
    return {
      books: booksData,
      categories: category,
      selectedCategory: [],
    }
  },
  methods: {
    confirmInput() {
      this.$router.push("/search/step1");
    },
    redirectToBookstore(book) {
            const searchQueryName = book.name.replace(/ /g, '+');
            const bookstoreUrl = `https://www.yakaboo.ua/ua/search?q=${searchQueryName}&for_filter_is_in_stock=Tovary_v_nalichii`;
            window.open(bookstoreUrl, '_blank');
    }
  },
  computed: {
    filteredBooks() {
      let filtered = this.books;

      if (this.selectedCategory !== '') {
        return filtered.filter(book => {
          return this.selectedCategory.length === 0 ||
            this.selectedCategory.includes(book.category);
        })
      }

      return filtered;

    },
  },
}

</script>