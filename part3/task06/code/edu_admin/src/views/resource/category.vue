<template>
  <CategoryList />
</template>

<script lang="ts">
import Vue from 'vue'
import CategoryList from './components/CategoryList.vue'

export default Vue.extend({
  components: { CategoryList },
  name: 'CategoryIndex'
})
</script>

<style lang="scss" scoped></style>
