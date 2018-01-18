<template>
  <div class="homepage">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import navigation from '@/components/nav'
  import { mapMutations, mapActions } from 'vuex'
  import HOMEPAGE_QUERY from '../../gql/getHomepage.gql'

  export default {
    name: 'homepage',
    components: {
      navigation
    },
    data () {
      return {}
    },
    created () {
      this.$apollo.addSmartQuery('getHomepage', {
        query: HOMEPAGE_QUERY,
        result (res) {
          this.isLoading = res.loading
          console.log(res, '请求结果')
          this.STORE_HOMEPAGE_DATA(res.data.getHomepage)
        },
        error (err) {
          console.log(err)
        }
      })
      this.getArticleList()
    },
    methods: {
      ...mapMutations('homepage', [
        'STORE_HOMEPAGE_DATA'
      ]),
      ...mapActions('article', [
        'getArticleList'
      ])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .homepage {
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
  .content {
    height: calc(100vh - 90px);
    width: 100%;
  }
</style>
