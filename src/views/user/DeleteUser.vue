<template>
  <div class="delete-user">
    <h3>Bạn có chắc chắn muốn xoá <strong >{{this.$parent.deleteItem.name}} </strong>? </h3>
    <div class="action-delete-user">
      <a @click="deleteUser" v-if="loadingOk">OK</a>
      <div class="spinner-border text-light" role="status" v-if="isLoading"></div>
      <a class="user-cancel" @click="cancelDeleteUser">Cancel</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "delete-user",
  data() {
    return {
      isLoading: false,
      loadingOk: true
    }
  },
  methods: {
    deleteUser() {
      this.loadingOk = false;
      this.isLoading = true;
      axios
        .delete(
          "https://5fb795a58e07f000166430c3.mockapi.io/api/user/" +
            this.$parent.deleteItem.ID
        )
        .then(() => {
          this.isLoading = false;
          this.loadingOk = true;
          this.$parent.loadUsers();
          this.$parent.cancelDelete();
        });
    },
    cancelDeleteUser() {
      this.$parent.cancelDelete();
    },
  },
};
</script>

<style scoped>
.delete-user {
  background-color: rgba(52, 152, 219, 1);
  padding: 20px;
  border-radius: 5px;
}
.delete-user h3 {
  margin: 15px auto;
  color: #fff;
  font-size: 18px;
  font-weight: 550;
}

.delete-user a {
  cursor: pointer;
}

.action-delete-user {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
}

.action-delete-user a {
  width: 80px;
  border: 1px solid #ccc;
  color: #000;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: 500;
  background-color: white;
}

.action-delete-user a:hover,
.action-delete-user a:active {
  background-color: rgb(226, 226, 226);
}

.delete-user strong {
  color: black
}

.user-cancel {
  margin: 15px 10px 15px 45px;
}
</style>
