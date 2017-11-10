<template>
    <div class="main content-bg">
        <section>
            <header><img src="../assets/images/stage3_03.png"></header>
        </section>
        <!--
        <p v-if="!stage2"><img src="../assets/images/h5header_04.jpg"></p>
        <p class="tit0" v-if="stage2"><img src="../assets/images/11banner.png"></p>
        <stage-one class="stage1" v-if="!stage2" @setVideoShow="setVideoShow"></stage-one>
        -->
        <div class="stage2">
            <p class="tit1">
                <img src="../assets/images/stage3_01.png" >
            </p>
            <div class="wait-hb qiang-hb">
                <a @click="hbInterface(hbObj)" class="qiang-a"></a>
                <p class="white kt-txt ft28">注：必须先开通 &nbsp;<a @click="hrefLink(openWallet, {
                            '事件功能': '点此开通',
                            '功能分类': '设置操作',
                            '所属平台': '培训平台',
                            '事件类别': '非体验',
                            'PLATFORM': 'H5',
                            '产品分类': '视频课堂',
                            '页面名称': '双十一专题页',
                            '页面类型': '营销活动页',
                            '页面标题': '双11钜惠，赢战新牛市',
                            '发布日期': '20171106',
                            })" class="yellow">和讯钱包</a>
                </p>
            </div>
            <!-- 时间轴 s -->
            <timeline v-show="false  && !specialId && timeLineShow" @timeLineChange="timeLineChange" @timeRun="tumeRun" :show="stage2" :api="api"></timeline>
            <!-- 时间轴 e -->
            <!-- 视屏播放区 S -->
            <section class="videoB hideXXM">
                <div class="video">
                    <div class="videoCon">
                        <div class="video-tit" v-if="pubClassInfo.pubHeaderShow">
                            <p class="fr">
                                <a @click="getInterface({id:pubClassInfo.pubquanid}, 'DISCOUNT_COUPON', pubClassInfo, 'pubClick')" class="btn btn-orange btn-small">抢券</a>
                                <a @click="hrefLink(pubClassInfo.pubbuylink, {
                                        '事件功能': '购买',
                                        '功能分类': '购买',
                                        '所属平台': '培训平台',
                                        '事件类别': '非体验',
                                        'PLATFORM': 'H5',
                                        '合作者ID': pubClassInfo.pubTid,
                                        '合作者名称': `${pubClassInfo.pubTname}(${pubClassInfo.pubTid})`,
                                        '产品ID': pubClassInfo.pubproductId,
                                        '产品名称': `${pubClassInfo.pubproductName}(${pubClassInfo.pubproductId})`,
                                        '产品分类': '视频课堂',
                                        '价格区间': '10元以上',
                                        '页面名称': '双十一专题页',
                                        '页面类型': '营销活动页',
                                        '页面标题': '双11钜惠，赢战新牛市',
                                        '发布日期': '20171106',
                                        })" class="btn btn-blue btn-small ml10">购买</a>
                            </p>
                            <p style="white-space:nowrap;overflow: hidden;">{{pubClassInfo.pubClassName}}</p>
                        </div>
                        <div>
                            <iframe v-show="videoShow" style="z-index: 1; position:relative;width:6.9rem; height:3.881rem" :src="videoSrc" frameborder="0"></iframe>
                        </div>
                    </div>
                </div>
            </section>
            <!-- 视屏播放区 E -->
            <!-- 公开课区 S -->
            <template v-if="!specialId">
                <p class="tit-pub"><img src="../assets/images/pair_12.png"></p>
                <section class="wrap pubCourse">
                    <nav :class="['tabVideo flex', pubCourseDay == 2? 'tab-bg2' : 'tab-bg']">
                        <a href="javascript:void(0)" @click="checkpubCourse(1)" data-bs="0" :class="['flex-1', pubCourseDay == 1? 'on' : '']">11月9日</a>
                        <a href="javascript:void(0)" @click="checkpubCourse(2)" data-bs="1" :class="['flex-1', pubCourseDay == 2? 'on' : '']">11月10日</a>
                    </nav>
                    <div v-if="pubCourseDay == 1" class="tabCon">
                        <table width="100%" collapse="0">
                            <thead>
                                <tr>
                                    <th align="center" width="23%">时间</th>
                                    <th align="center" width="19%">主讲人</th>
                                    <th align="center" width="34%">课程主题</th>
                                    <th align="center" width="14%">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="classList.length > 0" v-for="item in classList[0].list">
                                    <td align="center">{{item.playTime}}</td>
                                    <td align="center">{{item.teacherName}}</td>
                                    <td align="left">{{item.theme}}</td>
                                    <td>
                                        <a v-if="item.status == 'D'" @click="play(item.priceId, item.videoId, item)" :class="['btn btn-blue btn-small btn-blue-shadow']">回顾</a>
                                        <a v-if="item.status == 'C'" :class="['btn btn-gray btn-small btn-gray-shadow']">回顾</a>
                                        <a v-if="item.status == 'B'" @click="autoPlayfun(item.classId, item)" :class="['btn btn-orange btn-small btn-orange-shadow']">直播</a>
                                        <a v-if="item.status == 'A'" :class="['btn btn-gray btn-small btn-gray-shadow']">直播</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-if="pubCourseDay == 2" class="tabCon">
                        <table width="100%" collapse="0">
                            <thead>
                                <tr>
                                    <th align="center" width="23%">时间</th>
                                    <th align="center" width="19%">主讲人</th>
                                    <th align="center" width="34%">课程主题</th>
                                    <th align="center" width="14%">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="classList.length > 0" v-for="item in classList[1].list">
                                    <td align="center">{{item.playTime}}</td>
                                    <td align="center">{{item.teacherName}}</td>
                                    <td align="left">{{item.theme}}</td>
                                    <td align="center">
                                        <a v-if="item.status == 'D'" @click="play(item.priceId, item.videoId, item)" :class="['btn btn-blue btn-small btn-blue-shadow']">回顾</a>
                                        <a v-if="item.status == 'C'" :class="['btn btn-gray btn-small btn-gray-shadow']">回顾</a>
                                        <a v-if="item.status == 'B'" @click="autoPlayfun(item.classId, item)" :class="['btn btn-orange btn-small btn-orange-shadow']">直播</a>
                                        <a v-if="item.status == 'A'" :class="['btn btn-gray btn-small btn-gray-shadow']">直播</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </template>
            <!-- 公开课区 E -->
            <!-- 底部课程标签 s-->
            <nav ref="bottomTab" :class="['renqi-tab', isNavTop ? 'fixedTop content-bg':' ']">
                <a v-if="!specialId" v-for="(item, index) in courseList" @click="checkCourseValue(item.val)" href="javascript:void(0)" :class="[courseValue == item.val? 'on': '', index == courseList.length -1?'last':'']">{{item.name}}</a>
            </nav>
            <div v-if="isNavTop" style="visibility: hidden;" class="renqi-tab">
                <a></a>
            </div>
            <section ref="bottomWrap" class="wrap">
                <div v-for="(nav, k) of bottomClassList" v-if="courseValue == k && !specialId" class="botCon">
                    <div class="courseList" v-for="item in nav">
                        <div class="pic-row clearfix courseList-header">
                            <a :href="item.studioSrc" class="img-box">
                                <p class="img"><img :src="item.timg" alt=""></p>
                            </a>
                            <div class="pl10 white content-box">
                                <h4 class="ft28"><a :href="item.studioSrc"><strong style="color:#fff">{{item.cname}}</strong></a></h4>
                                <h5 class="ft24 pt10">{{item.ctime}}</h5>
                            </div>
                        </div>
                        <div class="listwrap">
                            <div class="listCon">
                                <h4 class="ft30 fc_9">课程简介</h4>
                                <div class="pt10">
                                    <p v-for="desc in item.desc" :key="desc">{{desc}}</p>
                                </div>
                            </div>
                            <div class="buyBox flex flex-pack-center">
                                <div>
                                    <p class="pt30">
                                        <del class="fc_6 ft28">原价：{{item.opicy}}/{{item.yu}}</del>
                                    </p>
                                    <p class="red pt20">用券价：<span class="ft38">{{item.zpicy}}</span>/{{item.yu}}</p>
                                </div>
                                <div v-if="item.opicm">
                                    <p v-if="item.opicm" class="pt30">
                                        <del class="fc_6 ft28">原价：{{item.opicm}}/{{item.mu}}</del>
                                    </p>
                                    <p v-if="item.zpicm" class="red pt20">用券价：<span class="ft38">{{item.zpicm}}</span>/{{item.mu}}</p>
                                </div>
                            </div>
                            <div class="flex flex-pack-around">
                                <div>
                                    <p v-if="item.qid" class="pt40"><a @click="getInterface({id:item.qid},'DISCOUNT_COUPON', item, 'list_click')" :class="['btn  btn-big ft30', true ?'btn-blue btn-blue-shadow':'btn-gray btn-gray-shadow']">点击领券</a></p>
                                    <p v-else class="pt40"><a @click="hrefLink(item.orderSrc, item.dplus)" class="btn btn-orange2 btn-orange-shadow btn-big ft30">立即购买</a></p>
                                </div>
                                <div>
                                    <p :class="['pt40']"><a @click="hrefLink(item.orderSrc, item.dplus)" class="btn btn-orange2 btn-orange-shadow btn-big ft30">立即购买</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(nav, k) of bottomClassList" v-if="specialId">
                    <div class="courseList" v-for="item in nav" v-if="item.tid==specialId">
                        <div class="pic-row clearfix courseList-header">
                            <a :href="item.studioSrc" class="img-box">
                                <p class="img"><img :src="item.timg" alt=""></p>
                            </a>
                            <div class="pl10 white content-box">
                                <h4 class="ft28"><a :href="item.studioSrc"><strong style="color:#fff">{{item.cname}}</strong></a></h4>
                                <h5 class="ft24 pt10">{{item.ctime}}</h5>
                            </div>
                        </div>
                        <div class="listwrap">
                            <div class="listCon">
                                <h4 class="ft30 fc_9">课程简介</h4>
                                <div class="pt10">
                                    <p v-for="desc in item.desc" :key="desc">{{desc}}</p>
                                </div>
                            </div>
                            <div class="buyBox flex flex-pack-center">
                                <div>
                                    <p class="pt30">
                                        <del class="fc_6 ft28">原价：{{item.opicy}}/{{item.yu}}</del>
                                    </p>
                                    <p class="red pt20">用券价：<span class="ft38">{{item.zpicy}}</span>/{{item.yu}}</p>
                                </div>
                                <div v-if="item.opicm">
                                    <p v-if="item.opicm" class="pt30">
                                        <del class="fc_6 ft28">原价：{{item.opicm}}/{{item.mu}}</del>
                                    </p>
                                    <p v-if="item.zpicm" class="red pt20">用券价：<span class="ft38">{{item.zpicm}}</span>/{{item.mu}}</p>
                                </div>
                            </div>
                            <div class=" flex flex-pack-around">
                                <div>
                                    <p v-if="item.qid" class="pt40"><a @click="getInterface({id:item.qid},'DISCOUNT_COUPON', item, 'list_click')" :class="['btn  btn-big ft30', true ?'btn-blue btn-blue-shadow':'btn-gray btn-gray-shadow']">点击领券</a></p>
                                    <p v-else class="pt40"><a @click="hrefLink(item.orderSrc, item.dplus)" class="btn btn-orange2 btn-orange-shadow btn-big ft30">立即购买</a></p>
                                </div>
                                <div>
                                    <p :class="['pt40']"><a @click="hrefLink(item.orderSrc, item.dplus)" class="btn btn-orange2 btn-orange-shadow btn-big ft30">立即购买</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!--底部课程标签 e -->
            </article>
            <p :class="['txt-c white ft26 pb20', specialId?'pt50':'']">本次活动的最终解释权归和讯所有</p>
            <p :class="['txt-c white ft26 pb20']">客服电话：010-85697400 &nbsp;QQ: 800062748</p>
        </div>
        <!--弹窗 s-->
        <!--红包 s-->
        <div class='redPacket marks' v-show='hbShow'>
            
            <div class=" gx-hb txt-c white hzz" v-show='hbSuccess'>
                <div class="gxhb-txtBak">
                    <p class="ft36 gx">恭喜您获得现金红包</p>
                    <h5 class="ft28"><span class="yellow ftLarge">{{hbSucObj.amount}}</span>元</h5>
                    <a class='yellow' href="https://mepay.hexun.com/my/home.htm">请到个人钱包查看</a>
                    <!-- <h6 class="white txt-c pt15 ft28">关注“和讯投资” 参加幸运抽奖</h6> -->
                </div>
                <div class="posrealtive" style="margin-top: 1.8rem;">
                    <p class="clearfix close-hb"><i @click="hbShow = false" class=""><img src="../assets/images/close.png"></i></p>
                </div>
            </div>
        </div>
        <!--红包 e-->
        <!--领券失败 s-->
        <div class="marks" v-if="errTip">
            <div class="mess fail-lqsb ">
                <div class="txt">
                    <h2>很遗憾</h2>
                    <h5>{{failMsg}}</h5>
                    <p v-if="failTcType=='walletNot'" class="btn">
                        <a @click="hrefLink(openWallet, {
                            '事件功能': '设置操作',
                            '功能分类': '点此开通',
                            '所属平台': '培训平台',
                            '事件类别': '非体验',
                            'PLATFORM': 'H5',
                            '产品分类': '视频课堂',
                            '页面名称': '双十一专题页',
                            '页面类型': '营销活动页',
                            '页面标题': '双11钜惠，赢战新牛市',
                            '发布日期': '20171106',
                            })">立即开通</a>
                    </p>
                    <p v-else class="btn"><a @click="errTip = false">确认</a></p>
                </div>
                <p class="clearfix"><i class=" close-lqcg closeslateY" @click="errTip = false"><img src="../assets/images/close.png"></i></p>
            </div>
        </div>
        <!--领券失败 e-->
        <!-- 代金券 s-->
        <div class="marks" v-if="djqShow">
            <div class="mess mess-zk djq" id="zkq">
                <p class="name">代金券</p>
                <p class="info"><span class="number">{{djqObj.price}}</span><span>￥</span></p>
                <p class="btn"><a @click="getInterface(djqObj,'CASH_COUPON', djqObj, 'djq_click')">立即开抢</a></p>
                <p class="clearfix"><i @click="djqShow = false" class="closeslateY close-zk"><img src="../assets/images/close.png"></i></p>
            </div>
        </div>
        <div class="marks" v-if="djqSucShow">
            <div class="mess mess-zk djqsuccess">
                <h2>恭喜您</h2>
                <h5>获得{{djqSucMsg}}</h5>
                <p class="btn"><a :href="api.couponSrc">去查看</a></p>
                <p class="clearfix"><i @click="djqSucShow = false" class="closeslateY close-zk"><img src="../assets/images/close.png"></i></p>
            </div>
        </div>
        <!-- 代金券 e-->
    </div>
