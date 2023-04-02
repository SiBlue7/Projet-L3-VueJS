<template>
  <div class="card">
    <a :href="manga.url" target="_blank">
      <img src="https://placehold.it/150x250">
      <!--src="https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/4d709522-25f5-4ac0-9b6c-3798a223c7ae.jpg"-->
      <!--
      <img
          :src="'https://uploads.mangadex.org/covers/'+manga.id+'/'+coverName.fileName"
          :alt="manga.title + ' Poster'"
      />
      -->
      <h3>{{ this.manga.title }}</h3>
    </a>
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


.card h3 {
  padding: 16px;
  color: #313131;
  transition: .4s;
}

img:hover {
  transform: scale(1.05);
}

h3:hover {
  color: #24C444;
}
</style>