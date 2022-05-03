<template>
  <div>
    <a-modal
      v-if="form"
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      :width="type === 'Info' ? 1200 : width"
      :destroyOnClose="true"
    >
      <detail v-if="type === 'Info'" :columns="columns" :record="form" />

      <a-form-model
        v-show="type === 'Edit' || type === 'Add'"
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item
          :ref="item.dataIndex"
          v-if="
            ((item.edit_show && type === 'Edit') ||
              (item.add_show && type === 'Add')) &&
              rules
          "
          v-for="item in columns"
          :key="item.dataIndex"
          :label="item.title"
          :prop="item.dataIndex"
        >
          <!-- 输入框 ldq-input -->
          <div v-if="!item.is_Editable" >
            {{ form[item.dataIndex] }}
          </div>
          <div v-if="item.formType === 'ldq-input' && item.is_Editable">
            <a-input
              :placeholder="item.placeholder"
              v-model="form[item.dataIndex]"
              @pressEnter="onSubmit"
              @blur="
                () => {
                  $refs[item.dataIndex][0].onFieldBlur();
                }
              "
            />
          </div>
          <!-- 单选 ldq-radio -->
          <div
            v-else-if="
              item.formType === 'ldq-radio' && item.radios && item.is_Editable
            "
          >
            <a-radio-group
              :placeholder="item.placeholder"
              v-model="form[item.dataIndex]"
              name="radioGroup"
            >
              <a-radio
                v-for="radio in item.radios"
                :key="radio.value"
                :value="radio.value"
              >
                {{ radio.label }}
              </a-radio>
            </a-radio-group>
          </div>
          <!-- 下拉选择 ldq-select -->
          <div
            v-else-if="
              item.formType === 'ldq-select' && item.selects && item.is_Editable
            "
          >
            <a-select
              show-search
              :placeholder="item.placeholder"
              option-filter-prop="children"
              v-model="form[item.dataIndex]"
              :filter-option="filterOption"
              @dropdownVisibleChange="handleFocus(item, item.dataIndex)"
              @blur="handleBlur2"
              @change="handleChange"
              :default-value="{ id: form[item.dataIndex] }"
            >
              <a-select-option
                v-for="selectItem in item.selects"
                :value="selectItem.id"
                :key="selectItem.id"
              >
                {{ selectItem.name }}
              </a-select-option>
            </a-select>
          </div>
          <!-- 时间戳 -->
          <div v-else-if="item.formType === 'ldq-datatime' && item.is_Editable">
            <a-date-picker
              :defaultValue="
                moment(getLocalTime(form[item.dataIndex]), 'YYYY-MM-DD')
              "
              format="YYYY-MM-DD"
              style="width:100%"
              @change="
                (date, dateString) => datatimeChange(dateString, item.dataIndex)
              "
            >
              <a-icon slot="suffixIcon" type="smile" />
            </a-date-picker>
          </div>
          <!-- 年月日时分秒 -->
          <div
            v-else-if="item.formType === 'ldq-datatime-m' && item.is_Editable"
          >
            <a-date-picker
              :defaultValue="
                moment(
                  getLocalTime(form[item.dataIndex]),
                  'YYYY-MM-DD HH:mm:ss'
                )
              "
              show-time
              placeholder="Select Time"
              @change="
                (date, dateString) => datatimeChange(dateString, item.dataIndex)
              "
              @ok="onOk"
            />
          </div>
        </a-form-model-item>
      </a-form-model>
      <div>
        <!-- 内嵌表格 -->
        <author-table
          :columns="columns"
          :formType="'ldq-list'"
          :records="record"
          :option="type === 'Info'"
          v-if="record.authors"
          :id="record.id"
          :userType="userType"
          :listIndex="listIndex"
        ></author-table>
      </div>
      <template slot="footer">
        <div v-if="type === 'Info'">
          <a-button key="back" @click="handleCancel">
            返回
          </a-button>
          <a-button key="submit" type="primary" @click="handleCancel">
            完成
          </a-button>
        </div>
        <div v-if="type === 'Edit' || type === 'Add'">
          <a-button key="back" @click="resetForm">
            重置
          </a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="confirmLoading"
            @click="onSubmit"
          >
            提交
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script src="./detailModel.js"></script>
<style lang="less" scoped>
#svg-btn {
  cursor: pointer;
  border: 1px solid rgb(217 217 217);
  padding: 3.5px 15px;
  border-radius: 3.5px;
  transition: 0.5;
}
#svg-btn:hover {
  border: 1px solid #1890ff;
}
.ant-col-4 {
  width: 35.66666667%;
  text-align: left;
}
</style>
