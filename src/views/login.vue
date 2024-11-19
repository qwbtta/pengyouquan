<template>
  <div class="login column">
    <img class="Login_name" src="@/assets/img/Login_name.png" alt="" />
    <div class="login_con">
      <div class="title">欢迎登录</div>
      <div class="subtitle">运营服务管理 以客户为中心</div>
      <div class="input_con" style="margin-top: 48px">
        <img src="@/assets/img/phone_icon.svg" alt="" />
        <input
          class="input"
          type="text"
          placeholder="请输入手机号"
          v-model="phoneNum"
        />
      </div>
      <div class="input_con" style="margin-top: 32px">
        <img src="@/assets/img/password.svg" alt="" />
        <input
          class="input"
          type="text"
          placeholder="请输入密码"
          v-model="password"
        />
      </div>
      <div class="forgot">忘记密码</div>
      <div class="login_button" @click="toLogin">登录</div>
    </div>
    <!-- <div @click="toLogout">退出登录</div> -->
  </div>
</template>
  
  <script  setup>
import { ref } from "vue";
import { login, logout } from "@/assets/js/request";
import { useRouter } from "vue-router";
const router = useRouter();
// let phoneNum = ref("15371006520");
// let password = ref("admin123");

let phoneNum = ref("");
let password = ref("");

async function toLogin() {
  let params = {
    username: phoneNum.value,
    password: password.value,
  };
  login(params).then(async (res) => {
    console.log(res);
    let token = res?.userInfo?.token;
    if (res.code == 200 && token) {
      await localStorage.setItem("token", token);
      router.push("/");
    }
  });
}
function toLogout() {
  logout().then((res) => {
    localStorage.removeItem("token");
  });
}
</script>
  
  <style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("@/assets/img/Login_back.png") no-repeat center / 100% 100%;
  justify-content: center;
  align-items: center;
  .Login_name {
    width: 512px;
    height: 97px;
  }
  .login_con {
    width: 544px;
    height: 558px;
    background: #ffffff;
    border-radius: 16px;
    margin-top: 48px;
    padding: 32px 40px;
    .title {
      height: 40px;
      font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
      font-weight: 700;
      font-size: 32px;
      color: #525c7f;
      line-height: 40px;
    }
    .subtitle {
      height: 20px;
      font-family: Source Han Sans, Source Han Sans;
      font-size: 20px;
      color: #4b81f7;
      line-height: 20px;
      margin-top: 8px;
    }
    .input_con {
      position: relative;
      > img {
        position: absolute;
        left: 24px;
        top: 28px;
        width: 24px;
        height: 24px;
      }
      .input {
        width: 464px;
        height: 80px;
        background: #f7f8fa;
        border-radius: 8px;
        padding-left: 72px;
        padding-right: 10px;
        font-family: Source Han Sans, Source Han Sans;
        font-size: 20px;
        color: #313131;
        &::placeholder {
          color: #757575;
        }
      }
    }
    .forgot {
      height: 20px;
      font-family: Source Han Sans, Source Han Sans;
      font-size: 18px;
      color: #666666;
      line-height: 20px;
      margin-top: 16px;
      visibility: visible;
      cursor: pointer;
    }
    .login_button {
      width: 464px;
      height: 80px;
      background: #4b81f7;
      border-radius: 57px;
      text-align: center;
      line-height: 80px;
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 500;
      font-size: 26px;
      color: #ffffff;
      margin-top: 62px;
      cursor: pointer;
    }
  }
}
</style>
  