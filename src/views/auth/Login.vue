<template>
  <div>
    <form action="" id="formSubmit" @submit.prevent="userLogin">
      <div class="user-login text-center">
      <div class="text-center Title" style="margin: 40px 0">Welcome to our home </div>
      <div class="user-infor text-center">
        <div class="user-input text-center">Username</div>
        <input
          v-model="account.username"
          type="text"
          class="form-control"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div class="user-infor text-center">
        <div class="user-input text-center">Password</div>
        <input
          v-model="account.password"
          type="password"
          class="form-control"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <input
        class="btn btn-primary"
        type="submit"
        value="Login"
      >
      <div v-if="submitStatuss" style="margin-top: 20px">
        Sai mật khẩu hoặc tên đăng nhập
      </div>
    </div>
    </form>
    
  </div>
</template>

<script>

import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      account: {
        username: null,
        password: null,
      },
      submitStatuss: false,
      hihi:null
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(8),
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(10),
    },
  },
  methods: {
    userLogin() {
      if (
        this.account.username == "Hiweb" &&
        this.account.password == "123456"
      ) {
        this.$router.push("/User");
        localStorage.setItem("UserName", this.account.username);
        localStorage.setItem("Password", this.account.password);
        // this.$parent.userLoginn = localStorage.setItem("UserName");
        // this.$store.commit("saveInformation",this.account.username);
      } else {
        this.submitStatuss = true;
      }
    },

  },
};
</script>

<style scoped>
.user-login {
  background-color: rgba(78, 206, 241, 0.7);
  height: 500px;
  width: 50%;
  font-size: 20px;
  font-weight: 600;
  margin: 40px auto 40px;
}

.user-login .Title {
  margin-bottom: 60px;
  padding-top: 50px;
}

.user-login .user-input {
  display: inline-block;
  width: 120px;
}

.user-login .form-control{
  display: inline-block;
  width: 400px;
}

.user-login .user-infor {
  margin-bottom: 50px;
}

.btn {
  width: 140px;
  border-color: white;
  font-weight: 600;
  cursor: pointer;
}
</style>

