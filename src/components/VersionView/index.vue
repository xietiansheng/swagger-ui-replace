<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="(version,index) in versionHistory"
        :key="version.version"
        :timestamp="`version：${version.version} -  ${version.timestamp}`"
        placement="top"
        :color="index === 0?primaryColor:''"
      >
        <el-card>
          <template v-if="version.func.length">
            <h4 class="title">新增功能</h4>
            <p v-for="(item,key) in version.func" :key="item.id" class="message">
              {{ key + 1 }}、{{ item.message }}
            </p>
          </template>
          <template v-if="version.issue.length">
            <h4 class="title">修复问题</h4>
            <p v-for="(item,key) in version.issue" :key="item.id" class="message">
              {{ key + 1 }}、 {{ item.message }}
            </p>
          </template>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Version, VersionHistory } from '@/data/Version'
import FinalValue from '@/util/FinalValue'

@Component
export default class VersionView extends Vue {
  versionHistory: VersionHistory[] = Version.history
  primaryColor = FinalValue.PRIMARY_COLOR
}
</script>

<style lang="scss" scoped>
.block{
  max-height: 400px;
  overflow: auto;
  padding-right: 10px;
  .title {
    color: #1f2f3d;
  }

  .message {
    margin-top: 8px;
    color: #5e6d82;
  }
}
</style>
