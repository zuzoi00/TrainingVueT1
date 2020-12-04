<template>
  <div>
    <div id="add-user" class="add-more">
      <div class="text-center title"><slot name="title"></slot></div>
      <div class="add-user row">
        <div class="add-user-infor text-left col-sm-2 il">Username</div>
        <input
          type="text"
          class="form-control col-sm-6 il"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="$parent.userDetail.userName"
        />
      </div>
      <div class="add-user row">
        <div class="add-user-infor col-sm-2 il">Name</div>
        <input
          type="type"
          class="form-control col-sm-6 il"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="$parent.userDetail.name"
        />
      </div>
      <div class="add-user row">
        <div class="add-user-infor col-sm-2 il">Age</div>
        <input
          type="number"
          class="form-control col-sm-6 il"
          aria-label="Age"
          aria-describedby="basic-addon1"
          v-model="$parent.userDetail.age"
        />
      </div>
      <div class="add-user row" style="padding-left: -370px">
        <div class="add-user-infor col-sm-2 il">Avatar</div>
        <input
          type="text"
          class="form-control col-sm-6 il"
          aria-label="Age"
          aria-describedby="basic-addon1"
          v-model="$parent.userDetail.avatar"
        />
        <!-- <i class="fas fa-download col-sm-6 il"></i> -->
      </div>
      <div class="text-center">
        <slot name="button"></slot>
        <button
          id="saveButton"
          slot="button"
          type="button"
          class="user-chose btn btn-light"
          @click="saveAndEditUser"
          disabled="disabled"
          v-if="loadingSave"
          style="width:120px"
        >
          Save
        </button>
        <div class="spinner-border text-light" role="status" v-if="isLoading"></div>
        <button type="button" class="user-chose btn btn-light user-cancel" style="width:120px" @click="cancel">
          Cancel
        </button>
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
      loadingSave: true
    };
  },
  mounted() {
    this.conditionClickButton();
  },
  methods: {
    conditionClickButton(){
      var vm = this;
      var clickButton = document.getElementById("add-user");
      var buttonIsClicked = document.getElementById("saveButton");
      clickButton.addEventListener("input",() => {
        if (
          vm.$parent.userDetail.userName !== "" &&
          vm.$parent.userDetail.name != "" &&
          vm.$parent.userDetail.age > 0
        ) {
          buttonIsClicked.removeAttribute("disabled")
          }
        else {
          buttonIsClicked.setAttribute("disabled","disabled")
        }
      })
    },
    cancel() {
      this.$parent.cancelAddUser();
      this.$parent.cancelEdit();
    },
    saveAndEditUser() {
      var self = this;
      this.loadingSave = false
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

.add-more input {
  display: inline-block;
  width: 400px;
}

.add-more .add-user {
  margin: 0 0 40px 0;
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
  font-weight: 500;
  display: inline-block;
}

.user-cancel {
  margin-left: 60px;
}
</style>

