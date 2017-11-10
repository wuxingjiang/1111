<template>
    <div class="stage-one">
        <article class="main">
            <article class="pb2rem">
                <p class="tit1"><img src="http://imgcd.hexun.com/win1111/h5/images/pair_04.png"></p>
                <time-line></time-line>
                <p class="tit-djs" v-if='djsShow&&!activityEnd'>{{activityName}}</p>
                <p class="tit-djs" v-if='!djsShow&&!activityEnd'>{{activityNameIng}}</p>
                <!--活动进行中 s-->
                <p v-if='!djsShow&&!willEnd' class="tit-djs tit-djs-yel">活动进行中...</p>
                <div v-if='djsShow&&!willEnd' class="djs clearfix">
                    <span class="num">{{djsObj.hour}}</span><span class="hour">时</span><span class="num">{{djsObj.mins}}</span><span class="hour">分</span><span class="num">{{djsObj.seconds}}</span><span class="hour">秒</span>
                </div>
                <p v-if='!djsShow&&willEnd' class="tit-djs tit-djs-yel">今天活动已全部结束！</p>
                <p class="txt-r hdgz" @click="showHDGZ()">活动规则</p>
                <!-- 听课券  无老师id -->
                <div class="swiper-container wrapPl" v-if='tkqShow'>
                    <ul class="yhq clearfix swiper-wrapper" v-if='isGoingOn'>
                        <li :class='{on:item.amount>0}' class='swiper-slide' v-for='(item,index) in tkqArr' :key='index' @click="getInterface(item,'EXPERIENCE_COUPON')">
                            <h4 class="blue">{{item.teacherName}}5天听课券</h4>
                            <div class="yhq-txt">
                                <p>
                                    <del>价值{{item.price}}</del>
                                </p>
                                <p>剩余<span class="red">{{item.amount}}</span>张</p>
                            </div>
                        </li>
                    </ul>
                    <ul class="yhq clearfix" v-else>
                        <a v-for='(item,index) in tkqArr' :key='index'>
                            <li @click='showFailTc'>
                                <h4 class="blue">{{item.teacherName}}5天听课券</h4>
                                <div class="yhq-txt">
                                    <p>
                                        <del>价值{{item.price}}</del>
                                    </p>
                                    <p v-if='willBegin'>剩余<span class="red">{{item.amount}}</span>张</p>
                                    <p v-if='!willBegin'>剩余<span class="red">0</span>张</p>
                                </div>
                            </li>
                        </a>
                    </ul>
                </div>
                <!--听课券  有老师id  s-->
                <div class="wrap" v-if='tkqIdShow'>
                    <div class="teacherInfo">
                        <div class="row1 clearfix">
                            <p class="t-pic fl">
                                <img :src="teacherTkqInfo.imgUrl" @click='jumpToTeac(teacherTkqInfo)'></p>
                            <div class="fl pl10 width82">
                                <h4 class="ft32" @click='jumpToTeac(teacherTkqInfo)'><strong>{{teacherTkqInfo.className}}</strong></h4>
                                <h5 class="fc_6 ft24 pt10">授课时间：{{teacherTkqInfo.duration}}</h5>
                            </div>
                        </div>
                        <p class="ft32 pt30"><strong>课程简介</strong></p>
                        <div class="infoTxt">
                            <p>{{teacherTkqInfo.intro1}}</p>
                            <p>{{teacherTkqInfo.intro2}}</p>
                            <p>{{teacherTkqInfo.intro3}}</p>
                            <p>{{teacherTkqInfo.intro4}}</p>
                            <p>{{teacherTkqInfo.intro5}}</p>
                            <p>{{teacherTkqInfo.intro6}}</p>
                        </div>
                        <a v-if='isGoingOn&&teacherTkqInfo.amount>0' @click="getInterface(teacherTkqInfo,'EXPERIENCE_COUPON')">
                            <div class="lq">
                                <p class="pt50 ft24">{{teacherTkqInfo.teacherName}}5天听课券</p>
                                <div class="clearfix t-sy">
                                    <p class="fl">
                                        <del>原价{{teacherTkqInfo.price}}元</del>
                                    </p>
                                    <p class="fr">剩余<span class="red">{{teacherTkqInfo.amount}}</span>张</del>
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a @click='showFailTc' v-if='!isGoingOn||teacherTkqInfo.amount<=0'>
                            <div class="lq lq-gray">
                                <p class="pt50 ft24">{{teacherTkqInfo.teacherName}}5天听课券</p>
                                <div class="clearfix t-sy">
                                    <p class="fl">
                                        <del>原价{{teacherTkqInfo.price}}元</del>
                                    </p>
                                    <p v-if='willBegin' class="fr">剩余<span class="red">{{teacherTkqInfo.amount}}</span>张</del>
                                    </p>
                                    <p v-if='!willBegin' class="fr">剩余<span class="red">0</span>张</del>
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <!--老师的领券 e-->
                <!--折扣券  无老师id s-->
                <div class="wrapPl" v-if='zkqShow'>
                    <ul class="yhq clearfix zkList" v-if='isGoingOn'>
                        <a href="javascript:void(0)" v-for='(item,index) in zkqArr' :key='index'>
                            <li>
                                <div class="liBg">
                                    <h4 class="yellow">{{item.teacherName}}折扣券</h4>
                                    <p class="ft34"><span class="ft80 yellow">{{item.discount}}</span>折</p>
                                    <p class="pt2rem">剩余<span class="yellow">{{item.amount}}</span>张</p>
                                </div>
                                <p class="btn margin03" v-if='item.amount>0' @click="getInterface(item,'DISCOUNT_COUPON')"><a><img src="http://imgcd.hexun.com/win1111/h5/images/qiang-small.png"></a></p>
                                <p v-else class="margin03"><a href="javascript:void(0)"><img src="http://imgcd.hexun.com/win1111/h5/images/qiang-small-gray.png"></a></p>
                            </li>
                        </a>
                    </ul>
                    <ul class="yhq clearfix zkList" v-else>
                        <a href="javascript:void(0)" v-for='(item,index) in zkqArr' :key='index'>
                            <li>
                                <div class="liBg">
                                    <h4 class="yellow">{{item.teacherName}}折扣券</h4>
                                    <p class="pt20 ft34"><span class="ft80 yellow">{{item.discount}}</span>折</p>
                                    <p v-if='willBegin' class="pt15">剩余<span class="yellow">{{item.amount}}</span>张</p>
                                    <p v-if='!willBegin' class="pt15">剩余<span class="yellow">0</span>张</p>
                                </div>
                                <!-- qiang-small-gray -->
                                <p class="margin03" @click='showFailTc'><a href="javascript:void(0)"><img src="http://imgcd.hexun.com/win1111/h5/images/qiang-small-gray.png"></a></p>
                            </li>
                        </a>
                    </ul>
                </div>
                <!--折扣券列表 e-->
                <!--折扣券 有老师id s-->
                <div class="wrap" v-if='zkqIdShow'>
                    <div class="teacherInfo">
                        <div class="row1 clearfix">
                            <p class="t-pic fl">
                                <img :src="teacherZkqInfo.imgUrl" @click='jumpToTeac(teacherZkqInfo)'></p>
                            <div class="fl pl10 width82">
                                <h4 class="ft32" @click='jumpToTeac(teacherZkqInfo)'><strong>{{teacherZkqInfo.className}}</strong></h4>
                                <h5 class="fc_6 ft24 pt10">授课时间：{{teacherZkqInfo.duration}}</h5>
                            </div>
                        </div>
                        <p class="ft32 pt30"><strong>课程简介</strong></p>
                        <div class="infoTxt">
                            <p>{{teacherZkqInfo.intro1}}</p>
                            <p>{{teacherZkqInfo.intro2}}</p>
                            <p>{{teacherZkqInfo.intro3}}</p>
                            <p>{{teacherZkqInfo.intro4}}</p>
                            <p>{{teacherZkqInfo.intro5}}</p>
                            <p>{{teacherZkqInfo.intro6}}</p>
                        </div>
                        <div class="zk">
                            <p class="pt60 yellow">{{teacherZkqInfo.teacherName}}折扣券</p>
                            <p class="pt30 ft34"><span class="ft80 yellow">{{teacherZkqInfo.discount}}</span>折</p>
                            <p class="pt20" v-if='isGoingOn&&teacherZkqInfo.amount>0'>剩余<span class="yellow">{{teacherZkqInfo.amount}}</span>张</p>
                            <p class="pt20" v-if='(!isGoingOn||teacherZkqInfo.amount<=0)&&!willBegin'>剩余<span class="yellow">0</span>张</p>
                            <p class="pt20" v-if='(!isGoingOn||teacherZkqInfo.amount<=0)&&willBegin'>剩余<span class="yellow">{{teacherZkqInfo.amount}}</span>张</p>
                            <p class="btn pt20" @click="getInterface(teacherZkqInfo,'DISCOUNT_COUPON')" v-if='isGoingOn&&teacherZkqInfo.amount>0'><a><img src="http://imgcd.hexun.com/win1111/h5/images/teacher-btn.png"></a></p>
                            <p class="btn pt20" @click='showFailTc' v-if='!isGoingOn||teacherZkqInfo.amount<=0'><a href="javascript:void(0)"><img src="http://imgcd.hexun.com/win1111/h5/images/teacher-btn-gray.png"></a></p>
                        </div>
                    </div>
                </div>
                <!--老师的折扣券 e-->
                <!--代金券 s-->
                <div class="wrap" v-show='djqShow'>
                    <div class="djq djq-fixed clearfix">
                        <div class="tab-tgz-b fr djqwid22">
                            <dl>
                                <dt>
                                    <div v-show='isGoingOn&&djqObj.amount>0' class="zb_q" id="myStat1" data-dimension="80" data-text="" data-info="" data-width="6" data-fontsize="14" data-percent="0" data-fgcolor="#cc0001" data-bgcolor="#eee">
                                    </div>
                                    <div v-show='(!isGoingOn||djqObj.amount<=0)&&willBegin' class="zb_q" id="myStatWill" data-dimension="80" data-text="" data-info="" data-width="6" data-fontsize="14" data-percent="0" data-fgcolor="#cc0001" data-bgcolor="#eee">
                                    </div>
                                    <div v-show='(!isGoingOn||djqObj.amount<=0)&&!willBegin' class="zb_q" id="myStatOver" data-dimension="80" data-text="" data-info="" data-width="6" data-fontsize="14" data-percent="100" data-fgcolor="#cc0001" data-bgcolor="#eee">
                                    </div>
                                    <div class="white txt-c circle-txt djq-div">
                                        <p class='djq-p1'><span id="bfb-num">剩余</span></p>
                                        <p class='djq-p2' v-if='isGoingOn&&djqObj.amount>0'>{{djqObj.amount}}张</p>
                                        <p class='djq-p2' v-if='(!isGoingOn||djqObj.amount<=0)&&willBegin'>1000张</p>
                                        <p class='djq-p2' v-if='(!isGoingOn||djqObj.amount<=0)&&!willBegin'>0张</p>
                                    </div>
                                </dt>
                            </dl>
                            <p class="djq-btn"><a @click="getInterface(djqObj,'CASH_COUPON')" v-if='isGoingOn&&djqObj.amount>0'>立即领取</a><a class='djq-btn-gray' href="javascript:void(0)" @click='showFailTc' v-if='!isGoingOn||djqObj.amount<=0'>立即领取</a></p>
                        </div>
                    </div>
                </div>
                <!--代金券 e-->
                <!--红包 s-->
                <div class='redPacket' v-if='hbShow'>
                    <div class="wait-hb qiang-hb" v-if='isGoingOn&&!hbSuccess&&!hbOver'>
                        <a @click="hbInterface(hbObj)" class="qiang-a"></a>
                        <p class="white kt-txt">注：必须已开通&nbsp;<a href="https://reg.hexun.com/h5/mywallet.aspx" class="yellow" @click='openWalletNow'>和讯钱包</a></p>
                    </div>
                    <div class="wait-hb" v-if='!isGoingOn&&!hbSuccess&&!hbOver'>
                        <p class="white kt-txt">注：必须已开通&nbsp;<a href="https://reg.hexun.com/h5/mywallet.aspx" class="yellow" @click='openWalletNow'>和讯钱包</a></p>
                    </div>
                    <div class="wait-hb gx-hb txt-c white" v-if='isGoingOn&&hbSuccess&&!hbOver'>
                        <div class="gxhb-txtBak">
                            <p class="ft36 gx">恭喜您获得现金红包</p>
                            <h5 class="ft28"><span class="yellow ftLarge">{{hbSucObj.amount}}</span>元</h5>
                            <a class='yellow' href="https://mepay.hexun.com/my/home.htm">请到个人钱包查看</a>
                            <span class='nextInfo'>欢迎下个整点继续抢</span>
                            <!-- <h6 class="white txt-c pt15 ft28">关注“和讯投资” 参加幸运抽奖</h6> -->
                        </div>
                    </div>
                    <div class="wait-hb gx-hb" v-if='!isGoingOn&&hbOver'>
                        <div class="gxhb-txt white txt-c">
                            <h4 class="ft32 qw-txt">本次红包已抢完</h4>
                            <!-- TODO  s-->
                            <h5 class="pt20 ewmTxt">关注二维码获取更多资讯</h5>
                            <div class="ewm"><img src="http://imgcd.hexun.com/win1111/h5/images/ewm.jpg"></div>
                            <!-- TODO  e-->
                        </div>
                    </div>
                </div>
                <!--红包 e-->
                <p class='notLogin' v-if='!this.loginInfo.islogin' @click='toLogin'>【立即登录】</p>
            </article>
        </article>
        <!--领券成功 s-->
        <div class="mess hide closeslateY" id="lqcg">
            <div class="txt">
                <h2>恭喜您</h2>
                <h5>成功领取{{successTC.planname}}</h5>
                <p v-if="tcType=='tkq'" class="btn pb40"><a href="http://caidao.hexun.com/home/lesson/index.html">去听课</a></p>
                <p v-if="tcType=='zkq'" class="btn pb40"><a href="http://caidao.hexun.com/home/coupons/index.html">去查看</a></p>
                <p v-if="tcType=='djq'" class="btn pb40"><a href="http://caidao.hexun.com/home/coupons/index.html">去查看</a></p>
            </div>
            <p class="clearfix"><i class="close-gz close-gzB" @click="closeTc('lqcg')"><img src="http://imgcd.hexun.com/win1111/h5/images/close.png"></i></p>
        </div>
        <!--领券成功 e-->
        <!--领券失败 s-->
        <div class="mess hide closeslateY" id="lqsb">
            <div class="txt">
                <h2>很遗憾</h2>
                <h5>{{failTC.errorMsg}}</h5>
                <p v-if="failTcType==''" class="btn pb40" @click="closeTc('lqsb')"><a href="javascript:void">确定</a></p>
                <p v-if="failTcType=='walletNot'" class="btn pb40"><a href="https://reg.hexun.com/h5/mywallet.aspx" @click='openWalletNow'>立即开通</a></p>
                <!-- <p v-if="failTcType=='hasGot'" class="btn"><a href="http://test.wechat.hexun.com/mine/lottery.html">参与抽奖</a></p> -->
            </div>
            <p class="clearfix"><i class="close-gz close-gzB" @click="closeTc('lqsb')"><img src="http://imgcd.hexun.com/win1111/h5/images/close.png"></i></p>
        </div>
        <!--领券失败 e-->
        <!--活动规则 s-->
        <div class="mess mess-gz hide closeslateY" id='hdgz'>
            <div class='whiteBac'>
                <div id="tc-gz">
                    <div class="txt">
                        <p class='red textCenter'>和讯双十一优惠券使用规则</p>
                        <p>听课券：领券后进入该老师工作室听课；每位用户最多可抢3张，每位老师限抢1次，仅可领取未购买老师听课券。</p>
                        <p>折扣券：领券后可以券面折扣购买课程，每位老师限抢1次；使用期间为11月9日至11月11日。</p>
                        <p>代金券：领券后购课立减，每位用户限抢1次；与折扣券叠加使用时先折后减，使用期间为11月9日至11月11日。</p>
                        <p>现金红包：需先开通和讯钱包，可与任何券叠加使用，无使用期限限制。</p>
                    </div>
                </div>
            </div>
            <p class="clearfix"><i class="close-gz close-gzB" @click="closeTc('hdgz')"><img src="http://imgcd.hexun.com/win1111/h5/images/close.png"></i></p>
        </div>
        <!--活动规则 e-->
        <div class="mask"></div>
    </div>
