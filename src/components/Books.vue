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
            <img class="bookimage" src="./img/book1.png">
            <div class="bookname">
              <span>{{ book.name }}</span>
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

  <div>
  </div>
</template>
  
  
<script>
import booksData from "./books.json";

export default {
  name: 'Books',
  data() {
    return {
      books: booksData,
      searchQuery: '',
      categories: [
        { id: 1, name: "Драма" },
        { id: 2, name: "Жахи" },
        { id: 3, name: "Психологія" },
        { id: 4, name: "Комедія" },
        { id: 5, name: "Українська література" },
        { id: 6, name: "Філософія" },
        { id: 7, name: "Історія" },
        { id: 8, name: "Біографія" },
        { id: 9, name: "Сучасна література" },
      ],
      selectedCategory: [],
    }
  },
  methods: {
    confirmInput() {
      this.$router.push("/search/step1");
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