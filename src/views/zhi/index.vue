<template>
  <div class="zhi">
    <!--    顶部导航-->
    <van-nav-bar title="小智同学" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!--    聊天区域-->
    <div class="chat" ref="chat">
      <div class="item" v-for="(item,index) in chatList" :key="index">
        <van-image class="img" :class="{right:item.isme}" round fit="cover"
                   src="https://img2.baidu.com/it/u=2737889760,3497380097&fm=253&fmt=auto&app=138&f=GIF?w=240&h=240"></van-image>
        <div class="con"  :class="{right:item.isme}">
          {{item.t}}
        </div>
      </div>
    </div>
    <van-search
        class="input"
        v-model="msg"
        show-action
        left-icon=""
        placeholder="说点什么"
        @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">发送</div>
      </template>
    </van-search>
    <!--    输入框区域-->

  </div>
</template>

<script>
//导入建立连接的io对象
import io from 'socket.io-client'
export default {
  data() {
    return {
      //输入框中的内容
      msg: '',
      //聊天数组
      chatList: [
        {isme: false, t: '你好啊!'},
      ],
      //创建一个socket对象
      socket:null
    }
  },
  methods: {
    //1.0 点击右侧的提交按钮时会触发
    //2.0 在输入框中点击回车按钮会触发
    onSearch() {
      //将消息发送到服务器
      this.socket.emit('message',{
        msg:this.msg,
        timestamp:Date.now()
      })
      //点击之后将输入框中的内容添加到chatList中
      if (this.msg){
        this.chatList.push({
          isme:true,
          t:this.msg
        })
        this.msg = '';
        this.$nextTick(()=>{
          //滚动到最后
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
        })
      }
    }
  },
  created() {
    //创建服务器的连接
    this.socket = io('http://toutiao.itheima.net', {
      query: {
        token: this.$store.state.token.token
      },
      transports: ['websocket']
    });
    //收消息
    this.socket.on('message',data=>{
      //将内容添加到聊天列表中
      this.chatList.push({
        isme: false,
        t:data.msg,
      });
      //自动滚动到底部
      this.$nextTick(()=>{
        //滚动到最后
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
      })
    })
  }
}
</script>

<style lang="less">
.zhi {
  font-size: 16px;

  .chat {
    position: fixed;
    top: 46px;
    bottom: 54px;
    left: 0px;
    right: 0px;
    background-color: #eee;
    overflow: auto;

    .item {
      overflow: hidden;
      margin: 10px;

      .img {
        float: left;
        width: 40px;
        height: 40px;
        margin-right: 10px;

        &.right {
          float: right;
          margin-right: 0px;
          margin-left: 10px;
        }
      }

      .con {
        float: left;
        border: 1px solid #0A77E4;
        max-width: 70%;
        padding: 10px;
        background-color: #D3E4F0;

        &.right {
          float: right;
          border: 1px solid #c5e2d4;
          background-color: #84C650;
        }
      }
    }
  }

  .input {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
  }
}
</style>