<template>
    <div>
        <a-card>
            <div>
                <div style="display: flex;justify-content: space-between;">
                    <a-space class="operator" align="baseline">
                        <ImageButton
                                :src="svg_create"
                                @click="opendetailmodal('Add', {})"
                                :text="'添加账号'"
                        />
                    </a-space>
                </div>
                <standard-table
                        :columns="columns"
                        :dataSource="expertDataSource"
                        :selectedRows.sync="selectedRows"
                        @clear="onClear"
                        @change="onChange"
                        rowKey="id"
                        :loading="pagination.loading"
                        @selectedRowChange="onSelectChange"
                        size="small"
                >
                    <div slot="index" slot-scope="{ index }">
                        {{ index + 1 }}
                    </div>
                    <div slot="allowLogin" slot-scope="record">
                        <a-tag
                                :color="
                record.record['allowLogin'] === 0
                  ? 'red'
                  : record.record['allowLogin'] === 1
                  ? 'green'
                  : 'grey'
              "
                        >
                            {{ getLabel(record.record, "allowLogin") }}
                        </a-tag>
                    </div>
                    <div slot="action" slot-scope="{ record }">
                        <a
                                style="margin-right: 8px"
                                @click="opendetailmodal('Edit', record)"
                        >
                            <a-icon :component="svg_edit" /> 编辑
                        </a>
                        <a-popconfirm
                                title="确认删除？"
                                ok-text="删除"
                                cancel-text="取消"
                                @confirm="deleteRecord(record)"
                        >
                            <a-icon :component="svg_delete" /> 删除
                        </a-popconfirm>
                    </div>
                    <template slot="statusTitle">
                        <a-icon @click.native="onStatusTitleClick" type="info-circle" />
                    </template>
                </standard-table>
                <div
                        style="display: flex;justify-content: space-between;margin-top: 20px;"
                >
                    <div></div>
                    <a-pagination
                            style="right:0px;"
                            v-model="pagination.current"
                            show-size-changer
                            :page-size.sync="pagination.pageSize"
                            :total="pagination.lineCount"
                            @showSizeChange="onShowSizeChange"
                            :page-size-options="pagination.options"
                            :defaultPageSize="pagination.pageSize"
                            :position="'both'"
                    />
                </div>
            </div>
        </a-card>

        <div>
            <!-- 编辑框 -->
            <div v-if="detail_model_data.visible">
                <detail-model
                        ref="DetailModel"
                        :visible="detail_model_data.visible"
                        :type="detail_model_data.type"
                        :title="detail_model_data.tableTitle"
                        :columns="detail_model_data.columns"
                        :width="detail_model_data.width"
                        :record="detail_model_data.record"
                        :userType="detail_model_data.userType"
                        @handleDetailModelSubmit="handleDetailModelSubmit"
                        @getList="getList()"
                        @closemodel="detail_model_data.visible = false"
                />
            </div>
        </div>
    </div>
</template>
<script src="./index.js"></script>

<style scoped>
    .search {
        margin-bottom: 54px;
    }
    .fold {
        width: calc(100% - 216px);
        display: inline-block;
    }
    .operator {
        margin-bottom: 18px;
    }
    @media screen and (max-width: 900px) {
        .fold {
            width: 100%;
        }
    }
</style>
