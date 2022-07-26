<template>
  <div class="detail">
    <!--  顶部导航  -->
    <van-nav-bar title="文章详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="content">
      <!--  文章标题  -->
      <h2>{{ artObj.title }}</h2>
      <!--  作者信息  -->
      <div class="author">
        <van-image
            width="45"
            height="45"
            round
            fit="cover"
            :src="artObj.aut_photo"
        />
        <div class="msg">
          <div class="name">{{ artObj.aut_name }}</div>
          <div class="time">{{ artObj.pubdate | timefromnow }}</div>
        </div>

        <!--        取消关注-->
        <van-button @click="follow" v-if="!artObj.is_followed" type="info" round>
          <van-icon name="plus"/>
          关注
        </van-button>
        <!--        关注作者-->
        <van-button v-else type="info" round>
          <van-icon name="success"/>
          已关注
        </van-button>

      </div>
      <!--  文章内容  -->
      <div class="art" v-html="artObj.content"></div>
      <div class="end">--- end ---</div>
      <!--  点赞区域  -->
      <div class="btn">
        <van-button class="one" round plain type="primary" v-if="artObj.attitude ===1">
          <van-icon name="good-job-o"/>
          点赞
        </van-button>
        <van-button class="one" round plain v-else>
          <van-icon name="good-job-o"/>
          点赞
        </van-button>
        <van-button class="one" round plain type="danger" v-if="artObj.attitude ===0">
          <van-icon name="delete-o"/>
          不喜欢
        </van-button>
        <van-button class="one" round plain v-else>
          <van-icon name="delete-0"/>
          不喜欢
        </van-button>
      </div>
      <!--  评论区域  -->
      <comment></comment>
    </div>
  </div>
</template>

<script>
import {getArticleAPI, followAuthAPI} from "@/api/index";

export default {
  data() {
    return {
      //当前点击文章的id
      art_id: this.$route.query.id,
      artObj: {}
    }
  },

  methods: {
    //点击头部左侧箭头出发
    onClickLeft() {
      //跳转到my页面
      this.$router.push('/layout/home')
    },
    // 关注作者
    async follow() {
      try {
        await followAuthAPI({
          target: this.artObj.aut_id
        })
        this.$toast.success('关注成功')
        this.artObj.is_followed = true
      } catch {
        this.$toast.fail('关注失败')
      }
    },
    //获取文章详情
    async getArticle() {
      const res = await getArticleAPI(this.art_id)
      // console.log(res)
      //保存文章详情
      this.artObj = res.data.data
    }
  },
  created() {
    this.getArticle()
  },
  components:{
    comment:()=>import('./components/comment')
  }
}
</script>

<style lang="less">
.detail {

  font-size: 16px;

  .content {
    padding: 0 10px;


  }

  .author {
    margin: 10px 0;
    display: flex;
    font-size: 16px;
    align-items: center;

    .msg {
      flex: 1;
      margin-left: 8px;
    }
  }

  .art {
    margin-top: 20px;
    //让文本内容报纸原本的间隔
    white-space: pre-wrap;

    img {
      width: 100%;
    }
    pre {
      //让标签结果换行
      white-space: pre-wrap;
      //让文本换行
      word-break: break-word;
      code {
        white-space: pre-wrap;
      }
    }
  }

  .end {
    text-align: center;
    color: #999;
    margin: 30px 0;
  }

  .btn {
    text-align: center;

    .one {
      margin-right: 30px;
    }
  }
}
</style>