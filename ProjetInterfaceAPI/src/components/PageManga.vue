<script>
import axios from "axios";

export default {
  data() {
    return {
      // url de base pour la requete pour l'API et initialisation des différentes variables
      baseURL: 'https://api.mangadex.org',
      mangaInfo: {},
      mangaInfo2: [{
        titre: "",
        description: ""
      }],
      cover_art: [],
      mangaChapter: [],
    }
  },
  name: "PageManga",
  props: ['id'],

  mounted() {
    this.getMangaInfo();
  },

  methods: {
    // création de la méthode pour envoyer les requetes
    async getMangaInfo() {
      //url pour récupérer le manga et la cover
      let url = this.baseURL + `/manga/${this.id}` + '?includes[]=cover_art';
      //url pour récupérer les chapitres
      let url_chapter = this.baseURL + `/manga/${this.id}` + '/feed';

      //récupération des réponses liées à la première url
      axios.get(url)
      .then(response => {
        this.mangaInfo = response.data.data;
        this.mangaInfo2.titre = response.data.data.attributes.title.en;
        this.mangaInfo2.description = response.data.data.attributes.description.en;


        let i = 0;

        while (this.mangaInfo.relationships[i].type !== 'cover_art') {
          i += 1;
        }
        this.mangaInfo.cover_art = response.data.data.relationships[i].attributes.fileName;
      })

      //récupération des réponses liées à la deuxième url
      axios.get(url_chapter)
          .then(result => {
            this.mangaChapter = result.data.data
                .sort((a, b) => a.attributes.chapter - b.attributes.chapter);
            console.log("Chapter : ")
            console.log(this.mangaChapter)
          })
    }

  },
}
</script>

<template>
  <div class="link-accueil">
    <router-link to="/"><a>Page Accueil</a></router-link>
  </div>
  <div class="card_manga">
    <div class="card_manga_gauche">
      <img class="page_cover_manga"
           :src="'https://uploads.mangadex.org/covers/'+this.id+'/'+mangaInfo.cover_art"
      />
    </div>
    <div class="card_manga_droite">
      <h1>{{mangaInfo2.titre}}</h1>
      <p>{{mangaInfo2.description}}</p>
      <div class="chapter_container">
        <div class="affichage_chapter" v-for="chapitre in mangaChapter">
          <li v-if="chapitre.attributes.translatedLanguage === 'en'">
            <a :href="'https://mangadex.org/chapter/' + chapitre.id">Go lire le chapitre ! {{chapitre.attributes.title}}</a>
            <div class="affichage_chapter_number">
              <p>{{chapitre.attributes.chapter}}</p>
            </div>
            <div class="affichage_chapter_language">
              <p>{{chapitre.attributes.translatedLanguage}}</p>
            </div>
          </li>
          <!--<li class="other_chapter" v-else>
            {{chapitre.attributes.chapter}}
            {{chapitre.attributes.translatedLanguage}}
          </li>-->
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.link-accueil {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.card_manga {
  display: flex;
}

.card_manga_gauche {
  width: 45%;
  height: 650px;
  display: flex;
  justify-content: center;
}

.card_manga_droite {
  width: 77%;
}

.card_manga_droite h1 {
  display: flex;
  justify-content: center;
  margin: 15px;
}

.card_manga_droite p {
  margin: 15px;
}

.chapter_container {
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(5, 1fr);
}

.affichage_chapter {
  flex: 1 1 33%;
}

.affichage_chapter li {
  display: flex;
  flex-direction: row;
  width: 30%;
  padding: 5px;
}

.affichage_chapter li p {
  margin-left: 5px;
}

.affichage_chapter .affichage_chapter_number {
  width: 30%;
  display: flex;
  justify-content: center;
}

.affichage_chapter .affichage_chapter_language {
  width: 30%;
  display: flex;
  justify-content: center;
}

.affichage_chapter .other_chapter {
  display: none;
}

.page_cover_manga {
  width: 80%;
  height: auto;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: .4s;
}

.page_cover_manga:hover {
  transform: scale(1.05);
}

</style>