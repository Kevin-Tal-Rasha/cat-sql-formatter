<template>
  <a-textarea
    class="input-ori"
    placeholder="将CAT日志贴至文本框内"
    v-model:value="oriString"
    ref="inputOrg"
    @click="oriTextClick"
    @change="oriTextChanged"
    :rows="5"
  />
  <div>
    <label class="statistics">
      成功解析数 / SQL总条数：{{ sqls.length }} / {{ sqlCount }}
    </label>
    <a-button class="btn-copy-all" @click="copyAll"
      ><CopyOutlined /> 复制全部</a-button
    >
  </div>
  <div class="sql-formatter-container">
    <sqlFormatter v-for="sql in sqls" :key="sqls.indexOf(sql)" :sql="sql" />
  </div>
</template>

<script setup>
import sqlFormatter from './sqlFormatter.vue';
import { ref } from 'vue';
import { CopyOutlined } from '@ant-design/icons-vue';
import { copyText } from 'vue3-clipboard';
import { message } from 'ant-design-vue';
import { formatSql } from './formatSql';

const inputOrg = ref();
const oriString = ref('');
const sqls = ref([]);
const sqlCount = ref(0);

function oriTextClick() {
  inputOrg.value.$el.select();
}

function oriTextChanged() {
  const regex =
    /Sql=\s*(\/?\*?.*?\*?\/?\s*\w+\s+[^&]+)[&BatchSize=\d+]*&[Last]*Parameter=(\[[^\]]*\])&/g;

  const results = [];
  sqlCount.value = (oriString.value.match(/Sql=/g) || []).length;

  sqls.value = results;
  let match;
  while ((match = regex.exec(oriString.value))) {
    let sql = match[1];
    const params = JSON.parse(match[2]);

    for (let i = 0; i < params.length; i++) {
      if (typeof params[i] === 'number') {
        sql = sql.replace(/\?/, params[i]);
      } else {
        const param = String(params[i]).replace(/'/g, "''");
        sql = sql.replace(/\?/, "'" + param + "'");
      }
    }

    sql = sql.replace(/，(?=(?:[^']*'[^']*')*[^']*$)/g, ',');
    results.push(formatSql(sql));
  }

  sqls.value = results;
}

function copyAll() {
  if (sqls.value.length)
    copyText(sqls.value.join(';\n\n') + ';', undefined, (error) => {
      if (error) {
        message.success('复制SQL到剪切板失败：' + error);
      } else {
        message.success('已复制所有SQL到剪切板');
      }
    });
}
</script>

<style scoped>
.input-ori {
  margin: 20px;
  width: 95%;
}

.statistics {
  margin-right: 50px;
}

.sql-formatter-container {
  margin-top: 10px;
  height: calc(100% - 210px);
  overflow-y: auto;
}
</style>
