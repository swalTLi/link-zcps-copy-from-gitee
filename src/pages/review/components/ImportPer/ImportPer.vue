<template>
    <div>
        <a-modal
                title="选择评审"
                :visible.sync="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <a-select
                    show-search
                    placeholder="请选择项目评审"
                    option-filter-prop="children"
                    style="width: 400px"
                    :filter-option="filterOption"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
            >
                <a-select-option
                                 v-for="item in optionsRank"
                                 :key="item.index"
                                 :label="item.index"
                                 :value="item.index">
                  {{item.name}}
                </a-select-option>
            </a-select>
        </a-modal>
    </div>
</template>
<script src="./ImportPer.js"></script>
