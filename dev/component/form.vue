<template>
  <vh-page>
    <div class="p-4">
      <img :src="html" style="width: 100%" />
    </div>
    <div class="p-4">
      <vh-to-image v-model:image="html">
        <h1>Hello {{ text }}</h1>
        <vh-button @click="text = new Date().getTime()">Xinc</vh-button>
      </vh-to-image>
    </div>
  </vh-page>
</template>
<script>
export default {
  data() {
    return {
      html: "",
      groupValue: ["role.remove", "role.view"],
      text: "hello",
      group: [
        {
          value: "user",
          text: "User",
          sub: [
            {
              text: "List",
              value: "user.list",
            },
            {
              text: "Add New",
              value: "user.new",
            },
            {
              text: "Edit",
              value: "user.edit",
            },
            {
              text: "Remove",
              value: "user.remove",
            },
            {
              text: "View",
              value: "user.view",
            },
          ],
        },
        {
          value: "user2",
          text: "User2",
          sub: [
            {
              text: "List",
              value: "user2.list",
            },
            {
              text: "Add New",
              value: "user2.new",
            },
            {
              text: "Edit",
              value: "user2.edit",
            },
            {
              text: "Remove",
              value: "user2.remove",
            },
            {
              text: "View",
              value: "user2.view",
            },
          ],
        },
        {
          value: "role",
          text: "Role",
          sub: [
            {
              text: "List",
              value: "role.list",
            },
            {
              text: "Add New",
              value: "role.new",
            },
            {
              text: "Edit",
              value: "role.edit",
            },
            {
              text: "Remove",
              value: "role.remove",
            },
            {
              text: "View",
              value: "role.view",
            },
          ],
        },
      ],
    };
  },
  setup() {},
};
</script>
<style>
.vh-to-image {
  color: #ccc;
  background: blue;
  padding: 10px;
}
</style>
