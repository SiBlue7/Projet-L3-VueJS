<script>
import axios from "axios";
import Card from "@/components/Card.vue";

export default {
  components: {Card},
  data() {
    return {
      baseURL: 'https://api.mangadex.org',
      title: '',
      cover_art: '',
      search_query: '',
      mangaList: [],
    }
  },
  mounted() {
    this.getManga();
    //this.getMangaCover();
  },

  setup() {

  },

  methods:{
    async getManga() {
      const resp = await axios({
        method: 'GET',
        url: this.baseURL+'/manga',
        params: {
          // search_query: this.search_query
          title: this.title
        }
      }).then(
          (result) => {
            console.log(result.data.data);
            this.mangaList = result.data.data[0];
            this.getMangaCover();
          }
      );
    },

    async getMangaCover() {
      console.log(this.mangaList);
      console.log(this.baseURL+'/manga/'+ this.mangaList.id + '&includes[]=cover_art');
      const resp = await axios({
        method: 'GET',
        url: this.baseURL+'/manga/'+ this.mangaList.id + '?includes[]=cover_art',
        params: {
          // search_query: this.search_query
          title: this.title
        }
      }).then(
          (result) => {
            console.log(result);
            this.mangaList = [result];
          }
      );
    }
  }

}
</script>

<template>
  <div class="app">
    <header>
      <h1>The<strong>Manga</strong>Database</h1>

      <form class="search-box" @submit.prevent="getManga">
        <input type="search"
               class="search-field"
               placeholder="Search for a manga..."
               required
               v-model="title"
        />
      </form>
    </header>

    <main>
      <div class="cards" v-if="mangaList.length > 0">
        <Card
            v-for="manga in mangaList"
            :key="manga.data.data.id"
            :manga="manga" />
      </div>
      <div class="no-results" v-else>
        <h3>Sorry, we have no results...</h3>
      </div>
    </main>

  </div>
</template>

<style>

</style>
