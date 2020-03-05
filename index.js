var vm = new Vue({
  el: "#myApp",
  props: {},
  data: {
    isLogin: 'gray',
    loginUsername: "",
    loginPassword: "",
    listArray: [
      {
        name: "院线影院",
        children: [
          {
            name: "视频1",
            url:'source/2.mp4'
          },
          {
            name: "视频2",
            url:'source/3.mp4'
          }
        ]
      },
      {
        name: "院线影院",
        children: [
          {
            name: "视频1",
            url:'source/4.mp4'
          },
          {
            name: "视频2",
            url:'source/5.mp4'
          }
        ]
      },
      {
        name: "院线影院",
        children: [
          {
            name: "视频1",
            url:'source/1.mp4'
          },
          {
            name: "视频2",
            url:'source/2.mp4'
          },
          {
            name: "视频3",
            url:'source/3.mp4'
          },
          {
            name: "视频4",
            url:'source/4.mp4'
          }
        ]
      },
      {
        name: "院线影院",
        children: [
          {
            name: "视频1",
            url:'source/5.mp4'
          },
          {
            name: "视频2",
            url:'source/1.mp4'
          },
          {
            name: "视频3",
            url:'source/2.mp4'
          },
          {
            name: "视频4",
            url:'source/5.mp4'
          }
        ]
      }
    ],
    checkedItem: null,
    secondCheckdeIndex: null,
    playAction: false,
    isToast:false,
    tipsContent:'',
  },
  computed: {
    opacityStyle(){
      return {
        opacity:this.isToast?1:0,
      }
    }
  },
  methods: {
    getLogin(params) {
      if (params == "gray") {
        setTimeout(() => {
          this.isLogin = 'green';
        }, 1000);
      }else if (params == "in") {
        if (!this.loginUsername) {
          this.showToast("请输入账号");
          return;
        }
        if (!this.loginPassword) {
          this.showToast("请输入密码");
          return;
        }
        this.showToast("登录成功");

        setTimeout(() => {
          this.isLogin = 'red';
          if(this.playAction == true){
            this.player.play();
          }
        }, 1000);
      } else {
        this.isLogin = 'green';
        this.player.pause();
        // console.log(this)
        // this.MessageBox.confirm('确定退出?').then(action => {
        //     this.isLogin = false;
        // });
      }
    },
    slidTogle(index) {
      this.checkedItem == index
        ? (this.checkedItem = null)
        : (this.checkedItem = index);
      this.secondCheckdeIndex = null;
    },
    secondSelect(index,url) {
      this.secondCheckdeIndex = index;
      this.player.src(url);
      this.playAction = true;
      this.player.play();
    },
    playGo() {
      this.playAction = true;
      this.player.play();
    },
    showToast(text){
      this.tipsContent = text;
      this.isToast = true;
      setTimeout(()=>{
        this.isToast = false;
      },1500);
    }
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      {
        controls: true,
        autoplay: false,
        // poster: "m.jpg",
        preload: "auto"
      },
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
  }
});