</template>
<script>
// http://test.apicaidao.hexun.com/activity/class
// http://test.apicaidao.hexun.com/activity/video
// https://reg.hexun.com/h5/mywallet.aspx  开通钱包地址
//H5钱包首页：
// 线上的：
// https://mepay.hexun.com/my/home.htm 

// 测试的：
// https://tpay-pay.hexun.com/site-wap/my/home.htm 
import product from '../assets/product.json'
// import stageOne from './stageOne.vue'
import timeline from '../components/timeline2.vue'
export default {
    components: {
        // 'stage-one': stageOne,
        'timeline': timeline,
    },
    data() {
        return {
            pubCourseDay: 1,
            aotoCheckPubCourse: true, // 课表自动切换
            courseValue: 'tab1', // 底部课程
            courseList: [{
                    name: '人气课程',
                    val: 'tab1',
                },
                {
                    name: '热门课程',
                    val: 'tab2',
                },
                {
                    name: '精品课程',
                    val: 'tab3',
                },
                {
                    name: '经典课程',
                    val: 'tab4',
                },
            ],
            isNavTop: false, // 底部导航是否定位到顶部
            classList: [{
                    list: []
                },
                {
                    list: []
                },
                {
                    list: []
                }
            ],
            videoList: [], // 回顾
            videoSrc: '', // iframe地址
            openWallet: 'https://reg.hexun.com/h5/mywallet.aspx', // 钱包开通H5地址
            autoPlay: true, // 自动播放
            hbShow: false, // 抢红包痰喘
            openhb: false, // 打开红包弹窗
            autoPlayId: '', // 自动播放ID
            initClass: '206216', // 默认播放课程
            qiangquan: false, // 抢卷提示
            pubClassInfo: { // 公开课信息
                pubClassName: '', // 当前播放的公开课名字
                pubbuylink: '', // 购买地址
                pubquanid: '', // 抢卷ID
                pubquanname: '', // 券名字
                pubHeaderShow: false, // 公开课头部,
                pubTid: '', // 老师ID
                pubTname: '', // 老师名字
                pubproductName: '', // 产品ID
                pubproductId: '', // 产品名字
                status: '',
            },
            hbSucObj: {}, // 红包抢成功信息
            hbObj: {}, // 红包信息
            hbSuccess: false,
            hbOver: false, // 红包抢完； 
            errTip: false, // 失败提示弹框
            failTcType: null, // 失败类型
            failMsg: '', // 失败提示
            djqShow: false, // 代金券弹窗
            djqSucShow: false, // 代金券成功
            djqObj: { id: null, amount: null, percent: 0 }, // 代金券信息
            djqSucMsg: '', // 代金券领取成功提示
            stage2: false, // 是否是第二阶段
            time20171109: 1510156800000,
            time201711090700: 1510182000000,
            time201711100700: 1510268400000,
            time201711100000: 1510243200000,
            time20171111000000: 1510329600000,
            specialPlayhg: false, // 专场回顾是否已经开始播放
            specialPlayzb: false, // 专场老师公开课是否已经播放
            videoShow: true, // 是否隐藏视频
            timeLineShow: true, //是否显示时间轴 用于11号后
            stage3: false,
        }
    },
    created() {
        this.getClassList();
        this.getVideoList();
        setInterval(() => {
            // 30秒拉取回顾信息
            this.getVideoList();
        }, 30000)
    },
    watch: {
        autoPlayId(val) {
            this.autoPlayfun(val)

        },
        hbShow(val) {
            // console.log('红包'+ val);
            this.setVideoShow(!val)
        },
        djqSucShow(val) {
            // console.log('代金券chenggomg'+ val);
            this.setVideoShow(!val)
        },
        djqShow(val) {
            // console.log('代金券'+ val)
            this.setVideoShow(!val)
        },
        errTip(val) {
            // console.log('失败' + val);
            this.setVideoShow(!val)
        },
        classList: {
            deep: true,
            handler() {
                console.log('change')
            }
        }

    },
    computed: {
        bottomClassList() {
            let obj = product;
            for (let item in obj) {
                obj[item].forEach(sub => {
                    if (this.env == 'test') {
                        sub.orderSrc = sub.orderSrc.replace('https://order.hexun.com', 'https://test-order.hexun.com');
                        sub.orderSrc = sub.orderSrc.replace('http://zhibo.hexun.com', 'http://test.zhibo.hexun.com');
                        sub.studioSrc = sub.studioSrc.replace('http://caidao.hexun.com', 'http://test.caidao.hexun.com')
                    };
                    sub.dplus = {
                        '事件功能': '立即购买',
                        '功能分类': '购买',
                        '所属平台': '培训平台',
                        '事件类别': '非体验',
                        'PLATFORM': 'H5',
                        '合作者ID': sub.tid,
                        '合作者名称': `${sub.tname}(${sub.tid})`,
                        '产品ID': sub.dpid,
                        '产品名称': `${sub.dpname}(${sub.dpid})`,
                        '产品分类': '视频课堂',
                        '价格区间': '10元以上',
                        '页面名称': '双十一专题页',
                        '页面类型': '营销活动页',
                        '页面标题': '双11钜惠，赢战新牛市',
                        '发布日期': '20171106',
                    }
                })
            }

            return obj
        },
        specialId() { // 老师专场ID
            return this.query.tid;
        },
        courseListData() {
            let obj = {
                cid: '', // 课程ID
                tid: '', // 老师ID
                cname: '', // 课程名字
                ctime: '', // 课程时间
                cdesc: '', // 课程简介
                cpriceyear: '', // 原价年
                cpricemonth: '', // 原价月
                cpriceyearz: '', // 折后价年
                cpricemonthz: '', // 折后价月
                getLink: '', // 领卷地址
                useLink: '', // 用卷地址
            }
            return obj;
        },
        api() {

            let apicaidao = 'http://apicaidao.hexun.com';
            let apicallvip = 'http://callvip.hexun.com';
            let apilesson = 'https://apilesson.hexun.com';
            let webcaidao = 'http://caidao.hexun.com';
            if (this.env == 'test') {
                apicaidao = 'http://test.apicaidao.hexun.com';
                apicallvip = 'http://test-callvip.hexun.com';
                apilesson = 'http://apilesson.hexun.com';
                webcaidao = 'http://test.caidao.hexun.com';
            }

            return {
                getClass: `${apicaidao}/activity/class`, // 获取课表信息
                getVideo: `${apicaidao}/activity/video`, // 获取课表回放信息
                getCoupon: `${apicallvip}/jsapi/coupon/receive`, // 领券
                getHB: `${apicallvip}/rpsapi/service`,
                checkoutWallet: `${apicallvip}/jsapi/order/wallet-isopened`, // 判断是否开通钱包
                getVHsrc: `${apilesson}/api/video/`,
                getClassSrc: `${apilesson}/api/classauth/`,
                couponSrc: `${webcaidao}/home/coupons/index.html`,
                timeLine: `${apicaidao}/activity/timeline`,
                getTime: `${apicaidao}/activity/currenttime`
            }
        },
        // 公开课 课表
        subClassTab() {
            return this.classList.map((item, i) => {
                return item.list.map((sub, j, arrj) => {
                    if (i == 0 && j == 0) {
                        sub.aotuPlayTime = this.setTime(item.time, sub.playTime, this.time201711090700);
                    } else if (i == 1 && j == 0) {
                        sub.aotuPlayTime = this.setTime(item.time, sub.playTime, this.time201711100700);
                    } else if (i <= 1){
                        sub.aotuPlayTime = this.setTime(item.time, sub.playTime, arrj[j - 1].aotuPlayTime.split('-')[1]);
                    }
                    sub.liveTime = this.setTime(item.time, sub.playTime)
                    sub.status = 'A';
                    this.videoList.forEach((video) => {
                        if (video.classId == sub.classId) {
                            sub.videoId = video.videoId
                            sub.priceId = video.priceId
                        }
                    })
                    return sub;
                })
            });
        }
    },
    filters: {

    },
    mounted() {
        this.autoTop();
    },
    updated() {

    },
    methods: {
        timeLineChange(item) {
            if (!this.stage2) { // 如果是第一阶段
                // console.log('当前第一阶段')
                return false;
            }
            if (item.type == 'hb') {
                // console.log('红包出来啦');
                this.hbObj = item.data; // 设置红包信息
                // this.hbShow = true; // 打开红包       
                            
            }
            if (item.type == 'djq') {
                // console.log('代金券来了');
                this.djqShow = true;
                this.djqObj = item.data;
            }
        },
        tumeRun(serviceTime) {
            let nowTime = serviceTime;
            if (serviceTime >= this.time20171109) {
                this.stage2 = true;
            } else {
                this.stage2 = false;
            }

            if (serviceTime > this.time20171111000000) {
                this.timeLineShow = false;
                this.stage3 = true;
            } else {
                this.stage3 = false;
            }

            if (this.aotoCheckPubCourse && serviceTime > this.time201711100000) {
                this.pubCourseDay = 2;
            }

            // 自动切换公共课
            let hasIng = this.subClassTab.some((item) => {
                let hasIngsub = item.some((sub) => {
                    let reslut = false;
                    let time = sub.aotuPlayTime.split("-");
                    let sTime = time[0];
                    let eTime = time[1];

                    // status 
                    // A 公开课没有结束的显示灰色直播按钮（不可点），
                    // B 进行中的显示橙色的直播按钮（可点），
                    // C 已结束的没有产生回顾的显示灰色的回顾按钮（不可点），
                    // D 已结束的有回顾的显示蓝色的回顾按钮（可点）；

                    sub.oldStatus = sub.status;
                    if (nowTime > parseInt(eTime)) {
                        sub.status = 'C'
                        if (sub.videoId) {
                            sub.status = 'D';

                        }
                    } else {
                        if (nowTime >= parseInt(sTime)) {
                            sub.status = 'B'
                        }
                        if (nowTime < parseInt(sTime)) {
                            sub.status = 'A'
                        }
                    }

                    if (sub.oldStatus != sub.status) {
                        this.$forceUpdate()
                    }

                    if (this.specialId) { // 如果是专场
                        if (this.specialId == sub.teacherId) { // 如果当前对象保存的是老师的公开课信息

                            if (nowTime > parseInt(eTime)) {
                                if (sub.videoId) {
                                    if (!this.specialPlayhg) {
                                        // console.log('当前课程已结束，并且回顾已经有了，即将请求地址！')
                                    }
                                    this.play(sub.priceId, sub.videoId)
                                    this.specialPlayhg = true;
                                }
                            } else {
                                if (!this.specialPlayzb) {
                                    // console.log('当前课程还没有结束');
                                }

                                if (this.stage2) { // 如果是第二阶段自动播放公开课
                                    // console.log('第二阶段自动播放公开课')
                                    this.autoPlayfun(sub.classId);
                                    this.specialPlayzb = true;
                                }

                            }
                        }
                        reslut = (nowTime > parseInt(sTime) && nowTime < parseInt(eTime) && this.specialId == sub.teacherId)
                    } else {
                        if (nowTime > parseInt(sTime) && nowTime < parseInt(eTime) && !this.specialPlayhg) {
                            this.autoPlayId = sub.classId;
                            if (this.autoPlay) {
                                this.setPubInfo(sub);
                            }
                        }
                        reslut = (nowTime > parseInt(sTime) && nowTime < parseInt(eTime));
                    }

                    return reslut
                })
                return hasIngsub
            });

            if (hasIng) { // 如果是进行中
                this.pubClassInfo.pubHeaderShow = true;
            } else {
                this.pubClassInfo.pubHeaderShow = false;
                if(!this.autoPlay) {
                    this.pubClassInfo.pubHeaderShow = true;
                }
                if (!this.specialPlayhg) {
                    this.autoPlayId = this.initClass;
                }
                if (this.specialId && this.stage2) {
                    let hasspecial = this.subClassTab.some((item) => {
                        let hasspecialsub = item.some((sub) => {
                            return this.specialId == sub.teacherId
                        })
                        return hasspecialsub
                    });
                    if (hasspecial) {
                        this.pubClassInfo.pubHeaderShow = true;
                    }
                }
            }


            // 设置headerINFO C

            this.subClassTab.forEach((item) => {
                item.forEach((sub) => {
                    let time = sub.aotuPlayTime.split("-");
                    let sTime = time[0];
                    let eTime = time[1];

                    if (this.specialId == sub.teacherId) {
                        this.setPubInfo(sub)
                    }

                })
            });


        },

        // 切换课表
        checkpubCourse(val) {
            this.pubCourseDay = val;
            this.aotoCheckPubCourse = false;
        },
        // 切换课程
        checkCourseValue(val) {
            this.courseValue = val
        },
        // 吸顶
        autoTop() {
            let _this = this;
            let nav = _this.$refs.bottomTab;
            let bottomWrap = _this.$refs.bottomWrap;
            let navTop = ''; // dom距离顶部的高度
            let screenH = window.screen.height;

            function _getPageScroll() {
                var xScroll, yScroll;
                if (self.pageYOffset) {
                    yScroll = self.pageYOffset;
                    xScroll = self.pageXOffset;
                } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
                    yScroll = document.documentElement.scrollTop;
                    xScroll = document.documentElement.scrollLeft;
                } else if (document.body) { // all other Explorers
                    yScroll = document.body.scrollTop;
                    xScroll = document.body.scrollLeft;
                }
                return { xScroll: xScroll, yScroll: yScroll };
            };
            window.onscroll = function() {
                let scrollT = _getPageScroll().yScroll; // 滚动的距离
                if (!_this.isNavTop) {
                    navTop = $(nav).offset().top;
                }
                if (!navTop) {
                    return false;
                }
                if ((navTop) - scrollT <= 0) {
                    _this.isNavTop = true;
                } else {
                    _this.isNavTop = false;
                }
            }
        },
        // 获取课表
        getClassList() {
            $.ajax({
                dataType: 'jsonp',
                url: this.api.getClass,
                success: (res) => {
                    if (res.code == 0) {
                        this.classList = res.data.data;
                    }
                }
            });
        },

        // 获取回顾信息
        getVideoList() {
            $.ajax({
                dataType: 'jsonp',
                url: this.api.getVideo,
                success: (res) => {
                    if (res.code == 0) {
                        this.videoList = res.data;
                    }
                }
            });
        }, // 点击回顾
        play(cid, vid, dplus_info) {
            let _this = this;
            let dplus_data;
            
            if (this.specialId && this.specialPlayhg) { // 在专场中已经自动播放过
                return false;
            }
            if (vid) {
                 
                $.ajax({
                    type: 'get',
                    url: this.api.getVHsrc + vid + "/" + cid,
                    dataType: "jsonp",
                    success: function(data) {
                        if (data.code == '0') {
                            var vhallPlayBackId = '';
                            if (typeof(data.data.vhallPlayBackId) != "undefined" && data.data.vhallPlayBackId != '' && data.data.vhallPlayBackId != null) {
                                vhallPlayBackId = '&rid=' + data.data.vhallPlayBackId
                            }
                            var url = "http://e.vhall.com/webinar/inituser/" + data.data.vhallActivityId + '?name=' + encodeURI(data.data.name) + '&email=' + data.data.vhallEmail + '&embed=video&k=' + data.data.vhallAuthKey + vhallPlayBackId;
                            _this.videoSrc = url;
                            _this.autoPlay = false;
                        }
                    }
                });
            }

            if (dplus_info) {
                
                dplus_data = {
                    "页面名称": "双十一专题页",
                    "页面标题": "双11钜惠，赢战新牛市",
                    "页面类型": "营销活动页",
                    "事件类别": "体验",
                    "事件功能": "回顾课程",
                    "功能分类": "设置操作",
                    "产品分类": "视频课堂",
                    "所属平台": "培训平台",
                    "合作者ID": dplus_info.teacherId,
                    "合作者名称": `${dplus_info.teacherName}(${dplus_info.teacherId})`,
                    "产品ID": dplus_info.classId,
                    "产品名称": `${dplus_info.theme}(${dplus_info.classId})`,
                    "PLATFORM": "H5",
                };
                this.setPubInfo(dplus_info);
                console.log(dplus_info);
                dplus_Click("点击事件", dplus_data);
            }

        },
        // 
        autoPlayfun(cid, playObj) {
            var _this = this;
            // if (this.specialId == '4128648') {
            //     this.videoSrc = '';
            //     return false;
            // }
            if (this.specialId && this.specialPlayzb) {
                // console.log('当前为专场。且处于播放中')
                return false;
            }

            if (!this.autoPlay && !playObj) { // 如果点了回顾 就不自动切换 手动点击直播除外
                // console.log('用户点击了回顾')
                return false;
            }

            if (playObj) {
                this.setPubInfo(playObj)
            }
            //todo
            $.ajax({
                type: 'get',
                url: this.api.getClassSrc + cid,
                dataType: "jsonp",
                success: function(data) {
                    if (data.code == '0') {
                        //_this.videoSrc = data.data.playUrl2;
                        var vhallPlayBackId = '';
                        if (typeof(data.data.vhallPlayBackId) != "undefined" && data.data.vhallPlayBackId != '' && data.data.vhallPlayBackId != null) {
                            vhallPlayBackId = '&rid=' + data.data.vhallPlayBackId
                        }
                        var url = "http://e.vhall.com/webinar/inituser/" + data.data.vhallActivityId + '?name=' + encodeURI(data.data.name) + '&email=' + data.data.vhallEmail + '&embed=video&k=' + data.data.vhallAuthKey + vhallPlayBackId;
                        _this.videoSrc = url;
                        //  console.log('自动播放' + cid)
                    }

                }
            });
        },
        setTime: function(n, d, fn, fd) {
            var bed = n + ' ' + $.trim(d).split("-")[0];
            var end = n + ' ' + $.trim(d).split("-")[1];
            bed = bed.replace(/-/g, '/');
            end = end.replace(/-/g, '/')

            var nd = new Date(bed).getTime();
            if (fn) {
                nd = fn;
            }
            var ed = new Date(end).getTime();
            if (fd) {
                ed = fd
            }
            return nd + '-' + ed;
        },
        openhbfun() {
            this.qianghb = false;
            this.openhb = true;
        },
        hbInterface(item) {
            if (!this.loginInfo.islogin) { // 如果没有deng
                this.dologin();
                return false;
            }
            if(!this.stage3) {
                this.failMsg = '亲，11日0点准时开抢！';
                this.failTcType = '';
                this.errTip = true;
                return false;
            }
            $.ajax({
                url: this.api.checkoutWallet,
                data: { userid: this.loginInfo.userid },
                dataType: 'jsonp',
                success: data => {
                    if (data.respCode == '0') {
                        $.ajax({
                            url: this.api.getHB,
                            dataType: 'jsonp',
                            data: {
                                service: 'receive_red_packet',
                                redpacket_id: item.id,
                                receive_user_id: this.loginInfo.userid,
                                access_channel: 'wap'
                            },
                            success: data => {
                                console.log(data)
                                // this.hbSucObj.name = 'xxx';
                                // this.hbSucObj.amount = '222';
                                // this.hbSuccess = true;
                                if (data.respCode == 'T' && data.result.success) {
                                    // this.hbSucObj.name = item.teacherName;
                                    this.hbSucObj.amount = data.result.receive_amount;
                                    this.hbShow = true;
                                    this.hbSuccess = true;
                                } else {

                                    this.hbShow = false; // 隐藏红包弹窗
                                    this.hbSuccess = false;
                                    this.tcType = '';
                                    this.failMsg = data.respData || data.result.error_message;
                                    this.failTcType = '';
                                   if (data.result.error_code == "REDPACKET_END") {
                                        this.failMsg = '本轮红包已抢完，下个整点继续抢！';
                                    }
                                    this.errTip = true; // 打开失败提示
                                }
                            }
                        })
                    } else {
                        // console.log('您需要先开通钱包才可以抢红包');
                        this.hbShow = false; // 隐藏红包弹窗
                        this.errTip = true; // 打开失败提示
                        this.failTcType = 'walletNot';
                        this.failMsg = '您需要先开通钱包才可以抢红包';
                    }
                }
            })

            let dplus_data = {
                "页面名称": "双十一专题页",
                "页面标题": "双11钜惠，赢战新牛市",
                "页面类型": "营销活动页",
                "事件类别": "体验",
                "体验类型": "互动",
                "事件功能": "抢红包",
                "功能分类": "优惠券领取",
                "所属平台": "培训平台",
                "优惠类型": "红包",
                "优惠计划ID": this.hbObj.id,
                "产品分类": "视频课堂",
                "价格区间": "10元以下",
                "PLATFORM": "H5",
                "发布日期": "20171106"
            };
            console.log(dplus_data)
            dplus_Click("点击事件", dplus_data);


        },
        getInterface(item, type, dplus_info, click_type) {
            let dplus_data;
            if (!this.loginInfo.islogin) { // 如果没有deng
                // console.log('请去登陆');
                this.dologin();
                return false;
            }

            // if (!this.stage2) { // 如果是第一阶段
            //     // console.log('第一阶段不许点')
            //     return false;
            // }
            $.ajax({
                url: this.api.getCoupon,
                data: {
                    "publishUserType": "0",
                    "couponType": type,
                    "publishUser": "",
                    "planid": item.id,
                    "userid": this.loginInfo.userid,
                    "platform": "h5"
                },
                dataType: 'jsonp',
                success: data => {
                    this.djqShow = false; // 接口返回成功
                    if (data.respCode == '0') {
                        // 领取代金券OK
                        // console.log('领取卷OK')
                        this.djqSucShow = true;
                        this.djqSucMsg = data.result.planname;

                        if (type == 'CASH_COUPON') {
                            this.djqSucMsg = '50元全场通用代金券';
                        }

                    } else {
                        this.failMsg = data.respMgs || data.errorMgs;
                        this.failTcType = '';
                        this.errTip = true; // 打开失败提示

                    }
                }
            })

            if (dplus_info) {
                dplus_data = {
                    "页面名称": "双十一专题页",
                    "页面标题": "双11钜惠，赢战新牛市",
                    "页面类型": "营销活动页",
                    "事件类别": "体验",
                    "事件功能": "领券",
                    "功能分类": "优惠券领取",
                    "产品分类": "视频课堂",
                    "所属平台": "培训平台",
                    "合作者ID": dplus_info.pubTid,
                    "合作者名称": `${dplus_info.pubTname}(${dplus_info.pubTid})`,
                    "优惠计划ID": dplus_info.pubquanid,
                    "优惠计划名称": dplus_info.pubquanname,
                    "优惠类型": "折扣券",
                    "体验类型": "互动",
                    "价格区间": "10元以下",
                    "发布日期": "20171106",
                    "PLATFORM": "H5",
                    "类型": "互动"
                };

                if (click_type == 'pubClick') {

                }

                if (click_type == 'list_click') {
                    dplus_data['事件功能'] = '立即领券';
                    dplus_data['合作者ID'] = dplus_info.tid;
                    dplus_data['合作者名称'] = `${dplus_info.tname}(${dplus_info.tid})`;
                    dplus_data['优惠计划ID'] = dplus_info.qid;
                    dplus_data['优惠计划名称'] = `${dplus_info.tname}双11折扣券`;
                }

                if (click_type == 'djq_click') {
                    delete dplus_data['合作者ID'];
                    delete dplus_data['合作者名称'];
                    dplus_data['事件功能'] = '立即领取';
                    dplus_data['优惠类型'] = '代金券';
                    dplus_data['优惠计划ID'] = dplus_info.id;
                    dplus_data['优惠计划名称'] = `${dplus_info.price}元代金券`;
                }
                console.log(dplus_data)
                dplus_Click("点击事件", dplus_data);
            }


        },
        setVideoShow(val) {
            this.videoShow = val
        },
        setPubInfo(sub) {
            this.pubClassInfo.pubClassName = sub.theme;
            this.pubClassInfo.pubbuylink = sub.buyUrl;
            this.pubClassInfo.pubquanid = sub.id;
            this.pubClassInfo.pubTid = sub.teacherId;
            this.pubClassInfo.pubTname = sub.teacherName;
            this.pubClassInfo.pubquanname = sub.name;
            this.pubClassInfo.pubproductName = sub.productName;
            this.pubClassInfo.pubproductId = sub.productId;
            this.pubClassInfo.status = sub.status;
        },
        hrefLink(link, dplus) {
            console.log(link, dplus)
            dplus_Click("点击事件", dplus);
            setTimeout(() => {
                location.href = link
            }, 300);
        }
    }
}
</script>
<style lang='less' scoped>
.stage-two {
    height: 20rem;
    font-size: 2rem;
    line-height: 20rem;
    text-align: center;
}

