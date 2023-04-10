<script>
import axios from "axios";
import Card from "@/components/Card.vue";

export default {
  components: {Card},
  data() {
    return {
      baseURL: 'https://api.mangadex.org',
      title: '',
      cover_art: [],
      search_query: '',
      mangaList: [],
    }
  },
  mounted() {
    this.getManga();
  },

  methods:{
    async getManga() {
      let i;

      const resp = await axios({
        method: 'GET',
        url: this.baseURL+'/manga',
        params: {
          title: this.title
        }
      }).then(
          (result) => {
            this.mangaList = [];
            for (i = 0; i < 10; i++) {
               this.mangaList.push(result.data.data[i]);
              this.getMangaCover(i);
            }

          }
      );
    },

    async getMangaCover(j) {
      const resp = await axios({
        method: 'GET',
        url: this.baseURL+'/manga/'+ this.mangaList[j].id + '?includes[]=cover_art',
        params: {
          title: this.title
        }
      }).then(
          (result) => {
            let i = 0;
            while (result.data.data.relationships[i].type !== 'cover_art') {
              i += 1;
            }
            this.mangaList[j].cover_art = result.data.data.relationships[i].attributes.fileName;
            this.mangaList[j].relations = result.data.data;
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
