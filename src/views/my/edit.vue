<template>
  <div class="edit">
    <!--    头部区域-->
    <van-nav-bar
        title="编辑资料"
        left-arrow
        @click-left="onClickLeft"
    />
    <!--    图片区域-->
    <div class="img">
      <van-image
          width="120"
          height="120"
          round
          fit="cover"
          :src="myInfo.photo"
      />
      <!--      使用一个文件上传组件-->
      <van-uploader class="myuploader" :after-read="afterRead"/>
    </div>
    <!--    其他信息-->
    <van-cell-group>
      <van-cell @click="openName(myInfo.name)" title="名称" is-link :value="myInfo.name"/>
      <van-cell @click="openGender" title="性别" is-link :value="myInfo.gender ? '女':'男'"/>
      <van-cell @click="openBirth(myInfo.birthday)" title="生日" is-link :value="myInfo.birthday"/>
    </van-cell-group>
    <!--    面板1:修改名称-->
    <!--    v-model:控制van-dilog显示与隐藏-->
    <van-dialog v-model="nameShow" title="修改名称" show-cancel-button @confirm="confirmName">
      <!--      输入框-->
      <van-field ref="myfield" v-model="myname"/>
    </van-dialog>
    <!--    面板2:修改性别-->
    <!--    v-model控制van-popup的显示与隐藏-->
    <van-popup v-model="genderShow" position="bottom" :style="{height:'25%'}">
      <!--      导航栏-->
      <van-nav-bar title="修改性别" left-text="取消" @click-left="genderCancle"/>
      <!--      性别区域-->
      <van-cell-group>
        <van-cell @click="changeGender('0')" title="男" is-link/>
        <van-cell @click="changeGender('1')" title="女" is-link/>
      </van-cell-group>
    </van-popup>
    <!--    面板3:修改生日-->
    <van-popup v-model="birthShow" position="bottom" :style="{height:'47%'} ">
      <van-datetime-picker
          @confirm="confirmBirth"
          @cancel="birthShow = false"
          v-model="birthday"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
      />
    </van-popup>
    <!--    面板4:裁剪面板-->
    <div v-if="mypanelShow" class="mypanel">
      <!--      添加一个裁剪的插件-->
      <vueCropper
          ref="cropper"
          :img="cropperImg"
          autoCrop
          :autoCropWidth="120"
          :autoCropHeight="120"
      ></vueCropper>
      <van-button @click="cutImg" class="btnOne" type="primary">裁剪</van-button>
      <van-button class="btnTwo" type="primary">取消</van-button>
    </div>
  </div>
</template>

<script>
//导入修改的方法
import {editInfoAPI,uploadImageAPI} from "@/api";
//导入moment
import moment from 'moment'
//导入vue-cropper
import { VueCropper } from 'vue-cropper'

