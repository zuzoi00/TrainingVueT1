<template>
  <div class="User">
    <div class="ListName il mb-3">DANH SÁCH NGƯỜI DÙNG</div>
    <div class="Footer il text-right">
      <div class="il user-name">
        <i class="fas fa-user il" style="padding-right: 10px"></i>
        <div class="il">
          <b>{{ userLoginn }}</b>
        </div>
      </div>
      <router-link to="/" title="Đăng xuất">
        <div class="il user-logout">
          <i class="fas fa-sign-out-alt" @click="clearLocalStorage"></i>
        </div>
      </router-link>
    </div>

    <div class="Search mb-5">
      <div class="mb-3" style="font-weight: 600">Tìm kiếm theo tên</div>
      <div class="SearchInput">
        <v-text-field
          append-icon="mdi-magnify"
          outlined
          v-model="inforUserSearch"
          @change="userSearch"
          type="text"
          placeholder="Search"
          class="il"
          style="width: 30%"
        ></v-text-field>
        <div
          class="btn-group text-center il fr"
          role="group"
        >
          <v-btn depressed color="primary" @click="activeAddUser"
            >Thêm người dùng</v-btn
          >
        </div>
      </div>
    </div>

    <v-simple-table class="table">
      <thead>
        <tr class="InfoTable1">
          <v-row  class="InfoTable1">
            <v-col sm='1' class="board-column  text-center">STT</v-col>
            <v-col sm='3' class="board-column ">Username</v-col>
            <v-col sm='3' class="board-column ">Name</v-col>
            <v-col sm='1' class="board-column ">Age</v-col>
            <v-col sm='2' class="board-column ">Avatar</v-col>
            <v-col sm='2' class="Action ">Action</v-col>
          </v-row>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(value, index) in data"
          :key="index"
          :class="setBackGround(index)"
          class="InfoTable2 row"
        >
          <v-col sm='1' class="board-column text-center">{{ index + 1 }}</v-col>
          <v-col sm='3' class="board-column">{{ value.userName }}</v-col>
          <v-col sm='3' class="board-column">{{ value.name }}</v-col>
          <v-col sm='1' class="board-column">{{ value.age }}</v-col>
          <v-col sm='2' class="board-column">{{ value.avatar }}</v-col>
          <v-col sm='2' class="Action">
            <a
              title="Sửa thông tin"
              class="action-edit"
              @click="clickEdit(index)"
              ><i class="fas fa-tools"></i
            ></a>
            <a
              title="Xóa thông tin"
              class="action-delete"
              @click="clickDelete(index)"
              ><i class="fas fa-trash-alt"></i
            ></a>
          </v-col>
        </tr>
      </tbody>
    </v-simple-table>

    <div class="board-page">
      <a class="text-center active">1</a>
      <a class="text-center">2</a>
      <a class="text-center">3</a>
    </div>

    <div class="add--user" v-if="isActiveAddUser">
      <AddAndEditUser>
        <div slot="title">Add User</div>
      </AddAndEditUser>
    </div>

    <div class="add--user" v-if="isActiveEditUser">
      <AddAndEditUser>
        <div slot="title">Edit User</div>
      </AddAndEditUser>
    </div>

    <div class="delete--user" v-if="isActiveDeleteUser">
      <DeleteUser></DeleteUser>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import AddAndEditUser from "../../components/AddAndEditUser.vue";
import DeleteUser from "./DeleteUser.vue";

export default {
  data() {
    return {
      data: [],
      userLoginn: "",
      inforUserSearch: "",
      deleteItem: null,
      isActiveAddUser: false,
      isActiveDeleteUser: false,
      isActiveEditUser: false,
      userDetail: {
        name: "",
        userName: "",
        age: "",
        avatar: "",
      },
    };
  },
  components: {
    AddAndEditUser,
    DeleteUser,
  },
  mounted() {
    this.loadUsers();
    this.userLoginn = localStorage.getItem("user");
  },
  methods: {
    loadUsers() {
      axios
        .get("https://5fb795a58e07f000166430c3.mockapi.io/api/user")
        .then((response) => {
          this.data = response.data;
        });
    },
    clearLocalStorage() {
      localStorage.clear();
    },
    userSearch() {
      this.data = this.data.filter((searchInfo) => {
        return searchInfo.userName.search(this.inforUserSearch) > -1;
      });
    },
    setBackGround(userIndex) {
      if (userIndex % 2 == 0) {
        return "board-column-background";
      }
    },
    activeAddUser() {
      this.userDetail = {
        name: "",
        userName: "",
        age: "",
        avatar: "Avatar",
      };
      this.isActiveAddUser = true;
    },
    cancelAddUser() {
      this.isActiveAddUser = false;
    },
    clickDelete(index) {
      this.deleteItem = this.data[index];
      this.isActiveDeleteUser = true;
    },
    cancelDelete() {
      this.isActiveDeleteUser = false;
    },
    clickEdit(index) {
      this.userDetail = this.data[index];
      this.isActiveEditUser = true;
    },
    cancelEdit() {
      this.isActiveEditUser = false;
    },
  },
};
</script>

<style scoped>
.il {
  display: inline-block;
}

.fr {
  float: right;
}
.User {
  position: relative;
  padding: 40px 50px;
  background-color: white;
}

.ListName {
  font-weight: 600;
  font-size: 21px;
  padding-left: 500px;
}

.Footer {
  width: 200px;
  float: right;
}

.Footer .user-name {
  width: 120px;
}

.Footer .user-logout {
  margin-left: 10px;
  cursor: pointer;
}

.Search input {
  display: inline-block;
  width: 250px;
  border: 1px solid #007bff;
}

.Search .btn-group {
  display: inline-block;
  width: 200px;
}

.table {
  width: 100%;
  border: 1px solid black;
}

table a {
  font-size: 20px;
  margin: 0 10px 0 0;
}

table .action-edit {
  cursor: pointer;
  color: green;
}

table .action-delete {
  cursor: pointer;
  color: red;
}

table .action-edit:hover,
table .action-delete:hover {
  color: #007bffa3;
}

table .InfoTable1 {
  margin: 0;
  background-color: #007bffa3;
}

table .InfoTable2 {
  margin: 0;
}
.board-column {
  border-right: 1px solid black;
}

.board-column-background {
  background-color: #007bff47;
}

.board-page {
  display: flex;
  justify-content: flex-end;
  margin: 15px 0;
}

.board-page a {
  width: 60px;
  margin: 5px 3px;
  height: 30px;
  line-height: 30px;
  border: blue solid 1px;
  background-color: rgb(226, 226, 226);
  cursor: pointer;
}

.board-page a:hover {
  background-color: #007bffa3;
}

.add--user {
  position: absolute;
  width: 50%;
  top: 15px;
  left: 350px;
  background-color: #3797ff;
  z-index: 3;
}

.delete--user {
  position: absolute;
  width: 50%;
  top: 40px;
  left: 360px;
  background-color: #89bbf1;
  z-index: 2;
}

.edit--user {
  position: absolute;
  width: 50%;
  top: 15px;
  left: 350px;
  background-color: #41ce41;
  z-index: 3;
}
</style>