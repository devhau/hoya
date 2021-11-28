<template>
  <div class="p-2">
    <vh-file-manager :option="option" />
  </div>
</template>
<script>
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/file-manager/";
export default {
  setup() {},
  data() {
    return {
      option: {
        api: {
          getInfo: (_path, _disk) => {
            return axios.post("getInfo", { path: _path });
          },
          makeDirectory: (_path, _folder, _disk) => {
            return axios.post("makeDirectory", {
              path: _path,
              folder: _folder,
            });
          },
          renameDirectory: (_path, _folder, _disk) => {
            return axios.post("renameDirectory", {
              path: _path,
              folder: _folder,
            });
          },
        },
      },
    };
  },
};
</script>