export default {
  data() {
    return {
      //控制名称面板的显示与隐藏
      nameShow: false,
      //名称面板中输入框双向绑定的数据源
      myname: '',
      //控制生日面板的显示与隐藏
      genderShow: false,
      //控制生日面板的显示与隐藏
      birthShow: false,
      //当前日期组件的时间
      birthday: new Date(),
      // 日期组建的开始时间
      minDate: new Date('1900-1-1'),
      // 日期组建的结束时间
      maxDate: new Date(),
      //控制裁剪面板的显示与隐藏
      mypanelShow: false,
      //将来要裁剪的图片内容:url、base64、blob
      cropperImg: ''
    }
  },
  methods: {
    //点击裁剪按钮开始裁剪图片
    cutImg(){
      this.$refs.cropper.getCropBlob(async (data)=>{
        //将图片存储到FormDate对象中
        const fd = new FormData
        fd.append('photo',data)
        //将图片内容提交到接口中
        const res = await uploadImageAPI(fd);
        //接受返回的图片
        const imgPath = res.data.data.photo
        //关闭面板
        this.mypanelShow =false
        //更新vuex中的数据
        this.$store.commit('setUserInfo', {
          ...this.myInfo, //先保存之前所有的数据
          photo: imgPath,//替换修改后的birthday
        })
      })
    },
    //选择文件上传组件会出发的回调函数
    //file：表示当前上传框中选中的文件对象
    afterRead(file) {
      //file.content时选中图片的base64格式
      //file.file 当前选中的图片对象
      //打开裁剪面板
      this.mypanelShow = true
      //将选中的图片内容保存为要裁剪的图片
      this.cropperImg = file.content
    },
    //点击日期面板中的确定按钮时会触发
    async confirmBirth(value) {
      //将时间对象使用moment转为字符串
      const mybirth = moment(value).format("YYYY-MM-DD");
      // 将时间提交到服务器
      await editInfoAPI({
        birthday: mybirth
      })
      //提示修改成功
      this.$toast.success('修改日期成功');
      //更新vuex中的数据
      this.$store.commit('setUserInfo', {
        ...this.myInfo, //先保存之前所有的数据
        birthday: mybirth,//替换修改后的birthday
      })
      //关闭面板
      this.birthShow = false
    },
    //打开生日面板
    openBirth(birth) {
      this.birthShow = true;
      //将用户的生日保存到birthday(由于传入的birth是字符串，需要转换为日期)
      this.birthday = new Date(birth);
    },
    //提交修改后的性别
    async changeGender(gender) {
      //发送请求到服务器
      await editInfoAPI({
        gender
      });
      //提示修改成功
      this.$toast.success('修改性别成功');
      this.$store.commit('setUserInfo', {
        ...this.myInfo, //先保存之前所有的数据
        gender,//替换修改后的gender
      })
      this.genderShow = false
    },
    //关闭取消面板
    genderCancle() {
      this.genderShow = false
    },
    //打开性别面板
    openGender() {
      this.genderShow = true
    },
    //提交修改后的名称
    async confirmName() {
      //提交数据到服务器
      const res = await editInfoAPI({
        name: this.myname,
      });
      //提示修改成功
      this.$toast.success('修改用户信息成功');
      //更新vuex中的userInfo中的内容(不能调用actions中的方法，因为userInfo中还有内容)
      this.$store.commit('setUserInfo', {
        ...this.myInfo, //先保存之前所有的数据
        name: this.myname  //替换掉原数据中的name属性
      })
    },
    //打开修改名称面板
    openName(name) {
      //nameShow:默认控制面板的显示与隐藏，它的默认值是false，所以面板默认是隐藏的
      //在下面 this.nameShow = true 之后需要打开面板
      //vue在加载vant中的组件采用的懒加载方式(使用时才会加载)
      //打开面板
      this.nameShow = true; //正在加载
      //给面板中的输入框赋值
      this.myname = name;
      //给输入框获取焦点：dom.focus()
      this.$nextTick(() => {
        this.$refs.myfield.focus();
      });
    },
    //点击头部左侧箭头出发
    onClickLeft() {
      //跳转到my页面
      this.$router.push('/layout/my')
    }
  },
  created() {
    this.$store.dispatch('setUserInfo')
  },
  //通过计算属性快速获取到vuex中的用户信息
  computed: {
    myInfo: function () {
      return this.$store.state.userInfo
    }
  },
  components: {
    VueCropper,
  }
}
</script>

<style lang="less">
.edit {
  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }

  .img {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .myuploader {
      opacity: 0;
      position: absolute;

      .van-uploader__upload {
        width: 120px;
        height: 120px;

      }
    }
  }

  .van-cell__value.van-cell__value--alone.van-field__value {
    border: 1px solid #ccc;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
  }

  span.van-nav-bar__text {
    color: #fff;
  }


  .mypanel {
    width: 100vw;
    height: 100vh;
    background-color: red;
    position: fixed;
    top: 0;
    left: 0;

    .btnOne {
      position: absolute;
      left: 0;
      bottom: 0;
    }

    .btnTwo {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>