<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>

<template>
  <div class="app">
    <header>
      <h1>The<strong>Anime</strong>Database</h1>

      <form class="search-box">
        <input type="search"
               class="search-field"
               placeholder="Search for an anime..."
               required>
      </form>
    </header>
    <!--
    <main>
      <div class="cards" v-if="animelist.length > 0">
        <Card
            v-for="anime in animelist"
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
