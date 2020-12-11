<template>
  <div class="User">
    <v-row justify="end">
      <v-col sm="3">
        <v-row justify="end" >
          <v-col sm="2" ><v-icon>fas fa-user il</v-icon></v-col>
          <v-col sm="3" >
            <p>{{ userLoginn }}</p>
          </v-col>
          <router-link to="/" title="Đăng xuất">
            <v-col sm="2">
              <v-icon @click="clearLocalStorage">fas fa-sign-out-alt</v-icon>
            </v-col>
          </router-link>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col sm="6"  class="font-weight-bold text-center">
         <h3>DANH SÁCH NGƯỜI DÙNG</h3>
      </v-col>
    </v-row>
    <v-row justify="start">
      <v-col sm='3' class="text-left font-weight-bolt">Tìm kiếm theo tên</v-col>
    </v-row>
    <v-row justify="space-between">
      <v-col sm='4'><v-text-field
          append-icon="mdi-magnify "
          outlined
          v-model="inforUserSearch"
          @change="userSearch"
          type="text"
          placeholder="Search"
        ></v-text-field>
      </v-col>
      <v-col sm='3' class="text-right">
        <v-btn depressed color="primary" @click="activeAddUser"
            >Thêm người dùng</v-btn
          >
      </v-col>
    </v-row>
    <v-simple-table class="table">
      <thead>
        <tr class="InfoTable1">
          <v-row class="InfoTable1">
            <v-col sm="1" class="board-column text-center">STT</v-col>
            <v-col sm="3" class="board-column">Username</v-col>
            <v-col sm="3" class="board-column">Name</v-col>
            <v-col sm="1" class="board-column">Age</v-col>
            <v-col sm="2" class="board-column">Avatar</v-col>
            <v-col sm="2" class="Action">Action</v-col>
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
          <v-col sm="1" class="board-column text-center">{{ index + 1 }}</v-col>
          <v-col sm="3" class="board-column">{{ value.userName }}</v-col>
          <v-col sm="3" class="board-column">{{ value.name }}</v-col>
          <v-col sm="1" class="board-column">{{ value.age }}</v-col>
          <v-col sm="2" class="board-column">{{ value.avatar }}</v-col>
          <v-col sm="2" class="Action">
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

    <v-row justify="end">
      <v-col sm='4'>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="4"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          ></v-pagination>
        </div>  
      </v-col>
    </v-row>
    
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

    <DeleteUser v-if="isActiveDeleteUser"></DeleteUser>
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
      isActiveDeleteUser: true,
      isActiveEditUser: false,
      userDetail: {
        name: "",
        userName: "",
        age: "",
        avatar: "",
      },
      page:1
    };
  },
  components: {
    AddAndEditUser,DeleteUser,
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
  border: blue solid 1px;
  background-color: rgb(226, 226, 226);
  cursor: pointer;
  height: 30px;
}

.board-page :hover {
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
</style>