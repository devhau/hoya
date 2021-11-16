<template>
  <vh-page>
    <vh-alert>Hello word! primary</vh-alert>
    <vh-alert type="secondary">Hello word! secondary</vh-alert>
    <vh-alert type="success">Hello word! success</vh-alert>
    <vh-alert type="danger">Hello word! danger</vh-alert>
    <vh-alert type="warning">Hello word! warning</vh-alert>
    <vh-alert type="info">Hello word! info</vh-alert>
    <vh-alert type="light">Hello word! light</vh-alert>
    <vh-alert type="dark">Hello word! dark</vh-alert>
    <vh-pagination
      :current="page"
      :last="100"
      @page="(_page) => (page = _page)"
    />
    {{ checkes }}
    <vh-checkbox v-model="checkes" :value="1" />1
    <vh-checkbox v-model="checkes" :value="2" />2
    <vh-checkbox v-model="checkes" :value="3" />3
    <vh-checkbox v-model="checkes" :value="4" />4
    <vh-checkbox v-model="checkes" :value="5" />5
    {{ text }}
    <vh-quill v-model:content="text"></vh-quill>
  </vh-page>
</template>
<script>
export default {
  data() {
    return {
      page: 0,
      checkes: [2, 3],
      text: "",
    };
  },
  setup() {},
};
</script>
