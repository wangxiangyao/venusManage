<template>
  <div id="app">
    <div class="nav">
      <navigation />
    </div>
    <router-view/>
  </div>
</template>

<script>
  import navigation from '@/components/nav'
  import { mapActions } from 'vuex'
  export default {
    name: 'app',
    components: {
      navigation
    },
    methods: {
      ...mapActions('author', [
        'getAuthorList'
      ])
    },
    created () {
      this.getAuthorList()
    }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
  a {
    color: #000;
    text-decoration: none;
  }
  .nav {
    flex: none;
    /* 修改height下边content的height一起修改 */
    height: 70px;
    width: 100%;
  }
</style>
