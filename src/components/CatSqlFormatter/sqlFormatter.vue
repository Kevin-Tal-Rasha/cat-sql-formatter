<template>
  <div class="sql-formatter">
    <highlightjs class="sql" language="sql" :code="formatSql(sql)" />
    <a-button class="btn-copy" type="text" @click="copySql">
      <CopyOutlined />
    </a-button>
  </div>
</template>

<script setup>
import { CopyOutlined } from '@ant-design/icons-vue';
import { defineProps } from 'vue';
import { formatSql } from './formatSql';
import { message } from 'ant-design-vue';
import { copyText } from 'vue3-clipboard';

const props = defineProps({
  sql: String,
});

function copySql() {
  copyText(formatSql(props.sql), undefined, (error) => {
    if (error) {
      message.success('复制SQL到剪切板失败：' + error);
    } else {
      message.success('已复制SQL到剪切板');
    }
  });
}
</script>

<style scoped>
.sql-formatter {
  position: relative;
}
.sql-formatter > .sql {
  box-shadow: 0 0 10px #ccc;
  margin: 20px;
  text-align: left;
}

.sql-formatter > .btn-copy {
  position: absolute;
  top: 10px;
  right: 30px;
}
</style>
