<template>
  <div class="card">
    <a :href="manga.url" target="_blank">
      <!--src="https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/4d709522-25f5-4ac0-9b6c-3798a223c7ae.jpg"-->
      <img
          :src="'https://uploads.mangadex.org/covers/'+manga.id+'/4d709522-25f5-4ac0-9b6c-3798a223c7ae.jpg'"
          :alt="manga.title + ' Poster'"
      />
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
  padding: 0px 8px;
  margin-bottom: 16px;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    transition: 0.4s;
  }
  h3 {
    padding: 16px;
    color: #313131;
    transition: .4s;
  }
  &:hover {
    img {
      transform: scale(1.05);
    }
    h3 {
      color: #24C444;
    }
  }
}
</style>