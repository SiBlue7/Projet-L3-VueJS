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
      let i;

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
            for (i = 0; i < 10; i++) {
              this.mangaList = result.data.data[i];
              console.log("Manga : " + i)
              console.log(this.mangaList)
              this.getMangaCover();
            }

          }
      );
    },

    async getMangaCover() {
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
            console.log("Affichage des infos manga :");
            console.log(result.data.data);
            console.log("---------------------------");
            this.cover_art = result.data.data.relationships[2].attributes.fileName;
            console.log("Covert art :");
            console.log(this.cover_art);
            console.log("---------------------------");
            this.mangaList = result.data.data;
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
