<template>
  <el-dialog
    title="版本更新日志"
    :visible.sync="visible"
  >
    <version-view />
  </el-dialog>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import VersionView from '@/components/VersionView/index.vue'
import { DialogComponent } from '@/abstract/Component'

@Component({
  components: {
    VersionView
  }
})
export default class VersionDialog extends DialogComponent {
}
</script>

<style lang="scss" scoped>

</style>
