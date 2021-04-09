<template>
  <el-dialog
    :visible.sync="visible"
    title="服务器地址配置"
    :close-on-click-modal="false"
  >
    <el-table
      :data="serviceList"
      style="max-height: 300px;overflow: auto"
      border
    >
      <el-table-column align="center" label="序号" type="index" />
      <el-table-column label="别名">
        <template slot-scope="{row}">
          <el-input v-model="row.alias" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column label="Swagger地址">
        <template slot-scope="{row}">
          <el-input v-model="row.address" placeholder="请输入" @change="handleServiceAddressChange(row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100px">
        <template slot-scope="{row,$index}">
          <el-button type="text" style="color: #F56C6C" @click="handleRemoveItem($index)" v-text="'删除'" />
          <el-button v-if="$index === serviceList.length-1" type="text" @click="handleAppendService">新增</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirmClick">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Util } from '@/util'
import FinalValue from '@/util/FinalValue'
import { DialogComponent } from '@/abstract/Component'

@Component
export default class ServiceConfigDialog extends DialogComponent<any, any> {
  serviceList: Service[] = []

  created () {
    const serviceListStorage = Util.getStorage(FinalValue.STORAGE_SERVICE_LIST)
    if (serviceListStorage) {
      this.serviceList = JSON.parse(serviceListStorage)
    }
  }

  handleAppendService () {
    this.serviceList.push({ alias: '', address: '' })
  }

  handleRemoveItem (index: number) {
    this.serviceList.splice(index, 1)
  }

  handleServiceAddressChange (row: Service) {
    row.address = Util.parseSwaggerUrl(row.address)
  }

  handleConfirmClick () {
    Util.setStorage(FinalValue.STORAGE_SERVICE_LIST, JSON.stringify(this.serviceList))
    this.$message.success('保存成功！')
    this.close()
  }

  open () {
    super.open()
    const serviceStorage = Util.getStorage(FinalValue.STORAGE_SERVICE_URL)
    if (serviceStorage) {
      // 插入第一条
      const position = this.serviceList.findIndex(item => item.address === serviceStorage)
      if (position < 0) {
        this.serviceList.push({ alias: '', address: serviceStorage })
      }
    }
    if (!this.serviceList.length) {
      this.handleAppendService()
    }
  }
}

export interface Service {
  alias: string,
  address: string
}

</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;

  .el-button {
    width: 120px;
  }
}
</style>
