<template>
  <vh-page>
    <h1>Hello</h1>
    {{groupValue}}
    <vh-window>
      <vh-group-checkbox
        :source="group"
        v-model="groupValue"
        style="width:300px"
      />
    </vh-window>
    <vh-button>Hello</vh-button>
  </vh-page>
</template>
<script>
export default {
  data() {
    return {
      groupValue: ["role.remove", "role.view"],
      group: [
        {
          value: 'user',
          text: 'User',
          sub: [
            {
              text: 'List',
              value: 'user.list'
            },
            {
              text: 'Add New',
              value: 'user.new'
            },
            {
              text: 'Edit',
              value: 'user.edit'
            },
            {
              text: 'Remove',
              value: 'user.remove'
            },
            {
              text: 'View',
              value: 'user.view'
            }
          ]
        }, {
          value: 'user2',
          text: 'User2',
          sub: [
            {
              text: 'List',
              value: 'user2.list'
            },
            {
              text: 'Add New',
              value: 'user2.new'
            },
            {
              text: 'Edit',
              value: 'user2.edit'
            },
            {
              text: 'Remove',
              value: 'user2.remove'
            },
            {
              text: 'View',
              value: 'user2.view'
            }
          ]
        },
        {
          value: 'role',
          text: 'Role',
          sub: [
            {
              text: 'List',
              value: 'role.list'
            },
            {
              text: 'Add New',
              value: 'role.new'
            },
            {
              text: 'Edit',
              value: 'role.edit'
            },
            {
              text: 'Remove',
              value: 'role.remove'
            },
            {
              text: 'View',
              value: 'role.view'
            }
          ]
        }
      ]
    };
  },
  setup() {

  },
}
</script>