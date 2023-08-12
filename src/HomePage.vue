<template>
  <CatSqlFormatter />
</template>

<script>
import CatSqlFormatter from '@/components/CatSqlFormatter';
export default {
  name: 'HomePage',
  components: { CatSqlFormatter },
  methods: {
    goto(type) {
      this.$router.push('/' + type);
    },
  },
};
</script>

<style lang="less" scoped>
.ant-btn {
  margin-right: 10px;
}
</style>
