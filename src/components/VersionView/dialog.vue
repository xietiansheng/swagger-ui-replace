<template>
  <el-dialog
    title="版本更新日志"
    :visible.sync="visible"
  >
    <version-view />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VersionView from '@/components/VersionView/index.vue'

@Component({
  components: {
    VersionView
  }
})
export default class VersionDialog extends Vue {
  private visible = false

  open () {
    this.visible = true
  }
}
</script>

<style lang="scss" scoped>

</style>
