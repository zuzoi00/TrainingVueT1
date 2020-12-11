<template>
  <div>
    <div id="add-user" class="add-more">
      <div class="text-center title"><slot name="title"></slot></div>
      <v-row class="row-table">
        <v-col sm='3' offset-sm="1" class="text-left">Username</v-col>
        <v-col sm='8'><v-text-field
          type="text"
          solo
          :rules='rules'
          v-model="$parent.userDetail.userName"
        >
        </v-text-field></v-col>
      </v-row>
      <v-row  class="row-table">
        <v-col sm='3' offset-sm="1" class="text-left">Name</v-col>
        <v-col sm='8'><v-text-field
          type="text"
          solo
          :rules='rules'
          v-model="$parent.userDetail.name"
        >
        </v-text-field></v-col>
      </v-row>
      <v-row  class="row-table">
        <v-col sm='3' offset-sm="1" class="text-left">Age</v-col>
        <v-col sm='8'><v-text-field
          type="number"
          solo
          v-model="$parent.userDetail.age"
        >
        </v-text-field></v-col>
      </v-row>
      <v-row class="row-table">
        <v-col sm='3' offset-sm="1" class="text-left">Avatar</v-col>
        <v-col sm='8'><v-text-field
          type="text"
          solo

          v-model="$parent.userDetail.avatar"
        >
        </v-text-field></v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="text-right" sm='3'>
          <v-btn
          depressed
          color="light"
          v-if="loadingSave"
          @click="saveAndEditUser"
          >save</v-btn
          >
          <div
          class="spinner-border text-light"
          role="status"
          v-if="isLoading"
        ></div>
        </v-col>
        <v-col sm='1'></v-col>
        <v-col class="text-left" sm='3'>
          <v-btn
          depressed
          color="light"
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
      isLoading: false,
      loadingSave: true,
      rules: [
        value => !!value || 'Bạn cần nhập thông tin',
        value => (value && value.length >= 3) || 'Nhập ít nhất 3 kí tự',
      ],
    };
  },
  mounted() {
    this.conditionClickButton();
  },
  methods: {
    conditionClickButton() {
      var vm = this;
      var clickButton = document.getElementById("add-user");
      var buttonIsClicked = document.getElementById("saveButton");
      clickButton.addEventListener("v-text-field", () => {
        if (
          vm.$parent.userDetail.userName !== "" &&
          vm.$parent.userDetail.name != "" &&
          vm.$parent.userDetail.age > 0
        ) {
          buttonIsClicked.removeAttribute("disabled");
        } else {
          buttonIsClicked.setAttribute("disabled", "disabled");
        }
      });
    },
    cancel() {
      this.$parent.cancelAddUser();
      this.$parent.cancelEdit();
    },
    saveAndEditUser() {
      var self = this;
      this.loadingSave = false;
      this.isLoading = true;
      if (self.$parent.isActiveAddUser === true) {
        axios
          .post(
            "https://5fb795a58e07f000166430c3.mockapi.io/api/user",
            self.$parent.userDetail
          )
          .then(() => {
            this.loadingSave = true;
            this.isLoading = false;
            this.$parent.loadUsers();
            this.$parent.cancelAddUser();
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
          });
      }
    },
  },
};
</script>

<style scoped>

.add-more {
  font-size: 20px;
  font-weight: 600;
  margin: 40px;
  height: 500px;
}

.add-more .title {
  margin-bottom: 50px;
}

.row-table {
  height: 80px;
}


button {
  margin: 0 20px;
  width: 100px;
}

.user-chose {
  font-weight: 600;
  display: inline-block;
}

.user-cancel {
  margin-left: 60px;
}
</style>