</template>
<script>
import urlConfig from '../api/index.js'
import timeline from '../components/timeline.vue'

export default {
    components: {
        'time-line': timeline,
    },
    data() {
        return {
            isLogin: false,
            serverTime: null,
            timePoint: [' 09:00', ' 10:00', ' 11:00', ' 12:00', ' 13:00', ' 14:00', ' 15:00', ' 16:00', ' 17:00', ' 18:00', ' 19:00', ' 20:00', ' 21:00'],
            dataList: [],
            successTC: { planname: '' },
            tcType: '',
            failTC: { errorMsg: '' },
            failTcType: '',
            teacherTkqInfo: {},
            teacherZkqInfo: {},
            teacherArr: [{
                    teacherId: '3764690',
                    name: '王者',
                    className: '《王者视频高级语音课》',
                    intro1: '1.剖析涨停个股K线强弱与形态规律，揭秘擒拿大牛股的10大方法。',
                    intro2: '2.结合黄金均线、5.20法则，寻找个股最佳操作法则，精准锁定买卖点。',
                    intro3: '3.近百个逃顶实战案例分析，传授头部永远不被套牢独家绝技。',
                    intro4: '',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课+周一、二、四、五语音课',
                    imgUrl: 'http://logo2.tool.hexun.com/d27139-75.jpg',
                },
                {
                    teacherId: '4128648',
                    name: '徐小明',
                    className: '《徐小明高级网络培训课程》',
                    intro1: '1.大盘及个股盘口语言全面解读，股市赢钱金钥匙精准掌握。',
                    intro2: '2.龙头股筛选及交易策略悉数公开，主升浪判定及实战技巧通盘揭露。',
                    intro3: '3.市场数字运行规律，走势波动原理深度发掘，数字化定量分析方法独家验证。',
                    intro4: '',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课+周一至周五语音课',
                    imgUrl: 'http://logo0.tool.hexun.com/88ff3e-75.jpg',
                },
                {
                    teacherId: '10780870',
                    name: '冯矿伟',
                    className: '《冯矿伟高级网络培训课程》',
                    intro1: '1.独家《双龙战法》，短线操作狙击热点机会。',
                    intro2: '2.买卖挂单暗藏玄机，深度解析盘口语言。',
                    intro3: '3.盘口语言实战应用，三大买入法抓准个股买点。',
                    intro4: '4.价格波动中洞察主力踪迹，判断主流资金的动向。',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课+周一至周五语音课',
                    imgUrl: 'http://logo2.tool.hexun.com/c680a4-75.jpg',
                },
                {
                    teacherId: '13798641',
                    name: '史月波',
                    className: '《史月波操盘手培训课程套餐》',
                    intro1: '1.行情解读：全方位解读当前市场环境及未来趋势。',
                    intro2: '2.战略布局：根据当前的政策热点及行业消息，挖掘当前市场的投资机会。',
                    intro3: '3.实战秘籍：史月波老师20年的实战经验及操作技法倾囊相授，让你跟高手实战的过程中不断提升自己的操盘水平。',
                    intro4: '',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课+周一、三、五语音课',
                    imgUrl: 'http://logo1.tool.hexun.com/f18cd2-75.jpg',
                },
                {
                    teacherId: '1037523',
                    name: '夏立军',
                    className: '《短线泰斗实战训练营》',
                    intro1: '1.涨停先锋缔造超短线奇迹，打板（涨停）密码首次公开。',
                    intro2: '2.揭秘龙虎榜背后蕴藏的神秘资金。',
                    intro3: '3.发现连续涨停股的追涨时机。',
                    intro4: '4.首次涨停股如何快速跟进。',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课+周二、三、四语音课',
                    imgUrl: 'http://logo3.tool.hexun.com/d3d40f-75.jpg',
                },
                {
                    teacherId: '19444494',
                    name: '财智人生',
                    className: '《金色池塘实战牛股套餐》',
                    intro1: '1.大盘涨跌判断，大环境预测（资金面，基本面，政策面）。',
                    intro2: '2.板块及个股的实战分析及案例分享。',
                    intro3: '3.阶段性仓位控制的实施方法。',
                    intro4: '4.各项技术的实战运用解析。',
                    intro5: '5.不同盈利模式的创建基础（周收益及年收益模式）。',
                    intro6: '6.交易心态及思维方式的形成。',
                    duration: '盘中VIP文字课+周一、二、四语音课',
                    imgUrl: 'http://logo2.tool.hexun.com/10eb328-75.jpg',
                },
                {
                    teacherId: '5528397',
                    name: '王笑涨',
                    className: '《实盘互动套餐》',
                    intro1: '1. 实战型波段交易理念，非多非空波段取胜。',
                    intro2: '2. 独家“量价定乾坤”精准判断指数牛熊转换。',
                    intro3: '3. 主题投资倡导者，深度讲解如何提前发现潜在热点。',
                    intro4: '4. 涨停实战绝技，解析涨停前三大绝密走势特征。',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课+周二、三、四语音课',
                    imgUrl: 'http://logo1.tool.hexun.com/4d5b54-75.jpg',
                },
                {
                    teacherId: '25595646',
                    name: '数字江恩',
                    className: '《股知道系列课程套餐》',
                    intro1: '1.波浪、太极理论中西合璧，《股知道》揭秘价格波动本相。',
                    intro2: '2.技术派分析先知先觉，透过市场抓准中短线机会。',
                    intro3: '3.坚持趋势结构为王，操盘风格随趋势变化见机切换。',
                    intro4: '',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课+周一至周五语音课',
                    imgUrl: 'http://logo2.tool.hexun.com/1fe8e86-75.jpg',
                },
                {
                    teacherId: '8009581',
                    name: '凯恩斯',
                    className: '《凯恩斯高级网络培训课》',
                    intro1: '1.读懂公司成长价值，破解优势牛股四大条件，寻找3年10倍的暴涨股。',
                    intro2: '2.运用时间周期研判,公开准确率高达九成的抄底逃顶夺命秘诀，习得5年15倍的盈利模式。',
                    intro3: '',
                    intro4: '',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课+周一至周五语音课',
                    imgUrl: 'http://logo1.tool.hexun.com/6d377a-75.jpg',
                },
                {
                    teacherId: '18858362',
                    name: '陈晨',
                    className: '《东方红陈晨高级网络培训课程》',
                    intro1: '1.实战擒牛绝技，强势股回调低吸技巧。',
                    intro2: '2.揭秘资金背后的神秘面纱，以防掉进资金流向陷阱。',
                    intro3: '3.独立原创研发多套实战量化方法，建立专属短线交易系统。',
                    intro4: '',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课+周一至周五语音课',
                    imgUrl: 'http://logo2.tool.hexun.com/17ac11f-75.jpg',
                },
                {
                    teacherId: '12950098',
                    name: '令狐大侠',
                    className: '《股市赢家VIP套餐》',
                    intro1: '1.市场最热风向走势，龙头热点一手擒获。',
                    intro2: '2.个股量价换手异动，买入卖出了然于胸。',
                    intro3: '3.实战操盘交易手册，独家绝招全面网罗。',
                    intro4: '',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课+周一、三、五语音课',
                    imgUrl: 'http://logo2.tool.hexun.com/529ac5-75.jpg',
                },
                {
                    teacherId: '19436939',
                    name: '魏宁海',
                    className: '《天地人网络实盘课》',
                    intro1: '1.每日指标解盘，潜力个股提前布控。',
                    intro2: '2.免费盘中指导，热点板块深度分析。',
                    intro3: '',
                    intro4: '',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课+周一至周五语音课',
                    imgUrl: 'http://logo3.tool.hexun.com/18b9528-75.jpg',
                },
                {
                    teacherId: '4157532',
                    name: '五域论湛',
                    className: '《金股博弈VIP文字课程》',
                    intro1: '1.揭秘真正的K线组合语言，知晓主力意图。',
                    intro2: '2.独家“3J法则”，挖掘主升浪大牛股。',
                    intro3: '3.专业投资技能分享，解析专业股和强力股的选股模型。',
                    intro4: '',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课+周一、三、五语音课',
                    imgUrl: 'http://logo0.tool.hexun.com/5c703f-75.jpg',
                },
                {
                    teacherId: '20327092',
                    name: '大愚和尚',
                    className: '《陈亮持续稳定获利套餐》',
                    intro1: '1.由浅入深、循序渐进介绍大波段中孕育的短线赚钱机会。',
                    intro2: '2.结合盘面走势，全面传授股市资本风云变化规律及保持稳定盈利不二法门。',
                    intro3: '3.历经牛熊变化，纵观多年起伏跌宕，亲身分享决定成败的炒股心态和制胜经验。',
                    intro4: '',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课+周一至周五语音课',
                    imgUrl: 'http://px.hexun.com/ClassImages/20161017-093323-023.png',
                },
                // {
                //     teacherId: 27256454,
                //     name: '祁海波',
                //     className: '《祁开得胜强者恒强套餐》',
                //     intro1: '1.判断大盘量价时空关系,揭示风向变化。',
                //     intro2: '2.洞察个股资金进出情况，捕捉投资先机。',
                //     intro3: '3.总结四维周期循环方法，集锦常胜规律。',
                //     intro4: '',
                //     intro5: '',
                //     intro6: '',
                //     duration: '盘中VIP文字课+周一至周四语音课',
                //     imgUrl: 'http://logo2.tool.hexun.com/186e69f-75.jpg',
                // },
                {
                    teacherId: '14702045',
                    name: '趋势巡航',
                    className: '趋势巡航VIP文字课堂',
                    intro1: '1.根据量能判别主力动向，揭露主力操盘意图。',
                    intro2: '2.踏准市场节奏，精准预测大底、大底的方法，踏准市场节奏。',
                    intro3: '3.紧随趋势变化，提前潜伏短线爆发金股。',
                    intro4: '4.详解主力建仓技巧，资金流向，紧抓买卖点。',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课',
                    imgUrl: 'http://logo1.tool.hexun.com/dd55e0-75.jpg',
                },
                {
                    teacherId: '20424636',
                    name: '宇辉战舰',
                    className: '宇辉战舰VIP文字课堂',
                    intro1: '1.中长线波段选股绝技大公开。',
                    intro2: '2.压力支撑点位精准分析。',
                    intro3: '3.T+0高抛低吸技巧独家秘透。',
                    intro4: '4.各行情仓位配置全明确。',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课',
                    imgUrl: 'http://logo0.tool.hexun.com/1bca737-75.jpg',
                },
                {
                    teacherId: '29117221',
                    name: '叶展超',
                    className: '叶展超VIP文字课堂',
                    intro1: '1.盘中对板块及个股的实战及案例进行讲解分析。',
                    intro2: '2.指导各项技术的实战运用，阶段性仓位控制的实施方法。',
                    intro3: '3.强化交易心态及思维方式。',
                    intro4: '',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课',
                    imgUrl: 'http://logo1.tool.hexun.com/1254bbc-75.jpg',
                },
                {
                    teacherId: '9722279',
                    name: '隐者',
                    className: '隐者333VIP文字课堂',
                    intro1: '1.量、价、时间三者合一，追踪主力蛛丝马迹。',
                    intro2: '2.关注“成长+价值”板块，挖掘市场中长线投资机会。',
                    intro3: '3.主力建仓手法详解，踏准市场节奏。',
                    intro4: '4.谨慎原则，跟随主力资金做波段。',
                    intro5: '',
                    intro6: '',
                    duration: '盘中VIP文字课',
                    imgUrl: 'http://logo3.tool.hexun.com/a75994-75.jpg',
                },
                {
                    teacherId: '22080099',
                    name: '王雪伟',
                    className: '王雪伟VIP课堂',
                    intro1: '1.教你如何把握趋势和均线金叉买入和均线死叉卖出。',
                    intro2: '2.教你如何根据周期判断大盘趋势。',
                    intro3: '3.教你如何在弱市中根据时间空间量能把握超跌。',
                    intro4: '4.教你如何判断主力吸筹 洗盘 拉升阶段。',
                    intro5: '5.教你根据板块启动规律抓龙头。',
                    intro6: '',
                    duration: '盘中VIP文字课',
                    imgUrl: 'http://logo3.tool.hexun.com/163ea50-75.jpg',
                }
            ],
            teacher_info_dplus: [{
                    tcid: '3764690',
                    tcname: '跑赢大盘的王者',
                    productid: '6000463',
                    productname: '王者双十一活动体验套餐',
                },
                {
                    tcid: '4128648',
                    tcname: '徐小明',
                    productid: '6000464',
                    productname: '徐小明双十一活动体验套餐',
                },
                {
                    tcid: '10780870',
                    tcname: '冯矿伟',
                    productid: '6000465',
                    productname: '冯矿伟双十一活动体验套餐',
                },
                {
                    tcid: '13798641',
                    tcname: '史月波高控盘',
                    productid: '',
                    productname: '史月波操盘手培训课程套餐',
                },
                {
                    tcid: '1037523',
                    tcname: '首席夏立军',
                    productid: '6000467',
                    productname: '夏立军双十一活动体验套餐',
                },
                {
                    tcid: '19444494',
                    tcname: '财智人生的博客',
                    productid: '6000450',
                    productname: '双十一活动财智人生体验套餐',
                },
                {
                    tcid: '5528397',
                    tcname: '王笑涨',
                    productid: '6000451',
                    productname: '双十一活动王胡子体验套餐',
                },
                {
                    tcid: '25595646',
                    tcname: '数字江恩',
                    productid: '6000452',
                    productname: '双十一活动数字江恩体验套餐',
                },
                {
                    tcid: '8009581',
                    tcname: '凯恩斯',
                    productid: '',
                    productname: '凯恩斯高级网络培训课套餐',
                },
                {
                    tcid: '18858362',
                    tcname: '东方红陈晨',
                    productid: '6000466',
                    productname: '东方红陈晨双十一活动体验套餐',
                },
                {
                    tcid: '12950098',
                    tcname: '令狐大侠V',
                    productid: '6000445',
                    productname: '双十一活动令狐冲甲体验套餐',
                },
                {
                    tcid: '19436939',
                    tcname: '魏宁海',
                    productid: '6000448',
                    productname: '双十一活动魏宁海体验套餐',
                },
                {
                    tcid: '4157532',
                    tcname: '五域论湛',
                    productid: '',
                    productname: '五域论湛套餐',
                },
                {
                    tcid: '20327092',
                    tcname: '大愚和尚',
                    productid: '',
                    productname: '大愚和尚陈亮持续稳定获利套餐',
                },
                {
                    tcid: '14702045',
                    tcname: '趋势巡航',
                    productid: '6000446',
                    productname: '双十一活动趋势巡航体验套餐',
                },
                {
                    tcid: '20424636',
                    tcname: '宇辉战舰',
                    productid: '',
                    productname: '宇辉战舰VIP文字课堂',
                },
                {
                    tcid: '29117221',
                    tcname: '叶展超财富俱乐部直播室',
                    productid: '6000447',
                    productname: '双十一活动叶展超体验套餐',
                },
                {
                    tcid: '9722279',
                    tcname: '隐者333',
                    productid: '6000453',
                    productname: '双十一活动隐者333体验套餐',
                },
                {
                    tcid: '22080099',
                    tcname: '王雪伟',
                    productid: '6000449',
                    productname: '双十一活动王雪伟体验套餐',
                }
            ],
            tkqArr: [{ amount: null, }],
            zkqArr: [{ amount: null, }],
            djqObj: { id: null, amount: null, percent: 0 },
            hbObj: {},
            hbSucObj: {},
            teacherId: null,
            activityName: '',
            activityNameIng: '',
            djsShow: false,
            hbSuccess: false,
            hbOver: false,
            isGoingOn: false,
            willEnd: false,
            tkqIdShow: false,
            tkqShow: false,
            hbShow: false,
            zkqShow: false,
            zkqIdShow: false,
            djqShow: false,
            djsObj: { hour: '00', mins: '00', seconds: '00' },
            djsNum: 0,
            willBegin: false,
            canSwiper: false,
            activityEnd: false,
            actEnd10M: false,
        }
    },
    created() {
        this.teacherId = this.getQueryString('tid');
        let ajaxUrl = 'http://apicaidao.hexun.com/activity/timeline';
        if (this.teacherId) {
            ajaxUrl = 'http://apicaidao.hexun.com/activity/timeline?teacherId=' + this.teacherId;
        }
        $.ajax({
            url: ajaxUrl,
            dataType: 'jsonp',
            success: data => {
                if (data.data.time && data.data.time < 1510156800000) {
                    this.dataList = data.data.data;
                    if (this.getQueryString('testnow')) {
                        this.serverTime = $.DateUtil.parse(this.getQueryString('testnow'), 'YYYYMMDDhhmmss').getTime();
                    } else {
                        this.serverTime = data.data.time;
                    }
                    this.$nextTick(() => {

                        if (this.serverTime < 1509984000000) {
                            this.djsShow = true;
                            this.showFirstAct();
                            setInterval(() => {
                                $('.yhq').css('width', (2.95 * this.dataList[0].data.length + 0.15) + 'rem');
                                if (new Date(this.serverTime).Format('hh/mm/ss') == '00/00/00') {
                                    window.location.reload();
                                }
                                this.djsNum = this.secondToHms(1509984000000 - this.serverTime + 32400000);
                                this.serverTime += 1000;
                            }, 1000)
                        } else {
                            this.checkDataArr(this.serverTime);
                            this.changeAmountByRefresh(this.serverTime);
                            setInterval(() => {
                                if (this.serverTime < 1510156800000) {
                                    if (new Date(this.serverTime).Format('hh/mm/ss') == '00/00/00') {
                                        window.location.reload();
                                    }
                                }
                                if (this.serverTime >= Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + ' 21:30:00')) {
                                    this.activityEnd = true;
                                    this.tkqShow = false;
                                    this.tkqIdShow = false;
                                    this.zkqShow = false;
                                    this.zkqIdShow = false;
                                    this.djqShow = false;
                                    this.hbShow = false;
                                } else {
                                    this.activityEnd = false;
                                }
                                this.serverTime += 1000;
                                this.djsNum -= 1000;
                                this.checkDataArr(this.serverTime);
                                this.switchActiByTime(this.serverTime);
                                if (this.djsNum > 0) {
                                    this.secondToHms(this.djsNum);
                                } else {
                                    this.djsShow = false;
                                }
                            }, 1000)
                        }

                    })
                } else {
                    return false;
                }
            }
        })
    },
    filters: {

    },
    mounted() {
        $('#myStatOver').circliful();
        $('#myStatWill').circliful();
        $('canvas').css('width', '1.6rem');
        $('#myStatWill').css('width', '1.6rem');
        $('#myStatOver').css('width', '1.6rem');
        $('#myStat1').css('width', '1.6rem');
    },
    updated() {
        document.addEventListener("visibilitychange", () => {
            window.location.reload();
        });
    },
    methods: {
        showFailTc() {
            if (this.teacNotJoin || this.actEnd10M) {
                this.failTC.errorMsg = '该券已抢完，请关注下个时段的抢券活动';
                $('.mask').show();
                this.$emit('setVideoShow', false);
                $('#lqsb').show();
            }
            if (this.willBegin) {
                this.failTC.errorMsg = '亲，还没到抢券时间哦！整点开抢';
                $('.mask').show();
                this.$emit('setVideoShow', false);
                $('#lqsb').show();
            }

        },
        jumpToTeac(tInfo) {
            window.location.href = 'http://caidao.hexun.com/' + tInfo.teacherId + '/index.html';
        },
        openWalletNow() {
            dplus_Click("点击事件", {
                "事件类别": "非体验",
                "事件功能": "点此开通",
                "功能分类": "设置操作",
                "所属平台": "培训平台",
                "PLATFORM": "H5",
            });
        },
        closeTc(id) {
            $('#' + id).hide();
            this.$emit('setVideoShow', true);
            $('.mask').hide();
        },
        showHDGZ() {
            $('.mask').show();
            this.$emit('setVideoShow', false);
            $('#hdgz').show();
        },
        toLogin() {
            this.dologin();
        },
        showFirstAct() {
            this.willBegin = true;
            //听课券，区分是否带老师id
            if (this.dataList[0].type == 'tkq') {
                this.tkqIdShow = this.tkqShow = this.hbShow = this.zkqShow = this.zkqIdShow = this.djqShow = this.isGoingOn = false;
                if (this.teacherId && this.judgeIdInTeacherArr(this.dataList[0].data, this.teacherId).isIn) {
                    this.activityName = this.dataList[0].data[this.judgeIdInTeacherArr(this.dataList[0].data, this.teacherId).tIndex].teacherName + '听课券0元秒杀倒计时';
                    this.activityNameIng = this.dataList[0].data[this.judgeIdInTeacherArr(this.dataList[0].data, this.teacherId).tIndex].teacherName + '听课券0元秒杀';
                    this.teacherTkqInfo = $.extend({}, this.dataList[0].data[this.judgeIdInTeacherArr(this.dataList[0].data, this.teacherId).tIndex], this.teacherArr[this.judgeIdInTeacherArr(this.teacherArr, this.teacherId).tIndex]);
                    this.$nextTick(() => {
                        this.tkqIdShow = true;
                    })
                } else {
                    this.tkqShow = true;
                    this.activityName = '名师听课券0元秒杀倒计时';
                    this.activityNameIng = '名师听课券0元秒杀';
                    this.tkqArr = this.randomArr(parseInt(20 * Math.random() - 1), this.dataList[0].data);

                }
            }
            //折扣券，区分是否带老师id
            if (this.dataList[0].type == 'zkq') {
                this.tkqIdShow = this.tkqShow = this.hbShow = this.zkqShow = this.zkqIdShow = this.djqShow = this.isGoingOn = false;

                if (this.teacherId && this.judgeIdInTeacherArr(this.dataList[0].data, this.teacherId).isIn) {
                    this.activityName = this.dataList[0].data[this.judgeIdInTeacherArr(this.dataList[0].data, this.teacherId).tIndex].teacherName + '课程折扣券0元秒杀倒计时';
                    this.activityNameIng = this.dataList[0].data[this.judgeIdInTeacherArr(this.dataList[0].data, this.teacherId).tIndex].teacherName + '课程折扣券0元秒杀';
                    this.teacherZkqInfo = $.extend({}, this.dataList[0].data[this.judgeIdInTeacherArr(this.dataList[0].data, this.teacherId).tIndex], this.teacherArr[this.judgeIdInTeacherArr(this.teacherArr, this.teacherId).tIndex]);
                    this.$nextTick(() => {
                        this.zkqIdShow = true;
                    })
                } else {
                    this.activityName = '名师课程折扣券0元秒杀倒计时';
                    this.activityNameIng = '名师课程折扣券0元秒杀';
                    this.zkqShow = true;

                    this.zkqArr = this.randomArr(parseInt(20 * Math.random() - 1), this.dataList[0].data);
                }
            }
            // 代金券
            if (this.dataList[0].type == 'djq') {
                this.tkqIdShow = this.tkqShow = this.hbShow = this.zkqShow = this.zkqIdShow = this.isGoingOn = false;
                this.activityName = '50元全场通用代金券开抢倒计时';
                this.activityNameIng = '50元全场通用代金券';
                this.djqShow = true;
                this.djqObj.id = this.dataList[0].data.id;
                this.djqObj.amount = amountLeft;
                this.djqObj.percent = amountLeft == 0 ? 100 : (100 - Math.ceil(amountLeft / this.dataList[0].data.amount * 100)) + '';
                $('#myStat1')[0].attributes['data-percent'].nodeValue = this.djqObj.percent;
                $('#myStat1').circliful();
                $('canvas').css('width', '1.6rem');
                $('#myStatWill').css('width', '1.6rem');
                $('#myStatOver').css('width', '1.6rem');
                $('#myStat1').css('width', '1.6rem');
            }
            //红包
            if (this.dataList[0].type == 'hb') {
                this.activityName = '天降红包活动倒计时';
                this.activityNameIng = '天降红包活动';
                this.tkqIdShow = this.tkqShow = this.zkqShow = this.zkqIdShow = this.djqShow = this.isGoingOn = this.hbOver = false;
                this.hbShow = true;
                this.hbObj = this.dataList[0].data;
            }
        },
        hbInterface(item) {
            if (!this.loginInfo.islogin) { // 如果没有deng
                this.dologin();
                return false;
            }
            this.userid = this.loginInfo.userid;
            dplus_Click("点击事件", {
                "页面名称": "双十一专题页",
                "页面标题": "双11钜惠，赢战新牛市",
                "页面类型": "营销活动页",
                "事件类别": "体验",
                "事件功能": "抢红包",
                "功能分类": "优惠券领取",
                "产品分类": "视频课堂",
                "所属平台": "培训平台",
                "优惠类型": "红包",
                "体验类型": "互动",
                "价格区间": "10元以下",
                "发布日期": "20171106",
                "PLATFORM": "H5",
                "类型": "互动"
            });
            $.ajax({
                url: 'http://callvip.hexun.com/jsapi/order/wallet-isopened',
                dataType: 'jsonp',
                success: data => {
                    if (data.respCode == '0') {
                        $.ajax({
                            url: 'http://callvip.hexun.com/rpsapi/service',
                            dataType: 'jsonp',
                            data: {
                                service: 'receive_red_packet',
                                redpacket_id: item.id,
                                receive_user_id: this.userid,
                                access_channel: 'wap'
                            },
                            success: data => {
                                if (data.respCode == 'T' && data.result.success) {
                                    this.hbSucObj.name = item.teacherName;
                                    this.hbSucObj.amount = data.result.receive_amount;
                                    this.hbSuccess = true;
                                } else {
                                    this.hbSuccess = false;
                                    this.tcType = '';
                                    this.failTC.errorMsg = data.result.error_message;
                                    if (data.result.error_code == "REDPACKET_END") {
                                        this.hbOver = true;
                                        this.failTC.errorMsg = '红包已抢完，请关注后续活动!';
                                    } else {
                                        this.hbOver = false;
                                    }
                                    if (data.result.error_code == 'REDPACKET_RECEIVE_DUPLICATE') {
                                        $('#lqsb').show();
                                        this.$emit('setVideoShow', false);
                                        $('.mask').show();
                                        $('#lqsb .txt h2').css('padding-top', '2.8rem')
                                        // this.failTcType = 'hasGot';
                                        // this.failTC.errorMsg = '您已经抢过该红包了';
                                        return;
                                    }
                                    $('#lqsb').show();
                                    this.$emit('setVideoShow', false);
                                    $('.mask').show();
                                }
                            }
                        })
                    } else {
                        $('#lqsb').show();
                        this.$emit('setVideoShow', false);
                        $('.mask').show();
                        $('#lqsb .txt h2').css('padding-top', '2.8rem')
                        this.failTcType = 'walletNot';
                        this.failTC.errorMsg = '您需要先开通钱包才可以抢红包';
                    }
                }
            })

        },
        getInterface(item, type) {
            if (!this.loginInfo.islogin) { // 如果没有deng
                this.dologin();
                return false;
            }
            if (item.amount > 0) {
                if (type == 'DISCOUNT_COUPON') {
                    this.teacher_info_dplus.forEach((item1, index1) => {
                        if (item.teacherId == item1.tcid) {
                            dplus_Click("点击事件", {
                                "页面名称": "双十一专题页",
                                "页面标题": "双11钜惠，赢战新牛市",
                                "页面类型": "营销活动页",
                                "事件类别": "体验",
                                "事件功能": "领折扣券",
                                "功能分类": "优惠券领取",
                                "产品分类": "视频课堂",
                                "所属平台": "培训平台",
                                "合作者ID": item1.tcid,
                                "合作者名称": item1.tcname,
                                "优惠类型": "折扣券",
                                "体验类型": "互动",
                                "价格区间": "10元以下",
                                "发布日期": "20171106",
                                "PLATFORM": "H5",
                                "类型": "互动"
                            });

                        }
                    });
                }
                if (type == 'CASH_COUPON') {
                    dplus_Click("点击事件", {
                        "页面名称": "双十一专题页",
                        "页面标题": "双11钜惠，赢战新牛市",
                        "页面类型": "营销活动页",
                        "事件类别": "体验",
                        "事件功能": "领代金券",
                        "功能分类": "优惠券领取",
                        "产品分类": "视频课堂",
                        "所属平台": "培训平台",
                        "优惠类型": "代金券",
                        "体验类型": "互动",
                        "价格区间": "10元以下",
                        "发布日期": "20171106",
                        "PLATFORM": "H5",
                        "类型": "互动"
                    });
                }
                if (type == 'EXPERIENCE_COUPON') {
                    this.teacher_info_dplus.forEach((item1, index1) => {
                        if (item.teacherId == item1.tcid) {
                            dplus_Click("点击事件", {
                                "属性名": "听课券",
                                "事件功能": "领听课券",
                                "功能分类": "购买",
                                "页面名称": "双十一专题页",
                                "页面标题": "双11钜惠，赢战新牛市",
                                "页面类型": "营销活动页",
                                "事件类别": "体验",
                                "所属平台": "培训平台",
                                "合作者ID": item1.tcid,
                                "合作者名称": item1.tcname,
                                "产品ID": item1.productid,
                                "产品名称": item1.productname,
                                "产品分类": "视频课堂",
                                "体验类型": "付费",
                                "价格区间": "0元",
                                "发布日期": "20171106",
                                "PLATFORM": "H5"
                            });

                        }
                    });
                    $.ajax({
                        url: 'http://callvip.hexun.com/jsapi/right/getuserright',
                        dataType: 'jsonp',
                        data: {
                            productid: item.productId
                        },
                        success: data => {
                            if (data.respCode == '1') {
                                $.ajax({
                                    url: 'http://callvip.hexun.com/jsapi/coupon/receive',
                                    data: { "publishUserType": "0", "couponType": type, "publishUser": "", "planid": item.id, "platform": "h5" },
                                    dataType: 'jsonp',
                                    success: data => {
                                        if (data.respCode == '0') {
                                            item.amount = (item.amount - parseInt(10 * Math.random() + 1)) > 0 ? (item.amount - parseInt(10 * Math.random() + 1)) : 0;
                                            this.successTC = data.result;
                                            this.successTC.teacherId = item.teacherId;

                                            this.tcType = 'tkq';
                                            $.ajax({
                                                url: 'http://callvip.hexun.com/jsapi/order/freeorder-openright',
                                                dataType: 'jsonp',
                                                data: {
                                                    productId: item.groupId,
                                                    number: 1,
                                                    isOpenRight: 1,
                                                    isPackage: 1,
                                                    couponId: this.successTC.couponid,
                                                    couponMoney: 0,
                                                    conPlatform: 'h5'
                                                },
                                                success: data => {
                                                    if (data.respCode == '0') {
                                                        $('.mask').show();
                                                        this.$emit('setVideoShow', false);
                                                        $('#lqcg').show();
                                                    } else {
                                                        this.tcType = '';
                                                        this.failTC.errorMsg = data.errorMgs;
                                                        $('#lqsb').show();
                                                        this.$emit('setVideoShow', false);
                                                        $('.mask').show();
                                                    }

                                                }
                                            })

                                        } else {
                                            this.tcType = '';
                                            this.failTC.errorMsg = data.errorMgs;
                                            $('#lqsb').show();
                                            this.$emit('setVideoShow', false);
                                            $('.mask').show();
                                        }
                                    }
                                })
                            } else {
                                this.tcType = '';
                                this.failTC.errorMsg = '您已购买过该老师课程，不可再领取';
                                $('#lqsb').show();
                                this.$emit('setVideoShow', false);
                                $('.mask').show();
                            }
                        }
                    })
                } else {
                    $.ajax({
                        url: 'http://callvip.hexun.com/jsapi/coupon/receive',
                        data: { "publishUserType": "0", "couponType": type, "publishUser": "", "planid": item.id, "platform": "h5" },
                        dataType: 'jsonp',
                        success: data => {
                            if (data.respCode == '0') {
                                item.amount = (item.amount - parseInt(10 * Math.random() + 1)) > 0 ? (item.amount - parseInt(10 * Math.random() + 1)) : 0;
                                this.successTC = data.result;
                                this.successTC.teacherId = item.teacherId;
                                this.tcType = type == 'DISCOUNT_COUPON' ? 'zkq' : 'djq';
                                $('.mask').show();
                                $('#lqcg').show();
                                this.$emit('setVideoShow', false);
                            } else {
                                this.tcType = '';
                                this.failTC.errorMsg = data.errorMgs;
                                $('#lqsb').show();
                                this.$emit('setVideoShow', false);
                                $('.mask').show();
                            }
                        }
                    })
                }


            } else {
                item.amount = 0;
            }
        },
        judgeIdInTeacherArr(rootArr, tId) {
            let result = { isIn: false, tIndex: null };
            rootArr.forEach((item, index) => {
                if (item.teacherId == tId) {
                    result.isIn = true;
                    result.tIndex = index;
                }
            })
            return result;
        },
        changeAmountByRefresh(serverTime) {
            this.timePoint.forEach((item, index) => {
                let timeArgs;
                let timeArgsSec = (serverTime - Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) >= 0 && serverTime - Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) <= 1200000);
                let willBegin = (Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) - serverTime > 0 && Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) - serverTime < 1800000);
                if (index == 0) {
                    timeArgs = (serverTime < Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) + 1800000);
                } else {
                    timeArgs = (serverTime >= Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + this.timePoint[index - 1]) + 1800000 && serverTime < Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) + 1800000);
                }
                if (timeArgs) {
                    this.willBegin = willBegin;

                    //听课券，区分是否带老师id
                    if (this.dataList[index].type == 'tkq') {
                        this.tkqIdShow = this.tkqShow = this.hbShow = this.zkqShow = this.zkqIdShow = this.djqShow = this.isGoingOn = false;
                        if (timeArgsSec) {
                            this.isGoingOn = true;
                        }
                        if (this.teacherId && this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).isIn) {
                            this.tkqIdShow = true;

                            this.activityName = this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex].teacherName + '听课券0元秒杀倒计时';
                            this.activityNameIng = this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex].teacherName + '听课券0元秒杀';
                            this.teacherTkqInfo = $.extend({}, this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex], this.teacherArr[this.judgeIdInTeacherArr(this.teacherArr, this.teacherId).tIndex]);
                            this.teacherTkqInfo.amount = this.changeAmountByTime(item, this.teacherTkqInfo.amount, this.serverTime);


                        } else {
                            this.tkqShow = true;
                            this.activityName = '名师听课券0元秒杀倒计时';
                            this.activityNameIng = '名师听课券0元秒杀';
                            this.dataList[index].data.forEach((itemTkq, indexTkq) => {
                                itemTkq.amount = this.changeAmountByTime(item, itemTkq.amount, this.serverTime);
                            })
                            this.tkqArr = this.randomArr(parseInt(20 * Math.random() - 1), this.dataList[index].data);

                        }
                    }
                    //折扣券，区分是否带老师id
                    if (this.dataList[index].type == 'zkq') {
                        this.tkqIdShow = this.tkqShow = this.hbShow = this.zkqShow = this.zkqIdShow = this.djqShow = this.isGoingOn = false;
                        if (timeArgsSec) {
                            this.isGoingOn = true;
                        }
                        if (this.teacherId && this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).isIn) {
                            this.activityName = this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex].teacherName + '课程折扣券0元秒杀倒计时';
                            this.activityNameIng = this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex].teacherName + '课程折扣券0元秒杀';
                            this.teacherZkqInfo = $.extend({}, this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex], this.teacherArr[this.judgeIdInTeacherArr(this.teacherArr, this.teacherId).tIndex]);
                            this.teacherZkqInfo.amount = this.changeAmountByTime(item, this.teacherZkqInfo.amount, this.serverTime);
                            this.zkqIdShow = true;
                        } else {
                            this.activityName = '名师课程折扣券0元秒杀倒计时';
                            this.activityNameIng = '名师课程折扣券0元秒杀';
                            this.zkqShow = true;
                            this.dataList[index].data.forEach((itemZkq, indexZkq) => {
                                itemZkq.amount = this.changeAmountByTime(item, itemZkq.amount, this.serverTime);
                            })
                            this.zkqArr = this.randomArr(parseInt(20 * Math.random() - 1), this.dataList[index].data);
                        }
                    }
                    // 代金券
                    if (this.dataList[index].type == 'djq') {
                        this.tkqIdShow = this.tkqShow = this.hbShow = this.zkqShow = this.zkqIdShow = this.isGoingOn = false;
                        if (timeArgsSec) {
                            this.isGoingOn = true;

                        }
                        this.activityName = '50元全场通用代金券开抢倒计时';
                        this.activityNameIng = '50元全场通用代金券开抢';
                        this.djqShow = true;
                        let amountLeft = this.changeAmountByTime(item, this.dataList[index].data.amount, this.serverTime);
                        this.djqObj.id = this.dataList[index].data.id;
                        this.djqObj.amount = amountLeft;
                        this.djqObj.percent = amountLeft == 0 ? 100 : (100 - Math.ceil(amountLeft / this.dataList[index].data.amount * 100)) + '';
                        $('#myStat1')[0].attributes['data-percent'].nodeValue = this.djqObj.percent;
                        $('#myStat1').circliful();
                        $('canvas').css('width', '1.6rem');
                        $('#myStatWill').css('width', '1.6rem');
                        $('#myStatOver').css('width', '1.6rem');
                        $('#myStat1').css('width', '1.6rem');
                    }
                    //红包
                    if (this.dataList[index].type == 'hb') {
                        this.activityName = '天降红包活动倒计时';
                        this.activityNameIng = '天降红包活动';
                        this.tkqIdShow = this.tkqShow = this.zkqShow = this.zkqIdShow = this.djqShow = this.isGoingOn = false;
                        if (timeArgsSec) {
                            this.isGoingOn = true;
                            this.hbOver = false;
                            if (this.loginInfo.islogin) {
                                $.ajax({
                                    url: 'http://callvip.hexun.com/rpsapi/service',
                                    dataType: 'jsonp',
                                    data: {
                                        service: 'query_receive_detail',
                                        receive_user_id: this.loginInfo.userid,
                                        redpacket_id: this.dataList[index].data.id
                                    },
                                    success: data => {
                                        if (data.respCode == 'T' && data.result.success) {
                                            this.hbSucObj.name = this.dataList[index].data.teacherName;
                                            this.hbSucObj.amount = data.result.receive_amount;
                                            this.hbSuccess = true;
                                        }
                                    }
                                })
                            }

                        } else if (serverTime - Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) > 1200000 && serverTime - Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) <= 1800000) {
                            this.isGoingOn = false;
                            this.hbOver = true;
                        } else {
                            this.isGoingOn = false;
                            this.hbOver = false;
                        }
                        this.hbShow = true;
                        this.hbObj = this.dataList[index].data;
                    }
                }
            })
        },
        switchActiByTime(serverTime) {
            this.timePoint.forEach((item, index) => {
                let timeArgs;
                let timeArgsSec = (serverTime - Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) >= 0 && serverTime - Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) <= 1200000);
                let timeArgsThird = (serverTime - Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) > 1200000 && serverTime - Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) < 1800000);
                let willBegin = (Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) - serverTime > 0 && Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) - serverTime < 1800000);
                if (index == 0) {
                    timeArgs = (serverTime < Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) + 1800000);
                } else {
                    timeArgs = (serverTime >= Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + this.timePoint[index - 1]) + 1800000 && serverTime < Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) + 1800000);
                }
                if (timeArgs) {
                    this.willBegin = willBegin;
                    //听课券，区分是否带老师id
                    if (this.dataList[index].type == 'tkq') {
                        this.tkqIdShow = this.tkqShow = this.hbShow = this.zkqShow = this.zkqIdShow = this.djqShow = this.isGoingOn = false;
                        if (timeArgsSec) {
                            this.isGoingOn = true;
                            if (this.teacherId == '13798641' || this.teacherId == '8009581' || this.teacherId == '4157532' || this.teacherId == '20327092' || this.teacherId == '27256454' || this.teacherId == '20424636') {
                                this.teacNotJoin = true;
                            } else {
                                this.teacNotJoin = false;
                            }

                        }
                        if (timeArgsThird) {

                            this.actEnd10M = true;

                        } else {
                            this.actEnd10M = false;
                        }
                        if (this.teacherId && this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).isIn) {
                            this.activityName = this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex].teacherName + '听课券0元秒杀倒计时';
                            this.activityNameIng = this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex].teacherName + '听课券0元秒杀';
                            if (this.teacherId == '13798641' || this.teacherId == '8009581' || this.teacherId == '4157532' || this.teacherId == '20327092' || this.teacherId == '27256454' || this.teacherId == '20424636') {
                                this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex].amount = 0;
                            } else {
                                this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex].amount = this.teacherTkqInfo.amount || 1000;
                            }

                            this.teacherTkqInfo = $.extend(this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex], this.teacherArr[this.judgeIdInTeacherArr(this.teacherArr, this.teacherId).tIndex]);
                            // this.$nextTick(() => {
                            this.tkqIdShow = true;
                            // })
                        } else {
                            this.activityName = '名师听课券0元秒杀倒计时';
                            this.activityNameIng = '名师听课券0元秒杀';
                            $('.yhq').css('width', (2.95 * this.dataList[index].data.length + 0.15) + 'rem');
                            this.tkqShow = true;
                            this.tkqArr = this.dataList[index].data;


                        }
                    }
                    //折扣券，区分是否带老师id
                    if (this.dataList[index].type == 'zkq') {
                        this.tkqIdShow = this.tkqShow = this.hbShow = this.zkqShow = this.zkqIdShow = this.djqShow = this.isGoingOn = false;
                        if (timeArgsSec) {
                            this.isGoingOn = true;
                        }
                        if (timeArgsThird) {
                            this.actEnd10M = true;
                        } else {
                            this.actEnd10M = false;
                        }
                        if (this.teacherId && this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).isIn) {
                            this.activityName = this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex].teacherName + '课程折扣券0元秒杀倒计时';
                            this.activityNameIng = this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex].teacherName + '课程折扣券0元秒杀';
                            this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex].amount = this.teacherZkqInfo.amount || 1000;
                            this.teacherZkqInfo = $.extend(this.dataList[index].data[this.judgeIdInTeacherArr(this.dataList[index].data, this.teacherId).tIndex], this.teacherArr[this.judgeIdInTeacherArr(this.teacherArr, this.teacherId).tIndex]);
                            // this.$nextTick(() => {
                            this.zkqIdShow = true;
                            // })
                        } else {
                            this.activityName = '名师课程折扣券0元秒杀倒计时';
                            this.activityNameIng = '名师课程折扣券0元秒杀';

                            $('.yhq').css('width', (2.95 * this.dataList[index].data.length + 0.15) + 'rem');
                            this.zkqShow = true;
                            this.zkqArr = this.dataList[index].data;
                        }
                    }
                    // 代金券
                    if (this.dataList[index].type == 'djq') {
                        this.activityName = '50元全场通用代金券开抢倒计时';
                        this.activityNameIng = '50元全场通用代金券开抢';

                        this.tkqIdShow = this.tkqShow = this.hbShow = this.zkqShow = this.zkqIdShow = this.isGoingOn = false;
                        if (timeArgsSec) {
                            this.isGoingOn = true;
                        }
                        if (timeArgsThird) {
                            this.actEnd10M = true;
                        } else {
                            this.actEnd10M = false;
                        }
                        this.djqShow = true;
                    }
                    //红包
                    if (this.dataList[index].type == 'hb') {
                        this.activityName = '天降红包活动倒计时';
                        this.activityNameIng = '天降红包活动';
                        this.tkqIdShow = this.tkqShow = this.zkqShow = this.zkqIdShow = this.djqShow = this.isGoingOn = false;
                        if (timeArgsSec) {
                            this.isGoingOn = true;
                            this.hbOver = false;
                        } else if (serverTime - Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) > 1200000 && serverTime - Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + item) <= 1800000) {
                            this.isGoingOn = false;
                            this.hbOver = true;
                        } else {
                            this.isGoingOn = false;
                            this.hbOver = false;
                        }
                        this.hbShow = true;
                        this.hbObj = this.dataList[index].data;
                    }
                }
            })

        },
        changeAmountByTime(timePoint, oldAmount, serverTime) {
            let newAmount = oldAmount;
            let timeHasRun = serverTime - Date.parse(new Date(this.serverTime).Format('yyyy/MM/dd') + timePoint);
            if (timeHasRun - 1200000 >= 0) {
                newAmount = 0;
            } else if (timeHasRun == 0) {
                newAmount = oldAmount;
            } else if (timeHasRun > 0 && timeHasRun < 1190000) {
                newAmount = parseInt(parseInt((1 - timeHasRun / 1200000) * oldAmount) - (20 * Math.random())) > 0 ? parseInt(parseInt((1 - timeHasRun / 1200000) * oldAmount) - (10 * Math.random())) : 0;
            } else if (timeHasRun >= 1190000 && timeHasRun < 1200000) {
                newAmount = parseInt(parseInt((1 - timeHasRun / 1200000) * oldAmount) + (20 * Math.random()))
            }
            return newAmount;
        },
        checkDataArr(serverTime) {
            let timeArr = [];
            this.dataList.forEach((item, index) => {
                if (item.time.length != 16) {
                    item.time = new Date(this.serverTime).Format('yyyy/MM/dd') + ' ' + item.time;
                }
                if (index == 0) {
                    if (Date.parse(item.time) - serverTime > 0) {
                        this.djsNum = Date.parse(item.time) - serverTime;
                        this.djsShow = true;

                    }
                } else if (index < this.dataList.length - 1) {
                    if (Date.parse(item.time) - serverTime <= 1800000 && Date.parse(item.time) - serverTime >= 0) {
                        timeArr.unshift(this.dataList[index].time);
                        this.djsNum = Date.parse(timeArr[0]) - serverTime;
                        this.djsShow = true;
                    }
                }
                if (index == this.dataList.length - 1) {
                    if (Date.parse(item.time) - serverTime <= 1800000 && Date.parse(item.time) - serverTime >= 0) {
                        this.djsNum = Date.parse(this.dataList[index].time) - serverTime;
                        this.djsShow = true;
                    }
                    if (serverTime - Date.parse(item.time) >= 1800000) {
                        this.willEnd = true;
                        this.djsShow = false;
                    }
                }
            });
        },
        secondToHms(second) {
            let time = second / 1000;
            let h = Math.floor(time / 3600) == 0 ? '00' : Math.floor(time / 3600) + '';
            let m = Math.floor(time / 60 % 60) == 0 ? '00' : Math.floor(time / 60 % 60) + '';
            let s = Math.floor(time % 60) == 0 ? '00' : Math.floor(time % 60) + '';
            if (h != '00' && h < 10) {
                h = '0' + h;
            }
            if (m != '00' && m < 10) {
                m = '0' + m;
            }
            if (s != '00' && s < 10) {
                s = '0' + s;
            }
            this.djsObj.hour = h;
            this.djsObj.mins = m;
            this.djsObj.seconds = s;
        },
        getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        randomArr(num, arr) {
            let arrBak = [...arr];
            if (num <= arrBak.length - 1 && num >= 0) {
                arr.forEach((item, index) => {
                    if (num <= arrBak.length - 1) {

                        arr[index] = arrBak[num];
                        num++;
                    } else {
                        arr[index] = arrBak[num - arr.length];
                        num++;
                    }

                })
                return arr;
            } else {
                return arr;
            }
        },
    }
}
</script>
<style lang='less' scoped>
::-webkit-scrollbar {
    height: 0px;
}
 ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(255, 255, 255);
    border-radius: 10px;
}
 ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset 0 0 6px rgba(214, 214, 214, 0.1);
}
 ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(214, 214, 214, 0.1);
    height: 0px;
}
.wrapPl {
    position: relative;
    overflow-x: scroll;
    overflow-y: hidden;
    .yhq {
        width: 59rem;
    }
}
.lq, .lq-gray {
    margin: .3rem auto .35rem;
}
.lq-gray {
    background: url(http://imgcd.hexun.com/win1111/h5/images/teacher-q-gray.png) no-repeat;
    background-size: 6.47rem;
}
.djq-btn .djq-btn-gray {
    color: #a5a5a5;
    background: #e3e3e3;
}
.djq-p1 {
    width: 13vw;
}
.djq-p2 {
    width: 13vw;
}
.mask {
    z-index: 9999;
}
#lqcg, #hdgz {
    z-index: 10000;
}
#lqsb {
    z-index: 10000;
    width: 6.34rem;
    height: 5.83rem;
    background: url(http://imgcd.hexun.com/win1111/h5/images/tc-lqcg.png) no-repeat;
    box-sizing: border-box;
    background-size: 6.34rem;
}
#lqsb .txt h5 {
    padding: 0.3rem 0;
    font-size: 0.28rem;
    width: 80%;
    margin: 0 auto;
}
#lqsb .txt h2 {
    padding-top: 2.97rem;
    font-size: 0.4rem;
    font-weight: bold;
}
#lqsb .txt, #lqcg .txt {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    a {
        height: 40px;
        line-height: 40px;
    }
}
.yhq li h4 {
    line-height: 1.2;
    height: .7rem;
    padding-top: .4rem;
}
.yhq li .yhq-txt {
    padding: .85rem .05rem 0;
}
#zkq h2 {
    padding-top: 4.5rem;
}
.txt a {
    width: 3.62rem;
    height: 44px;
    display: inline-block;
    text-align: center;
    color: #fff;
    line-height: 44px;
    font-size: 14px;
    background: linear-gradient(#fe6914, #fe471a);
    border-radius: 44px;
}
.width82 {
    width: 82%;
}
.margin03 {
    margin-left: .16rem !important;
}
.pt2rem {
    padding-top: .2rem;
}
.notLogin {
    color: white;
    text-align: center;
    margin-top: .2rem;
}
.djqwid22 {
    width: 2.3rem;
    .zb_q {
        padding-left: .1rem;
    }
    dl {
        margin: 0;
    }
    dt .circle-txt {
        top: .8rem;
        left: .4rem;
    }
}
.kt-txt {
    font-size: .28rem;
}
.zk {
    margin: .2rem auto .3rem;
}
.swiper-slide {
    width: 2.8rem !important;
}

#hdgz {
    top: 21vh;
}
.whiteBac {
    background: white;
    height: 8rem;
    border-radius: 6px;
}
.textCenter {
    text-align: center;
}
#tc-gz .txt p {
    padding: .1rem 0;
}
.mess .close-gzB {
    margin: .2rem auto;
    display: block;
    width: 0.61rem;
    height: 0.61rem;
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
.nextInfo {
    display: inline-block;
    margin-top: .2rem;
}
</style>