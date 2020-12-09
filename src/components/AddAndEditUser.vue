<template>
  <div>
    <div id="add-user" class="add-more">
      <div class="text-center title"><slot name="title"></slot></div>
      <div class="add-user row">
        <div class="add-user-infor text-left col-sm-2 il">Username</div>
        <v-text-field
          type="text"
          class="col-sm-8 il"
          solo
          v-model="$parent.userDetail.userName"
        >
        </v-text-field>
      </div>
      <div class="add-user row">
        <div class="add-user-infor col-sm-2 il">Name</div>
        <v-text-field
          type="type"
          class="col-sm-8 il"
          solo
          v-model="$parent.userDetail.name"
        ></v-text-field>
      </div>
      <div class="add-user row">
        <div class="add-user-infor col-sm-2 il">Age</div>
        <v-text-field
          type="number"
          class="col-sm-8 il"
          solo
          v-model="$parent.userDetail.age"
        ></v-text-field>
      </div>
      <div class="add-user row" style="padding-left: -370px">
        <div class="add-user-infor col-sm-2 il">Avatar</div>
        <v-text-field
          type="text"
          class="col-sm-8 il"
          solo
          v-model="$parent.userDetail.avatar"
        ></v-text-field>
      </div>
      <div class="text-center">
        <v-btn
          depressed
          color="light"
          v-if="loadingSave"
          @click="saveAndEditUser"
          class="user-chose user-cancel"
          style="width: 120px"
          >save</v-btn
        >
        <div
          class="spinner-border text-light"
          role="status"
          v-if="isLoading"
        ></div>
        <v-btn
          depressed
          color="light"
          v-if="loadingSave"
          @click="cancel"
          class="user-chose user-cancel"
          style="width: 120px"
          >cancel</v-btn
        >
      </div>
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
.il {
  display: inline-block;
}
.add-more {
  font-size: 20px;
  font-weight: 600;
  margin: 40px;
}

.add-more .title {
  margin-bottom: 50px;
}

.add-more .add-user-infor {
  width: 120px;
  margin: 0 40px 0 20px;
}

.add-more v-text-field {
  display: inline-block;
  width: 400px;
}

.add-more .add-user {
  margin: 0 0 10px 0;
}

.add-more .add-user i {
  margin: auto 0;
  padding: 0;
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

