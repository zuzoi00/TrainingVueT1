<template>
  <div>
    <div class="add-more">
      <div class="text-center title"><slot name="title"></slot></div>
      <div class="add-user row">
        <div class="add-user-infor text-left col-sm-2 il">Username</div>
        <input
          v-model="userInput.Username"
          type="text"
          class="form-control col-sm-6 il"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div class="add-user row">
        <div class="add-user-infor col-sm-2 il">Name</div>
        <input
          v-model="userInput.Name"
          type="type"
          class="form-control col-sm-6 il"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div class="add-user row">
        <div class="add-user-infor col-sm-2 il">Age</div>
        <input
          v-model="userInput.Age"
          type="number"
          class="form-control col-sm-6 il"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div class="add-user row" style="padding-left: -370px">
        <div class="add-user-infor col-sm-2 il">Avatar</div>
        <i class="fas fa-download col-sm-6 il"></i>
      </div>
      <div class="text-center">
        <slot name="button"></slot>
        <button
          slot="button"
          type="button"
          class="user-chose btn btn-light"
          @click="saveAndEditUser"
        >
          Save
        </button>
        <button type="button" class="user-chose btn btn-light" @click="cancel">
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
      userInput: {},
    };
  },
  methods: {
    cancel() {
      this.$parent.cancelAddUser();
      this.$parent.cancelEdit();
    },
    saveAndEditUser() {
      if (this.$parent.isActiveAddUser === true) {
        if (
          this.userInput.Username !== "" &&
          this.userInput.Name != "" &&
          this.userInput.Age > 0
        ) {
          axios
            .post(
              "https://5fb795a58e07f000166430c3.mockapi.io/api/user",
              this.userInput
            )
            .then(() => {
              this.$parent.loadUsers();
              this.$parent.cancelAddUser();
            });
        }
      } else {
        if (
          this.editUser.Username != "" &&
          this.editUser.Name != "" &&
          this.editUser.Age > 0
        ) {
          axios
            .put(
              "https://5fb795a58e07f000166430c3.mockapi.io/api/user/" +
                this.editItem.ID,
              this.editUser
            )
            .then(() => {
              this.$parent.loadUsers();
              this.$parent.cancelEdit();
            });
        }
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
</style>

