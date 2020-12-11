<template>
  <div>
    <!-- v-model="$parent.isActiveDeleteUser" phải có cái này thì mới hiển thị -->
    <v-dialog
    v-model="$parent.isActiveDeleteUser"
    max-width="390"
  >
    <v-card class="delete-user">
      <v-card-text class="notification-user">
        <p>Bạn có chắc chắn muốn xoá <strong>{{this.$parent.deleteItem.name}}</strong> ?</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="cancelDeleteUser"
        >
          Disagree
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="deleteUser"
        >
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
  
</template>

<script>
import axios from "axios";
export default {
  name: "delete-user",
  data() {
    return {
      isLoading: false,
      loadingOk: true,

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

.notification-user {
  margin: 20px 0 0 0 ;
}

.delete-user {
  background-color: white;
  padding-top: 30px;
  box-shadow: none;
  height: 200px;
}


.user-cancel {
  margin: 15px 10px 15px 45px;
}
</style>
