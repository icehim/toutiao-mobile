<template>
  <div>
    <div class="my">
      <!--个人信息-->
      <div class="info">
        <van-image
            class="myimg"
            width="90"
            height="90"
            round
            fit="cover"
            :src="userInfo.photo"
        />
        <div class="text">
          <div class="name">{{userInfo.name}}</div>
          <div class="birth">{{userInfo.birthday}}</div>
        </div>
      </div>
      <!--收藏信息-->
      <van-grid class="mygrid" :column-num="3" :border="false" :icon-size="24">
        <van-grid-item icon="newspaper-o" text="我的作品" />
        <van-grid-item icon="star-o" text="我的收藏" />
        <van-grid-item icon="tosend" text="阅读历史" />
      </van-grid>
      <!--其他信息-->
      <van-cell-group>
        <van-cell to="/my/edit" title="编辑资料" is-link icon="edit"/>
        <van-cell to="/my/zhi" title="小智同学" is-link icon="chat-o"/>
        <van-cell title="系统设置" is-link icon="setting-o"/>
        <van-cell @click="logout" title="退出登录" is-link icon="info-o"/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import {getUserInfoAPI} from "@/api";

export default {
  data(){
    return {
      // //当前登录用户的信息
      // userInfo:{}
    }
  },
  computed:{
    userInfo:function () {
      return this.$store.state.userInfo
    }
  },
  async created() {
    // //获取当前登录的用户信息
    // const res = await getUserInfoAPI();
    // // 保存登录信息
    // this.userInfo = res.data.data
    // //将用户信息保存到vuex中
    // this.$store.commit('setUserInfo',res.data.data)
    this.$store.dispatch('setUserInfo');
  },
  methods:{
    //推出登录
    logout() {
      //清楚登录相关的信息
      this.$store.commit('logout');
      //重新回到登录页面
      this.$router.push('/login');
      //提示推出成成功
      this.$toast.success('退出成功');
    }
  }
}
</script>

<style lang="less">
.my {
  .info {
    height: 120px;
    background-color: #3296fa;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #ffffff;
    .myimg{
      margin: 0 20px;
    }
    .text {
      .name {
        font-weight: 700;
        margin-bottom: 10px;
      }
      .birth {
        background: #ffffff;
        color: #3296fa;
        font-size: 14px;
      }
    }
  }
  .mygrid {
    .van-icon-newspaper-o {
      color: #3296fa;
    }
    .van-icon-star-o {
      color: red;
    }
    .van-icon-tosend {
      color: orange;
    }
  }
}
</style>