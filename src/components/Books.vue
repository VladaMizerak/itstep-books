<template>
  <div class="container" id="catalog">
    <div class="row">
      <div class="col-lg-3 col-sm-12">
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
      <div class="col-lg-9 col-sm-12">
        <div class="grid-container" id="bookslist">
          <div v-for="book in paginatedBooks" :key="book.id">
            <img class="bookimage" :src="`/img/${book.img}`" @click="redirectToBookstore(book)">
            <div class="bookname">
              <span @click="redirectToBookstore(book)">{{ book.name }}</span>
            </div>
            <div class="bookauthor">
              <span>{{ book.author }}</span>
            </div>
            <button class="bookbutton" @click="findSimilarBooks(book)">Знайти схоже</button>
          </div>
        </div>
        <div class="pagination">
          <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)">
            {{ pageNumber }}
          </button>
        </div>
      </div>
    </div>
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
</template>
  
  
<script>
import { db } from "@/firebase/init.js";
import { collection, getDocs } from 'firebase/firestore';




export default {
  name: 'Books',
  data() {
    return {
      books: [],
      categories: [],
      selectedCategory: [],

      pagination: {
        currentPage: 1,
        perPage: 6,
      },
    }
  },
  methods: {
    confirmInput() {
      this.$router.push("/search/step1");
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
    async getData() {
      const querySnapshotBooks = await getDocs(collection(db, 'books'));
      const querySnapshotCategories = await getDocs(collection(db, 'stepOneCategories'));
      querySnapshotBooks.forEach((doc) => {
        this.books.push(doc.data());
      });
      querySnapshotCategories.forEach((doc) => {
        this.categories.push(doc.data());
      })
    },

    findSimilarBooks(book) {

      let result = this.books.filter(b => b.category === book.category);

      if (result.length === 0) {
        this.$router.push({ name: "Result" });
        return;
      }

      this.$router.push({ name: "Result", query: { booksresult: JSON.stringify(result) } });
    },
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.pagination.currentPage = pageNumber;
      }
    },
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
    paginatedBooks() {
      const start = (this.pagination.currentPage - 1) * this.pagination.perPage;
      const end = start + this.pagination.perPage;
      return this.filteredBooks.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.pagination.perPage);
    },

  },
  mounted() {
    this.getData();
  },

}
</script>