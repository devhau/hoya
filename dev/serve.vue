<script lang="ts">
import { formatDate } from "@/utils/date.util";
import { defineComponent, h } from "vue";

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      menu: {
        app: {
          logo: {
            app: "VDemo",
            mini: "VDM",
          },
          version: {
            app: "Version 1.0.2",
            mini: "1.0.2",
          },
        },
        sidebar: [
          {
            className: "",
            icon: () => "bi bi-box",
            title: () => `Dashboard(${formatDate(new Date())})`,
            router: {
              name: "Home",
            },
          },
          {
            className: "",
            icon: "bi bi-box",
            title: "FileManager",
            router: {
              name: "FileManager",
            },
          },
          {
            className: "",
            icon: "bi bi-box",
            title: "Gantt",
            router: {
              name: "Gantt",
            },
          },
          {
            className: "vh-user",
            icon: "bi bi-box",
            title: "Accordion",
            router: {
              name: "Accordion",
            },
          },
          {
            title: "Demo2",
            sub: [
              {
                className: "",
                icon: "bi bi-box",
                title: "Alert",
                sub: [
                  {
                    className: "",
                    icon: "bi bi-box",
                    title: "Alert",
                    show: false,
                    router: {
                      name: "Alert",
                    },
                  },
                ],
              },
              {
                className: "",
                icon: "bi bi-box",
                title: "Form",
                show: () => false,
                router: {
                  name: "Form",
                },
              },
            ],
          },
          {
            icon: "bi bi-box",
            title: "Demo",
            sub: [
              {
                className: "",
                icon: "bi bi-box",
                title: "Alert",
                router: {
                  name: "Alert",
                },
              },
              {
                className: "",
                icon: "bi bi-box",
                title: "Form",
                router: {
                  name: "Form",
                },
              },
              {
                className: "",
                icon: "bi bi-box",
                title: "Table",
                router: {
                  name: "Table",
                },
              },
              {
                className: "",
                icon: "bi bi-box",
                title: "Alert",
                router: {
                  name: "Alert",
                },
              },
              {
                className: "",
                icon: "bi bi-box",
                title: "Form",
                router: {
                  name: "Form",
                },
              },
              {
                className: "",
                icon: "bi bi-box",
                title: "Table",
                router: {
                  name: "Table",
                },
              },
            ],
          },
        ],
        header: {
          left: [
            {
              className: "",
              icon: "bi bi-box",
              title: "Home",
              link: "https://www.hau.xyz",
              sub: [],
            },
            {
              className: "",
              icon: "bi bi-box",
              title: "Report",
              link: "",
              sub: [
                {
                  className: "",
                  icon: "bi bi-box",
                  title: "Report 1",
                  link: "",
                },
                {
                  className: "",
                  icon: "bi bi-box",
                  title: "Report 2",
                  link: "",
                },
              ],
            },
            {
              className: "",
              icon: "bi bi-box",
              title: "Order",
              link: "",
              sub: [],
            },
            {
              className: "",
              icon: "bi bi-box",
              title: "Github",
              link: "https://github.com/devhau/vue-ui-demo",
              sub: [],
            },
          ],
          right: [
            {
              className: "",
              icon: "bi bi-box",
              title: "Inbox",
              link: "",
              sub: [],
            },
            {
              className: "vh-profile",
              icon: "bi bi-box",
              title: "Profile",
              link: "",
              sub: () => {
                return h("h1", {}, "Hello");
              },
            },
          ],
        },
        footer: [
          {
            className: "",
            icon: "bi bi-box",
            title: "Information",
            link: "",
            sub: [],
          },
          {
            className: "",
            icon: "bi bi-box",
            title: "Information",
            link: "",
            sub: [],
          },
        ],
      },
    };
  },
});
</script>

<template>
  <div id="app">
    <vh-application :menu="menu" :miniSidebar="false">
      <router-view></router-view>
    </vh-application>
  </div>
</template>
<style lang="scss">
.vh-profile .vh-menu-sub {
  width: 300px;
  background: #ccc;
  margin-left: none;
  margin-right: 0px;
}
</style>
