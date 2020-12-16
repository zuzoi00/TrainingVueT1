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
              @input="$v.account.username.$touch()"
              :errorMessages="userNameError"
              v-model="account.username"
              placeholder="Hiweb"
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
              @input="$v.account.password.$touch()"
              :append-icon="showEye ? 'mdi-eye' : 'mdi-eye-off'"
              :errorMessages="passwordError"
              placeholder="123456"
              v-model="account.password"
              :type="showEye ? 'type' : 'password' "
              solo
              class="form-control"
              @click:append="showEye = !showEye"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-btn :disabled="loginStatus" rounded depressed dark @click="userLogin">
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
import { required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      account: {
        username: null,
        password: null,
      },
      // rules: [
      //   value => !!value  || 'Bạn cần nhập thông tin',
      //   value => (value && value.length >= 4) || 'Nhập ít nhất 4 kí tự',
      // ],
      showEye: true,
      submitStatuss: false,
      loginStatus: true,
    };
  },
  // hàm created có thể được sử dụng để thao tác với các dữ liệu trong data 
  // và các sự kiện mà các bạn thiết lập đã có thể được kích hoạt. Nhưng template và DOM ảo thì chưa
  created(){
    if( localStorage.getItem('user')){
      this.$router.push('/user');
    }
  },
  // Ở quá trình mounted chúng ta đã có đầy đủ quyền truy cập vào data, template, DOM
  // ,
  validations: {
    account: {
			username: { required},
			password: { required},
		},
  },
  mounted() {
    this.conditionClickButton();
  },
  computed: {
    userNameError() {
			let errors = [];
			if (!this.$v.account.username.$dirty) {
				return errors;
      }
      if (!this.$v.account.username.required) {
        errors.push("Phải nhập UserName!");
				return errors;
			}
      return errors;
		},
		passwordError() {
			let errors = [];
			if (!this.$v.account.password.$dirty) {
				return errors;
      }
      if (!this.$v.account.password.required) {
        errors.push("Phải nhập Password");
				return errors;
			}
			return errors;
		},
  }
  ,
  methods: {
    conditionClickButton() {
        if (this.account.username != "" && this.account.password != "") {
          this.loginStatus= false;
        } else {
          this.loginStatus= true;
        }
    },
    userLogin() {
      if (
        this.account.username == "Hiweb" &&
        this.account.password == "123456"
      ) {
        localStorage.setItem("user", this.account.username);
        localStorage.setItem("password", this.account.password);
        this.$router.push("/user");
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
