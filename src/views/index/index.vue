<template>
  <el-container class="container">
    <el-container>
      <el-header height="auto" style="padding-top: 15px">
        <search-header />
      </el-header>
      <el-main>
        <request-code />
        <p style="width: 20px" />
        <response-code />
      </el-main>
    </el-container>
  </el-container>
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
  height: 100vh;
  box-sizing: border-box;

  .el-main {
    display: flex;
    box-sizing: border-box;

    > div {
      flex: 1;
    }
  }
}
</style>
