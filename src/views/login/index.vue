<template>
  <div class="login">
    <!--    导航栏-->
    <van-nav-bar
        title="请先登录"
    />
    <!--    表单区域-->
    <van-form @submit="onSubmit">
      <van-field
          v-model="mobile"
          name="mobile"
          label="手机号"
          placeholder="请输入手机号"
          :rules="rules.mobile"
      />
      <van-field
          v-model="code"
          name="code"
          label="验证码"
          placeholder="请输入验证码"
          :rules="rules.code"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" :loading="loading" loading-text="加载中...">登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
//导入网络请求
import {loginAPI} from "@/api";
// 导入操作token的方法
import {setToken} from "@/utils/auth";

export default {
  data() {
    return {
      mobile: 13911111111,
      code: 246810,
      loading: false,
      rules: {
        //手机号的校验规则
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'onBlur'},
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的手机号',
            trigger: 'onBlur'
          }
        ],
        code: [{required: true, message: '请输入验证码', trigger: 'onBlur'},
          {pattern: /^\d{6}$/, message: '验证码长度为6', trigger: 'onBlur'}]
      }
    }
  },

  methods: {
    async onSubmit(data) {//data:{mobile:'',code:''}
      //设置按钮为加载状态
      this.loading = true;
      try {
        const res = await loginAPI(data)
        //保存返回的token(保存在两个地方localstorage & vuex)
        this.$store.commit('setToken',res.data.data)
        //提示登录成功
        this.$toast.success('登录成功');
        //得到路径中的参数:
        const url = this.$route.query.url
        if (url){
          //跳转到url对应的路径中
          this.$router.push(url)
        } else {
          //跳转到首页
          this.$router.push('/layout/home')
        }
      } catch (e) {
        this.$toast.fail('登录失败');
      } finally {
        //关闭加载状态
        this.loading = false
      }
      // .then((res) => {
      //   //服务器返回的内容为:res.data.data
      //   //提示登录成功
      //   this.$toast.success('登录成功');
      // })
      // .catch((err) => {
      //   this.$toast.fail('登录失败');
      // })
      // .finally(()=>{
      //   //关闭加载状态
      //   this.loading = false
      // })
    },
  }
}
</script>

<style lang="less">

</style>