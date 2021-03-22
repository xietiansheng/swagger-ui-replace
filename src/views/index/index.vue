<template>
  <div class="container">
    <header>
      <search-header />
    </header>
    <div class="section">
      <request-code />
      <response-code />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SearchHeader from './components/SearchHeader/index.vue'
import RequestCode from './components/RequestCode/index.vue'
import ResponseCode from './components/ResponseCode/index.vue'

@Component({
  components: {
    SearchHeader,
    RequestCode,
    ResponseCode
  }
})

export default class Index extends Vue {
}
</script>

<style lang="scss">
.container {
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1400px;
  min-width: 1200px;
  margin: 0 auto;

  > header {
    height: 80px;
    margin-bottom: 20px;

    .el-card {
      height: 100%;
    }
  }

  .section {
    display: flex;
    flex: 1;
    height: 400px;

    .el-card {
      flex: 1;

      &:first-child {
        margin-right: 20px;
      }
    }
  }
}
</style>
