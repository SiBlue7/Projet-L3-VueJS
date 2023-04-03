<template>
  <div class="card" v-if="manga !== undefined">
    <div>
      <a :href="manga.url" target="_blank">
        <img
            :src="'https://uploads.mangadex.org/covers/'+manga.id+'/'+manga.cover_art"
            :alt="manga.attributes.title.en + ' Poster'"
        />
        <h3>{{ manga.attributes.title.en }}</h3>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['manga']
}
</script>

<style lang="css" scoped>
.card {
  flex: 1 1 33%;
  width: 33%;
  max-width: 33%;
  padding: 0px 8px;
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
  .card h3 {
    padding: 16px;
    color: #313131;
    transition: .4s;
  }

  .card img:hover {
    transform: scale(1.05);
  }

  .card h3:hover {
    color: #24C444;
  }
</style>