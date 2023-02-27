<script>
import axios from "axios";

export default {
  data() {
    return {
      baseURL: 'https://api.mangadex.org',
      title: 'Kanojyo to Himitsu to Koimoyou',
      search_query,
      mangaList,
      getManga,
    }
  },
  mounted() {
    this.getManga();
  },

  setup() {

  },

  methods:{
    async getManga() {
      const search_query = ref("");
      const mangaList = ref([]);
      const resp = await axios({
        method: 'GET',
        url: this.baseURL+'/manga',
        params: {
          title: search_query.value
        }
      }).then(
          (result) => {
            console.log(result);
          }
      );
    }
  }

}
</script>

<template>
  <div class="app">
    <header>
      <h1>The<strong>Anime</strong>Database</h1>

      <form class="search-box" @submit.prevent="getManga">
        <input type="search"
               class="search-field"
               placeholder="Search for a manga..."
               required
               v-model="search_query"
        />
      </form>
    </header>
    <!--
    <main>
      <div class="cards" v-if="mangaList.length > 0">
        <Card
            v-for="anime in mangaList"
            :key="anime.mal_id"
            :anime="anime" />
      </div>
      <div class="no-results" v-else>
        <h3>Sorry, we have no results...</h3>
      </div>
    </main>
    -->
  </div>
</template>

<style>

</style>
