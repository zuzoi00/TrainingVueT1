<template>
  <div>
    <div id="add-user" class="add-more">
      <v-row justify="end">
        <v-col sm='1' class="close-form" @click="closeForm" ><v-icon>fas fa-times-circle</v-icon></v-col>
      </v-row>
      <div class="text-center title"><slot name="title"></slot></div>
      <v-row class="row-table">
        <v-col sm='3' offset-sm="1" class="text-left">Username</v-col>
        <v-col sm='7'><v-text-field
          type="text"
          outlined
          :rules='rules'
          v-model="$parent.userDetail.userName"
        >
        </v-text-field></v-col>
      </v-row>
      <v-row  class="row-table">
        <v-col sm='3' offset-sm="1" class="text-left">Name</v-col>
        <v-col sm='7'><v-text-field
          type="text"
          outlined
          :rules='rules'
          color="blue darken-2"
          v-model="$parent.userDetail.name"
        >
        </v-text-field></v-col>
      </v-row>
      <v-row  class="row-table">
        <v-col sm='3' offset-sm="1" class="text-left">Age</v-col>
        <v-col sm='7'><v-text-field
          type="number"
          :rules='rulesAge'
          outlined
          color="white"
          v-model="$parent.userDetail.age"
        >
        </v-text-field></v-col>
      </v-row>
      <v-row class="row-table">
        <v-col sm='3' offset-sm="1" class="text-left">Avatar</v-col>
        <v-col sm='7'><v-text-field
          type="text"
          outlined
          v-model="$parent.userDetail.avatar"
        >
        </v-text-field></v-col>
      </v-row>
      <v-row justify="center" class="mt-7">
        <v-col class="text-center " sm='3'>
          <v-btn
            class="butt"
            depressed
            width="120px"
            color="primary"
            v-if="isDisplayBtnSave"
            :disabled="isDisabledBtnSave"
            @click="saveAndEditUser"
          >save</v-btn
          >
          <v-progress-circular
            v-if="isLoadingSave"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-col>
        <v-col sm='1'></v-col>
        <v-col class="text-left " sm='3'>
          <v-btn
          class="butt"
          width="120px"
          depressed
          color="primary"
          @click="cancel"
          >cancel</v-btn
        >
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isLoadingSave: false,
      isDisplayBtnSave: true,
      rules: [
        value => !!value  || 'Bạn cần nhập thông tin',
        value => (value && value.length >= 3) || 'Nhập ít nhất 3 kí tự',
      ],
      rulesAge: [
        value => value > 0 || "Số tuổi phải lớn hơn 0"
      ]
    };
  },
  computed: {
    isDisabledBtnSave(){
      return this.$parent.userDetail.age > 0 && this.$parent.userDetail.name.length >= 3 && this.$parent.userDetail.userName.length >= 3 ? false : true
    }
  },
  methods: {
    cancel() {
      this.$parent.cancelAddUser();
      this.$parent.cancelEdit();
    },
    saveAndEditUser() {
      var self = this;
      this.isDisplayBtnSave = false;
      this.isLoadingSave = true;
      if (self.$parent.isActiveAddUser === true) {
        axios
          .post(
            "https://5fb795a58e07f000166430c3.mockapi.io/api/user",
            self.$parent.userDetail
          )
          .then(() => {
            this.$parent.loadUsers();
            this.$parent.cancelAddUser();
            this.$parent.snackbarSuccessNotification = true;
            this.$parent.successNotification = this.$parent.addSuccessNotification
            this.cancelSuccessAlert();
          });
          
      } else {
        axios
          .put(
            "https://5fb795a58e07f000166430c3.mockapi.io/api/user/" +
              self.$parent.userDetail.ID,
            self.$parent.userDetail
          )
          .then(() => {
            this.$parent.loadUsers();
            this.$parent.cancelEdit();
            this.$parent.snackbarSuccessNotification = true;
            this.$parent.successNotification = this.$parent.editSuccessNotification
            this.cancelSuccessAlert();
          });
      }
    },
    cancelSuccessAlert(){
      setTimeout(() => {
				this.$parent.snackbarSuccessNotification = false;
			}, 2000);
    },
    closeForm(){
      this.$parent.cancelAddUser();
      this.$parent.cancelEdit();
    }
  },
};
</script>

<style scoped>

.add-more {
  font-size: 20px;
  font-weight: 600;
  margin: 10px 35px;
  height: 570px;
}

.add-more .title {
  margin-bottom: 50px;
}

.close-form {
  cursor: pointer;
}
.row-table {
  height: 80px;
}

.butt {
  border: 2px solid white
}
.user-chose {
  font-weight: 600;
  display: inline-block;
}

.user-cancel {
  margin-left: 60px;
}
</style>

