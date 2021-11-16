<template>
  <div>
    {{filter}}
    <vh-table
      :source="source"
      :option="option"
      :sort="sort"
      :filter="filter"
      @sort="(col,stats)=>sort[col.field]=stats"
      @filter="(col,stats)=>filter[col.field]=stats"
    >
      <template #field_name="{column,row}">
        {{row[column.field]}}
      </template>
    </vh-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sort: {},
      filter: {},
      option: {
        styleRow: (row, index) => {
          return index % 2 != 0 ? '' : '';
        },
        columns: [
          {
            title: "#",
            field: "#",
            dataCell: (row, index) => {
              return index;
            }
          },
          {
            title: "Name",
            field: "name",
            styleCell: (row, index) => {
              return index % 2 == 0 ? '' : '';
            }
          },
          {
            title: "Email",
            field: "email"
          },
          {
            title: "Phone",
            field: "phone"
          },
          {
            title: "Name",
            field: "name",
            styleCell: (row, index) => {
              return index % 2 == 0 ? '' : '';
            }
          },
          {
            title: "Email",
            field: "email"
          },
          {
            title: "Phone",
            field: "phone"
          },
          {
            title: "Name",
            field: "name",
            styleCell: (row, index) => {
              return index % 2 == 0 ? '' : '';
            }
          },
          {
            title: "Email",
            field: "email"
          },
          {
            title: "Phone",
            field: "phone"
          }
        ],
      },
      source: [
        {
          name: "Nguyễn văn Hậu",
          phone: "0344638697",
          email: "hau@gmail.com"
        },
        {
          name: "Nguyễn văn Hậu1",
          phone: "03446386971",
          email: "hau@gmail.com1"
        },
        {
          name: "Nguyễn văn Hậu2",
          phone: "03446386972",
          email: "hau@gmail.com2"
        },
        {
          name: "Nguyễn văn Hậu3",
          phone: "03446386973",
          email: "hau@gmail.com3"
        },
        {
          name: "Nguyễn văn Hậu",
          phone: "0344638697",
          email: "hau@gmail.com"
        },
        {
          name: "Nguyễn văn Hậu1",
          phone: "03446386971",
          email: "hau@gmail.com1"
        },
        {
          name: "Nguyễn văn Hậu2",
          phone: "03446386972",
          email: "hau@gmail.com2"
        },
        {
          name: "Nguyễn văn Hậu3",
          phone: "03446386973",
          email: "hau@gmail.com3"
        },
        {
          name: "Nguyễn văn Hậu",
          phone: "0344638697",
          email: "hau@gmail.com"
        },
        {
          name: "Nguyễn văn Hậu1",
          phone: "03446386971",
          email: "hau@gmail.com1"
        },
        {
          name: "Nguyễn văn Hậu2",
          phone: "03446386972",
          email: "hau@gmail.com2"
        },
        {
          name: "Nguyễn văn Hậu3",
          phone: "03446386973",
          email: "hau@gmail.com3"
        },
        {
          name: "Nguyễn văn Hậu",
          phone: "0344638697",
          email: "hau@gmail.com"
        },
        {
          name: "Nguyễn văn Hậu1",
          phone: "03446386971",
          email: "hau@gmail.com1"
        },
        {
          name: "Nguyễn văn Hậu2",
          phone: "03446386972",
          email: "hau@gmail.com2"
        },
        {
          name: "Nguyễn văn Hậu3",
          phone: "03446386973",
          email: "hau@gmail.com3"
        },
        {
          name: "Nguyễn văn Hậu",
          phone: "0344638697",
          email: "hau@gmail.com"
        },
        {
          name: "Nguyễn văn Hậu1",
          phone: "03446386971",
          email: "hau@gmail.com1"
        },
        {
          name: "Nguyễn văn Hậu2",
          phone: "03446386972",
          email: "hau@gmail.com2"
        },
        {
          name: "Nguyễn văn Hậu3",
          phone: "03446386973",
          email: "hau@gmail.com3"
        },
        {
          name: "Nguyễn văn Hậu",
          phone: "0344638697",
          email: "hau@gmail.com"
        },
        {
          name: "Nguyễn văn Hậu1",
          phone: "03446386971",
          email: "hau@gmail.com1"
        },
        {
          name: "Nguyễn văn Hậu2",
          phone: "03446386972",
          email: "hau@gmail.com2"
        },
        {
          name: "Nguyễn văn Hậu3",
          phone: "03446386973",
          email: "hau@gmail.com3"
        }
      ]
    };
  },
  setup() {

  },
}
</script>