<template>
    <div>
        <section class="time flex flex-pack-center">
            <a href="javascript:void(0)" class="arrowL"><img src="http://imgcd.hexun.com/win1111/h5/images/arrowL.png"></a>
            <div class="timebarWrap" ref="timeLineDiv">
                <ul class="timeHd clearfix" ref="timeLineUL" :width="timeLineULWidth">
                    <li v-for='(item,index) in formatData' :key='index'>
                        <h4>{{item.time || item.startTime}}</h4>
                        <p class="bg-blue">{{item.name}}</p>
                        <p v-if="false" :class="item.class">{{item.name}}</p>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>
<script>
import urlConfig from '../api/index.js'
export default {
    props: ['show', 'api'],
    data() {
        return {
            serverTime: '', // 服务器时间
            data: [], // 时间轴数据
            diffMin: 30, // 预备开始时间30分 
            timeLineULWidth: null, // 时间周长度
            ingUnit: [], // 当前进行的单元
            willUnit: [], // 将要开始
            noUnit: [], // 没有开始
            leftinit: 0, // 滚动条
            isTimeGo: 0, // 倒计时是否已经跑起来
            time20171111000000: 1510329600000,
        }
    },
    watch: {
        data: {
            deep: true,
            handler() {
                this.$nextTick(() => {
                    this.setWidth()
                })
            }
        },
        serverTime(val) {
            this.$emit('timeRun', val);

            if (new Date(val).Format('hhmmss') == '000000') {
                if (this.query.testnow) {
                    this.query.testnow = new Date(val).Format('yyyyMMddhhmmss');
                }
                setTimeout(() => {
                    this.getTimeLine()
                }, 500)

            }

            console.log("测试环境--当前服务器时间："+new Date(val).Format('yyyy/MM/dd hh:mm:ss'));
        },
        ingUnit(val, oldVal) {
            // this.move(val[0]);
        },
    },
    computed: {
        formatData() {
            let obj = this.data;
            let serverTimeInt1000 = this.timeToS(this.serverTime);
            let time = new Date(this.serverTime).Format('yyyy/MM/dd');


            obj.forEach((item, index) => {
                if (item.time) { // 如果没有开始时间， 那么开始时间即是结束时间
                    let yytime = time + ' ' + item.time;
                    item.timestr = new Date(yytime).getTime();
                    item.willTimeStr = item.timestr - this.timeDiff;
                    item.startTimestr = item.timestr;
                    item.endTimeStr = item.timestr;

                }
                if (item.startTime) {
                    let yytime = time + ' ' + item.startTime;
                    item.startTimestr = new Date(yytime).getTime();
                    item.willTimeStr = item.startTimestr - this.timeDiff;
                }

                if (item.endTime) {
                    let yytime = time + ' ' + item.endTime;
                    item.endTimeStr = new Date(yytime).getTime();
                }
                if (serverTimeInt1000 <= this.timeToS(item.endTimeStr) && serverTimeInt1000 >= this.timeToS(item.startTimestr)) { //   进行中
                    item.class = "bg-yel";
                    item.showText = "进行中"
                    this.addIngUnit(index);
                } else if (serverTimeInt1000 < this.timeToS(item.startTimestr) && serverTimeInt1000 > this.timeToS(item.willTimeStr)) { // 将要开始
                    item.class = "bg-red";
                    item.showText = "即将开始"
                    this.delIngUnit(index);
                } else if (serverTimeInt1000 < this.timeToS(item.willTimeStr)) { // 还未开始
                    this.delIngUnit(index);
                    item.showText = item.time || item.startTime;
                    item.class = "bg-blue"
                } else {
                    item.class = "";
                    item.showText = "已结束";
                    this.delIngUnit(index);
                }
            })

            return obj;
        },
        timeDiff() { // 时间差
            return this.diffMin * 60 * 1000;
        },
    },
    created() {
        this.getTimeLine()
    },
    filters: {

    },
    mounted() {},
    updated() {
        this.setWidth()
    },
    methods: {
        getTimeLine() {
            let url = this.api.timeLine;
            let time = "";
            if (this.query.testnow) {
                time = $.DateUtil.parse(this.query.testnow, 'YYYYMMDDhhmmss').getTime();

                url = url + '?time=' + new Date(time).Format('yyyy-MM-dd')
            }
            $.ajax({
                url: url,
                dataType: 'jsonp',
                success: res => {
                    // 接口访问成功
                    if (res.code == 0) {

                        let data = res.data;
                        
                        if(data.time >= this.time20171111000000) {
                            data.data = data.data.map((item, index, arr) => {
                                item.startTime = item.time;

                                if(index != arr.length - 1) {
                                    item.endTime = arr[index + 1].time
                                } else {
                                    item.endTime = '24:00'
                                }
                                
                                return item
                            })
                        }
                        this.serverTime = data.time;
                        this.data = data.data;
                        if (this.query.testnow) {
                            this.serverTime = time
                        }
                    } else {
                        if (this.query.testnow) {
                            this.serverTime = time
                        } else {
                            this.getTime()
                        }
                    }
                    
                    this.timeRun()                 
                },
            });
        },
        timeRun() {
            // 服务器时间走起来 c 
            if (this.isTimeGo) {
                return false;
            }
            if(this.serverTime) {
                setInterval(() => {
                    this.isTimeGo = true;
                    this.serverTime += 1000
                }, 1000);
            }  
        },
        getTime() {
           $.ajax({
                url: this.api.getTime,
                dataType: 'jsonp',
                success: res => {
                    if(res.code == 0) {
                        this.serverTime = res.data;
                        this.timeRun() 
                    }
                },
            });
        },
        move(index) {
            this.$nextTick(() => {
                let dom = this.$refs.timeLineDiv;
                let $dom = $(dom);
                let unitLang = dom.getElementsByTagName('li')[0].getBoundingClientRect().width;
                let timer = setInterval(() => {
                    if (this.leftinit < unitLang * index) {
                        this.leftinit++
                            $dom.scrollLeft(this.leftinit)
                    } else {
                        clearInterval(timer)
                    }
                }, 5)
            })
        },
        // 添加进行中数组
        addIngUnit(index) {
            if (this.ingUnit.indexOf(index) <= -1) {
                this.$emit('timeLineChange', this.data[index])
                this.ingUnit.push(index); // 加入进行中
            }
        },
        // 删除进行中数组
        delIngUnit(index) {
            let i = this.ingUnit.indexOf(index);
            if (i > -1) {
                this.ingUnit.splice(i, 1)
            }
        },
        timeToS(str) {
            return parseInt(str / 1000)
        },
        setWidth() {
            if (this.show && this.data.length > 0) {
                this.timeLineULWidth = this.$refs.timeLineUL.getElementsByTagName('li')[0].getBoundingClientRect().width * this.data.length;
                this.$refs.timeLineUL.style.width = this.timeLineULWidth + 'px';
            }

        }
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
}
.timebarWrap {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    position: relative;
}
.timeHd {

    position: relative;
}
</style>