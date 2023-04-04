<template>
  <div class="card" v-if="manga !== undefined">
    <div>
<!--      <router-link :to="'/manga/' + manga.id">-->
      <router-link :to="{name: 'PageManga', params: {id: manga.id}}">
      <img
            :src="'https://uploads.mangadex.org/covers/'+manga.id+'/'+manga.cover_art"
            :alt="manga.attributes.title.en + ' Poster'"
        />
        <h4>{{ manga.attributes.title.en }}</h4>
      </router-link>

    </div>
  </div>
</template>

<script>
import PageManga from "@/components/PageManga.vue";
export default {
  components: {PageManga},

  // props: ['manga'],
  props: {
    coverManga: String,
    manga: Object
  },

}
</script>

<style lang="css" scoped>

.card {
  flex: 1 1 33%;
  width: 33%;
  max-width: 33%;
  padding: 0 8px;
  margin-bottom: 16px;
}
  .card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    transition: 0.4s;
  }
  .card h4 {
    padding: 16px;
    color: #313131;
    transition: .4s;
  }

  .card img:hover {
    transform: scale(1.05);
  }

  .card h4:hover {
    color: #24C444;
  }
</style>