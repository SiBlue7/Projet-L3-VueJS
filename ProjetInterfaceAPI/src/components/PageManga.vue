<script>
import axios from "axios";

export default {
  data() {
    return {
      baseURL: 'https://api.mangadex.org',
      mangaInfo: {},
      mangaInfo2: [{
        titre: "",
        description: ""
      }],
      cover_art: []
    }
  },


  name: "PageManga",
  props: ['id'],

  mounted() {
    this.getMangaInfo();
  },

  methods: {
    // async getMangaInfo() {
    //   const resp = await axios({
    //     method: 'GET',
    //     url: this.baseURL + '/manga',
    //     params: {
    //       mangaTitre: this.mangaTitre
    //     }
    //   }).then(
    //       (result) => {
    //         console.log(result.data.data);
    //         this.mangaInfo = result.data.data;
    //         console.log("Manga tkt : ", this.id )
    //         console.log(this.mangaInfo)
    //       }
    //   );
    // },

    async getMangaInfo() {
      let url = `https://api.mangadex.org/manga/${this.id}` + '?includes[]=cover_art';

      axios.get(url)
      .then(response => {
        this.mangaInfo = response.data.data;
        this.mangaInfo2.titre = response.data.data.attributes.title.en;
        this.mangaInfo2.description = response.data.data.attributes.description.en;
        console.log("Manga info :")
        console.log(this.mangaInfo)


        let i = 0;

        while (this.mangaInfo.relationships[i].type !== 'cover_art') {
          console.log("I dans la boucle : " + i);
          i += 1;
        }
        // console.log(this.mangaInfo.relationships[i]);
        this.mangaInfo.cover_art = response.data.data.relationships[i].attributes.fileName;
        console.log(this.mangaInfo.cover_art)
      })
    }

  },


  // mounted() {
  //   console.log(JSON.parse(this.mangaInfo))
  // }
}
</script>

<template>
  <router-link to="/">Page Accueil</router-link>
  <img
      :src="'https://uploads.mangadex.org/covers/'+this.id+'/'+mangaInfo.cover_art"
  />
  <p>{{mangaInfo2.titre}}</p>

  {{mangaInfo2.description}}
</template>

<style scoped>
img {
  width: 35%;
  height: auto;
}

</style>