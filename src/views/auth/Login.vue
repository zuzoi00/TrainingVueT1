<template>
  <div>
    <v-form action="" id="formSubmit" @submit.prevent="userLogin">
        <div class="user-login text-center">
          <div class="text-center Title" style="margin: 40px 0">
            Welcome to our home
          </div>
          <v-row class="user-infor text-center">
            <v-col sm='3' class="user-input text-center">Username</v-col>
            <v-col sm='8'>
              <v-text-field
              v-model="account.username"
              type="text"
              solo
              class="form-control"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="user-infor text-center">
            <v-col sm='3' class="user-input text-center">Password</v-col>
            <v-col sm='8'>
              <v-text-field
              v-model="account.password"
              type="password"
              solo
              class="form-control"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-btn :disabled="status" rounded depressed dark @click="userLogin">
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
    </v-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      account: {
        username: null,
        password: null,
      },
      submitStatuss: false,
      status: true,
    };
  },
  mounted() {
    this.conditionClickButton();
  },
  methods: {
    conditionClickButton() {
        if (this.account.username != "" && this.account.password != "") {
          this.status= false;
        } else {
          this.status= true;
        }
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
  margin: 40px auto;
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
  margin-bottom: 10px;
  height: 80px;
}

.title-box {
  color: #dacb46;
  text-shadow: 1px 1px 1px #1a1a1a;
  display: inline-block;
  text-transform: uppercase;
}
</style>

