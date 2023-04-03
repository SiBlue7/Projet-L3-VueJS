<script>
import axios from "axios";
import { ref } from "vue";
import Card from "@/components/Card.vue";

export default {
  components: {Card},
  data() {
    return {
      baseURL: 'https://api.mangadex.org',
      title: '',
      cover_art: [],
      search_query: '',
      mangaList: ref([]),
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
            this.mangaList = [];
            for (i = 0; i < 10; i++) {
              //this.mangaList = result.data.data[i];
               this.mangaList.push(result.data.data[i]);
              console.log("Manga : " + i)
              console.log(this.mangaList)
              this.getMangaCover(i);
            }

          }
      );
    },

    async getMangaCover(j) {
      console.log(this.baseURL+'/manga/'+ this.mangaList[j].id + '&includes[]=cover_art');
      const resp = await axios({
        method: 'GET',
        url: this.baseURL+'/manga/'+ this.mangaList[j].id + '?includes[]=cover_art',
        params: {
          // search_query: this.search_query
          title: this.title
        }
      }).then(
          (result) => {
            console.log("Affichage des infos manga :");
            console.log(result.data.data);
            console.log("---------------------------");
            let i = 0;

            console.log("Type livre : " + result.data.data.type)


            while (result.data.data.relationships[i].type !== 'cover_art') {

              console.log("I dans la boucle : " + i);
              i += 1;
            }

            console.log("Type relation : "+ result.data.data.relationships[i].type)
            this.mangaList[j].cover_art = result.data.data.relationships[i].attributes.fileName;
            console.log("Manga id : " + result.data.data.id);
            console.log("Covert art : " + this.cover_art);
            console.log("https://uploads.mangadex.org/covers/" + result.data.data.id + "/" + this.cover_art)
            console.log("---------------------------");
            this.mangaList[j].relations = result.data.data;

            console.log("Contenu de mangaList");
            console.log(this.mangaList);
            console.log(this.cover_art);
            console.log("Taille de mangaList : " + this.mangaList.length);
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
<!--      <div v-for="manga in mangaList">-->
<!--        <div v-if="manga !== undefined">-->
<!--          <h3>{{manga.attributes.title.en}}</h3>-->
<!--          <img-->
<!--              :src="'https://uploads.mangadex.org/covers/'+manga.id+'/'+manga.cover_art"-->
<!--              :alt="manga.attributes.title.en + ' Poster'"-->
<!--          />-->
<!--        </div>-->
<!--        -->


<!--      </div>-->
<!--      <Card-->
<!--          v-for="manga in mangaList"-->
<!--          :manga="manga" />-->
      <div class="cards" v-if="mangaList.length > 0">
        <Card
            v-for="manga in mangaList"
            :manga="manga" />
      </div>
      <div class="no-results" v-else>
        <h3>Sorry, we have no results...</h3>
      </div>
      -->
    </main>

  </div>
</template>

<style>
img {
  max-width: 150px;
  max-height: 250px;
}
</style>
