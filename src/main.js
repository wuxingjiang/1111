import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/stageTwo.vue'
import routerConfig from './router/index.js'
import utils from './common/js/utils.js'
Vue.use(VueRouter)
Vue.use(utils)
const router = new VueRouter({
    mode: 'history',
    routes: routerConfig
})
UserCenter(true).then(function(loginInfo) {
    // console.log(loginInfo);

    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    Vue.mixin({
        data() {
            return {
                loginInfo: loginInfo,
                query: GetRequest(),
            }
        },
        computed: {
            env() {
                let env = "rel"
                if (location.hostname == 'localhost' || location.hostname.indexOf('test') != -1) {
                    env = "test"
                }
                return env;
            }
        },
        methods: {
            dologin() {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf("hxappid") > -1) { //如果在app调用原生登录
                    window.javatojs.login();
                }
                // else if ("micromessenger" == ua.match(/MicroMessenger/i)) {//如果在微信调用微信接口登录
                //     $.ajax({
                //         url: 'https://regtool.hexun.com/wapreg/CheckBindWechat.aspx',
                //         type: 'get',
                //         dataType: 'jsonp',
                //         success: function(data) {
                //             if (data.code == -1) {
                //                 location.href = "https://reg.hexun.com/bindweixin.aspx?gourl=" + escape(window.location.href);
                //             }
                //         }
                //     })
                // } 
                else { //H5直接跳转登录页面
                    location.href = 'https://reg.hexun.com/h5/login.aspx?regtype=5&gourl=' + escape(window.location.href)
                }
            }
        }
    })

    const Menu = new Vue({
        router,
        render: h => h(App),
        loginInfo: loginInfo,
    })

    Menu.$mount('#app')
});