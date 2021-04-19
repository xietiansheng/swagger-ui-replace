<template>
  <div id="app">
    <index />
    <version-dialog ref="versionRef" />
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import Index from './views/index/index.vue'
import { Util } from '@/util'
import FinalValue from '@/util/FinalValue'
import { Version } from '@/data/Version'
import VersionDialog from '@/components/VersionView/dialog.vue'
import { ElMessage } from 'element-ui/types/message'
import { DialogComponent } from '@/base/BaseComponent'

@Component({
  components: {
    Index,
    VersionDialog
  }
})
export default class App extends Vue {
  /* 全局提示 */
  $message!: ElMessage

  @Ref('versionRef') readonly versionRef!: DialogComponent

  mounted () {
    this.detectVersion()
  }

  /**
   * 版本检测
   */
  detectVersion () {
    // 当前版本是否为最新版本
    if (Version.getOldVersion() !== Version.getVersion()) {
      // 弹出更新信息弹窗
      this.versionRef.open()
      // 将最新版本信息缓存至本地
      Util.setStorage(FinalValue.APP_VERSION, Version.getVersion())
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body, p {
  margin: 0;
  padding: 0;
}

.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}

.text-bold {
  font-weight: bold;
  justify-content: center;
  align-items: center;
}

.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.path-popper {
  .el-cascader-panel, .el-cascader-menu__wrap, .el-scrollbar__wrap {
    height: 500px;
  }
}

::-webkit-scrollbar-track-piece {
  background-color: #fff;
  -webkit-border-radius: 0
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px
}

::-webkit-scrollbar-thumb {
  height: 50px;
  background-color: #b8b8b8;
  -webkit-border-radius: 6px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5
}

::-webkit-scrollbar-thumb:hover {
  height: 50px;
  background-color: #878987;
  -webkit-border-radius: 6px
}
</style>
