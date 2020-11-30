<template>
  <div class="User">
    <div class="ListName il mb-3">DANH SÁCH NGƯỜI DÙNG</div>
    <div class="Footer il text-right" >
      <i class="fas fa-user il" style="padding-right:10px"></i>
      <div class="il">{{this.$store.getters.getUserInformation}}</div>
    </div>

    <div class="Search mb-5">
      <div class="mb-3" style="font-weight:600" >Tìm kiếm theo tên</div>
      <div class="SearchInput" >
        <input
          v-model="inforUserSearch"
          @change="userSearch"
          type="text"
          class="form-control"
          aria-label="Username"
          aria-describedby="basic-addon1"
          placeholder="Search"
        />
          <div class="btn-group text-center fr " role="group" aria-label="Third group">
            <button type="button" class="btn btn-primary" @click="activeAddUser">Thêm người dùng</button>
          </div>
      </div>
    </div>

    <table>
      <thead>
        <tr class="InfoTable1 row">
          <div class="board-column col-sm-1 text-center">STT</div>
          <div class="board-column col-sm-3">Username</div>
          <div class="board-column col-sm-3">Name</div>
          <div class="board-column col-sm-1">Age</div>
          <div class="board-column col-sm-2"> Avatar</div>
          <div class=" Action col-sm-2">Action</div>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, index) in data" :key="index" :class="setBackGround(index)" class="InfoTable2 row">
          <td class="board-column col-sm-1 text-center">{{index + 1}}</td>
          <td class="board-column col-sm-3">{{value.Username}}</td>
          <td class="board-column col-sm-3">{{value.Name}}</td>
          <td class="board-column col-sm-1">{{value.Age}}</td>
          <td class="board-column col-sm-2">{{value.Avatar}}</td>
          <td class=" Action col-sm-2">
            <a class="action-edit" @click="clickEdit(index)"><i class="fas fa-tools"></i></a>
            <a class="action-delete" @click="clickDelete(index)"><i class="fas fa-trash-alt" ></i></a>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="board-page">
      <a class=" text-center active">1</a>
      <a class=" text-center">2</a>
      <a class=" text-center">3</a>
    </div>

    <div class="add--user" v-if="isActiveAddUser">
      <AddUser>
        <div slot="title">Add User</div>      
      </AddUser>
    </div>

    <div class="add--user" v-if="isActiveEditUser">
      <AddUser>
        <div slot="title">Edit User</div>      
      </AddUser>
    </div>

    <div class="delete--user" v-if="isActiveDeleteUser">
      <DeleteUser></DeleteUser>
    </div>
    
  </div>
</template>


<script>
import axios from "axios"
import AddUser from "../../components/AddUser.vue"
import DeleteUser from "./DeleteUser.vue"

export default {
  data() {
    return {
      data: [],
      inforUserSearch:"",
      deleteItem : null,
      editItem: null,
      isActiveAddUser: false,
      isActiveDeleteUser: false,
      isActiveEditUser: false,
    };
  },
  components: {
    AddUser,DeleteUser,
  },
  created() {
    this.loadUsers()
  },
  methods: {
    loadUsers() {
      axios
      .get("https://5fb795a58e07f000166430c3.mockapi.io/api/user")
      .then((response) => {
        this.data = response.data;
      });
    },
    userSearch() {
      this.data = this.data.filter((searchInfo) => {
        return searchInfo.Name.search(this.inforUserSearch) > -1;
      })
    },
    setBackGround(userIndex) {
      if(userIndex % 2 == 0){
        return "board-column-background"
      }
    },
    activeAddUser() {
      this.isActiveAddUser = true;
    },
    cancelAddUser(){
      this.isActiveAddUser = false;
    },
    clickDelete(index){
      this.deleteItem = this.data[index];
      this.isActiveDeleteUser = true;
    },
    cancelDelete(){
      this.isActiveDeleteUser = false;
    },
    clickEdit(index){
      this.editItem = this.data[index];
      this.isActiveEditUser = true;
    },
    cancelEdit(){
      this.isActiveEditUser = false;
    }
  }
};
</script>

<style scoped>
.il {
 display: inline-block;
}

.fr {
  float:right
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
.Search input {
  display: inline-block;
  width: 250px;
  border: 1px solid #007bff;
}

.Search .btn-group {
  display: inline-block;
  width: 200px;
}

table {
  width: 100%;
  border: 1px solid black;
}

table a {
  font-size: 20px;
  margin: 0 10px;
}

table .action-edit {
  cursor: pointer;
  color: green;
}

table .action-delete {
  cursor: pointer;
  color: red;
}

table .action-edit:hover, table .action-delete:hover  {
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
  background-color: #007bff47;;
}

.board-page {
  display: flex;
  justify-content: flex-end;
  margin: 15px 0 
}

.board-page a {
  width: 60px;
  margin: 5px 3px;
  height: 30px;
  line-height: 30px;
  border:  blue solid 1px;
  background-color: rgb(226, 226, 226);
  cursor: pointer;

}

.board-page a:hover {
  background-color: #007bffa3

}

.add--user {
  position: absolute;
  width: 50%;
  top:15px;
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
  top:15px;
  left: 350px;
  background-color: #41ce41;
  z-index: 3;
}

</style>