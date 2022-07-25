<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <van-icon name="delete" />
      <span>全部删除</span>
      &nbsp;&nbsp;
      <span>完成</span>
    </van-cell>
    <van-cell :title="item" v-for="(item, index) in SearchHistories" :key="index">
      <van-icon name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'search-history',
  props: {
    SearchHistories: {
      type: Array,
      required: true
    }
  },
}
</script>

<style></style>