.fixedTop {
    position: fixed;
    -webkit-overflow-scroll: touch;
    z-index: 8888;
    left: 0;
    top: 0;
}

.renqi-tab {
    margin-left: -0.03rem;
    font-size: 0;
    display: flex;
    justify-content: center;
    width: 100%;
}

.renqi-tab a {
    width: 1.86rem;
    margin-right: 0.02rem;
}


#zkq h2 {
    font-size: 0.5rem;
    padding-top: 4.8rem;
}

.marks {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    margin: auto;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 9999999999;
}
.hzz {
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    margin: auto;
}

.fail-lqsb {
    width: 6.34rem;
    height: 5.83rem;
    background: url(http://imgcd.hexun.com/win1111/h5/images/tc-lqcg.png) no-repeat;
    box-sizing: border-box;
    background-size: 6.34rem;
}
.fail-lqsb .txt h5 {
    padding: 0.33rem 0;
    font-size: 0.28rem;
}
.fail-lqsb .txt h2 {
    padding-top: 3rem;
    font-size: 0.4rem;
    font-weight: bold;
}
.fail-lqsb .txt {
    margin: 0 auto;
    text-align: center;
}

.fail-lqsb .btn {
    background: linear-gradient(#FF6A13, #FE451A);
    width: 3.62rem;

    padding: .22rem 0;
    border-radius: 100px;
    color: #fff;
    a {
        color: #fff;
    }
}
#zkq {
    background: url('../assets/images/zk-list.png') no-repeat center;
    background-size: 5.5rem;
    .name {
        padding-top: 1.5rem;
        font-size: .4rem;
    }
    .info {
        padding-top: .5rem;
        font-size: .5rem;
        .number {
            font-size: 2rem;
        }
    }
}

.djqsuccess {
    width: 7.5rem;
    height: 7.16rem;
    background: url('../assets/images/tc-lqzkq.png') no-repeat;
    box-sizing: border-box;
    background-size: 7.5rem;
    color: #fde535;
    text-align: center;

    h2 {
        font-size: 0.5rem;
        padding-top: 4.5rem;
    }
    h5 {
        font-size: 0.28rem;
        padding-top: 0.25rem;
    }
    .close {
        padding-right: 1.3rem;
    }
    .btn {
        padding-top: 1.2rem;
    }
    .btn a {
        display: inline-block;
        background: url('../assets/images/tc-zk.png') no-repeat;
        width: 4.55rem;
        height: 0.91rem;
        background-size: 4.55rem;
        line-height: 0.91rem;
        font-size: 0.4rem;
        color: #f94b16;
    }
}
.posrealtive {
    position: relative;
}
.close-hb {
    width: .55rem;
    margin: auto;
}
.courseList-header {
    display: flex;
    .img-box {
        width: 50px;
        height: 50px;
    }
    .content-box {
        flex: 1
    }
}
.absbottom {
    position: absolute;
    bottom: 0;
    margin: auto;
}
.tab-bg2 {
    background: url('../assets/images/tab-bg2.png') no-repeat;
    background-size: 7.1rem;
    width: 7.1rem;
    height: 0.6rem;
    max-width: 9.6rem;
}

.btn-gray-shadow {
    box-shadow: 0px 2px 5px #e8e8e8;
}

.tabCon {
    border-radius: 6px;
    background: #fff;
    padding: 0 0.1rem 15px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
}
.ft38 {
    font-size: 0.38rem;
}
.ft40 {
    font-size: 0.4rem;
}

.listCon p {
    line-height: 0.42rem;
    font-size: 0.28rem;
}
.flex-pack-around {
    justify-content: space-around;
}
.closeslateY {
    display: block;
    width: 0.61rem;
    height: 0.61rem;
    margin: auto;
    transform: translateY(1rem);
}
.mess-zk {
    top: 10%;
}
.ftLarge {
    font-size: .7rem;
}
.gxhb-txtBak {
    width: 4.13rem;
    padding-left: 1rem;
}
.gxhb-txtBak h5 {
    padding-bottom: 0.6rem;
}
.gxhb-txtBak a {
    text-decoration: underline;
}
</style>