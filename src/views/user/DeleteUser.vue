<template>
  <div>
    <!-- v-model="$parent.isActiveDeleteUser" phải có cái này thì mới hiển thị -->
    <v-dialog
    class="delete"
    v-model="$parent.isActiveDeleteUser"
    max-width="390"
  >
    <v-card class="delete-user">
      <v-card-text class="notification-user">
        <p style="font-size:16px">Bạn có chắc chắn muốn xoá <strong>{{this.$parent.deleteItem.name}}</strong> ?</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="card"
          color="white"
          depressed
          text
          @click="deleteUser"
          v-if="isDisplayBtnSave"
        >
          Có
        </v-btn>
        <v-progress-circular  
            style="margin: 0 20px"
            depressed
            v-if="isLoadingSave"
            :size="30"
            color="white"
            indeterminate
        ></v-progress-circular>
          <v-btn
          class="card"
          color="white "
          text
          @click="cancelDeleteUser"
        >
          Không 
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
      isLoadingSave: false,
      isDisplayBtnSave: true,
    }
  },
  methods: {
    deleteUser() {
      this.isDisplayBtnSave = false;
      this.isLoadingSave = true;
      axios
        .delete(
          "https://5fb795a58e07f000166430c3.mockapi.io/api/user/" +
            this.$parent.deleteItem.ID
        )
        .then(() => {
          this.$parent.loadUsers();
          this.$parent.cancelDelete();
          this.$parent.snackbarSuccessNotification = true;
          this.$parent.successNotification = this.$parent.deleteSuccessNotification;
          this.cancelSuccessAlert();
        });
    },
    cancelDeleteUser() {
      this.$parent.cancelDelete();
    },
    cancelSuccessAlert(){
      setTimeout(() => {
				this.$parent.snackbarSuccessNotification = false;
			}, 2000);
    }
  },
};
</script>

<style scoped>

.notification-user {
  margin: 20px 0 0 0 ;
}

.delete-user {
  padding-top: 30px;
  box-shadow: none;
  height: 200px;
  border: 10px solid #1976d2 !important;
  background-color: green !important;
}

.card {
  background-color: #1976d2;
  width: 60px;
  text-align: center;
}

.user-cancel {
  margin: 15px 10px 15px 45px;
}
</style>
