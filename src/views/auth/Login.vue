<template>
  <div>
    <v-form action="" id="formSubmit" @submit.prevent="userLogin">
      <v-app>
        <div class="user-login text-center">
          <div class="text-center Title" style="margin: 40px 0">
            Welcome to our home
          </div>
          <div class="user-infor text-center">
            <div class="user-input text-center">Username</div>
            <v-text-field
              v-model="account.username"
              type="text"
              solo
              class="form-control"
            >
            </v-text-field>
          </div>
          <div class="user-infor text-center">
            <div class="user-input text-center">Password</div>
            <v-text-field
              v-model="account.password"
              type="password"
              solo
              class="form-control"
            >
            </v-text-field>
          </div>
          <v-btn id="loginButton" rounded depressed dark @click="userLogin">
            Login
          </v-btn>
          <div
            class="text-center"
            v-if="submitStatuss"
            style="margin-top: 20px"
          >
            Sai mật khẩu hoặc tên đăng nhập
          </div>
        </div>
      </v-app>
    </v-form>
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
    };
  },
  mounted() {
    this.conditionClickButton();
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
    conditionClickButton() {
      var vm = this;
      var clickButton = document.getElementById("formSubmit");
      var buttonIsClicked = document.getElementById("loginButton");
      clickButton.addEventListener("input", () => {
        if (vm.account.username != "" && vm.account.password != "") {
          buttonIsClicked.removeAttribute("disabled");
        } else {
          buttonIsClicked.setAttribute("disabled", "disabled");
        }
      });
    },
    userLogin() {
      if (
        this.account.username == "Hiweb" &&
        this.account.password == "123456"
      ) {
        localStorage.setItem("user", this.account.username);
        localStorage.setItem("password", this.account.password);
        this.$router.push("/User");
        // this.$store.commit("saveInformation",this.account.username);
      } else {
        this.submitStatuss = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
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

.user-login .form-control {
  display: inline-block;
  width: 400px;
}

.user-login .user-infor {
  margin-bottom: 50px;
}

.title-box {
  color: #dacb46;
  text-shadow: 1px 1px 1px #1a1a1a;
  display: inline-block;
  text-transform: uppercase;
}
</style>

