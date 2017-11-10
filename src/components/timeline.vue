<template>
    <div>
        <section class="time flex flex-pack-center">
            <a href="javascript:void(0)" class="arrowL"><img src="http://imgcd.hexun.com/win1111/h5/images/arrowL.png"></a>
            <div class="timebarWrap timelinediv">
                <ul class="timeHdMy timeHd">
                    <li v-for='(item,index) in timeline.data' :key='index' class='timeHdLi'>
                        <h4 v-if="item.state=='preview'||item.state=='next'">{{item.time.substr(11,5)}}</h4>
                        <h4 v-if="item.state=='present'">进行中</h4>
                        <h4 v-if="item.state=='will'">即将开始</h4>
                        <p v-if="item.state=='preview'">{{item.name}}</p>
                        <p v-if="item.state=='present'" class="bg-yel">{{item.name}}</p>
                        <p v-if="item.state=='will'" class="bg-red">{{item.name}}</p>
                        <p v-if="item.state=='next'" class="bg-blue">{{item.name}}</p>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>
<script>
import urlConfig from '../api/index.js'
export default {

    data() {
        return {
            canScroll: false,
            timeline: {
                serverTime: null,
                data: []
            }
        }
    },
    created() {
        $.ajax({
            url: 'http://apicaidao.hexun.com/activity/timeline',
            dataType: 'jsonp',
            success: data => {
                // console.log(new Date(data.data.time).Format('yyyy-MM-dd hh:mm:ss'));
                if (data.data.time && data.data.time < 1510156800000) {
                    this.timeline.data = data.data.data;
                    if (this.getQueryString('testnow')) {
                        this.timeline.serverTime = $.DateUtil.parse(this.getQueryString('testnow'), 'YYYYMMDDhhmmss').getTime();
                    } else {
                        this.timeline.serverTime = data.data.time;
                    }
                    this.$nextTick(() => {
                        if (this.timeline.serverTime < 1509984000000) {
                            let wid = ((this.timeline.data.length - 1) * 94 + 120) + 'px';
                            $('.timeHdMy').css('width', wid);

                            this.timeline.data.forEach((item, index) => {
                                if (item.time.length != 16) {
                                    item.time = new Date(this.timeline.serverTime).Format('yyyy/MM/dd') + ' ' + item.time;
                                }
                                if (index == 0) {
                                    this.timeline.data[index].state = 'will';
                                } else {
                                    this.timeline.data[index].state = 'next';
                                }
                            })
                        } else {
                            this.checkDataArr(this.timeline.serverTime);
                            setInterval(() => {
                                this.canScroll = new Date(this.timeline.serverTime).getSeconds() == 0 ? true : false;
                                this.timeline.serverTime += 1000;
                                this.timeline.data.forEach((item, index) => {
                                    if (item.time.length != 16) {
                                        item.time = new Date(this.timeline.serverTime).Format('yyyy/MM/dd') + ' ' + item.time;
                                    }

                                    if (index == 0 && Date.parse(item.time) - this.timeline.serverTime >= 0) {
                                        item.state = 'will';
                                    }

                                    if (index > 0 && (Date.parse(new Date(item.time)) - this.timeline.serverTime) >= (this.getTimeLen(item.time, this.timeline.data[index - 1].time) - 1800000)) {
                                        item.state = 'next';
                                    }
                                    if ((this.timeline.serverTime - Date.parse(new Date(item.time))) >= 0 && (this.timeline.serverTime - Date.parse(new Date(item.time))) <= 1800000) {
                                        item.state = 'present';
                                    }
                                    if (index > 0 && (Date.parse(new Date(item.time)) - this.timeline.serverTime) >= 0 && (Date.parse(new Date(item.time)) - this.timeline.serverTime) <= (this.getTimeLen(item.time, this.timeline.data[index - 1].time) - 1800000)) {
                                        item.state = 'will';
                                    }
                                    if ((this.timeline.serverTime - Date.parse(new Date(item.time))) >= 1800000) {
                                        item.state = 'preview';
                                    }
                                    if (this.timeline.serverTime - Date.parse(new Date(item.time)) >= 0 && this.timeline.serverTime - Date.parse(new Date(item.time)) < 1800000) {
                                        if (index < (this.timeline.data.length - 3)) {
                                            // $('.timeHdMy').stop().animate({ left: (-94 * index - 13) + 'px' }, 1000);
                                            if (this.canScroll) {
                                                $('.timelinediv').scrollLeft(-(-94 * index - 13));
                                            }

                                        } else {
                                            // $('.timeHdMy').stop().animate({ left: (-94 * (this.timeline.data.length - 3) - 13) + 'px' }, 1000);
                                            if (this.canScroll) {
                                                $('.timelinediv').scrollLeft(-(-94 * (this.timeline.data.length - 3) - 13))
                                            }

                                        }
                                    }
                                    if (index < (this.timeline.data.length - 1) && this.timeline.serverTime - Date.parse(new Date(item.time)) >= 1800000 && this.timeline.serverTime - Date.parse(new Date(item.time)) < this.getTimeLen(this.timeline.data[index + 1].time, item.time)) {
                                        if (index < (this.timeline.data.length - 3)) {
                                            // $('.timeHdMy').stop().animate({ left: (-94 * (index + 1) - 13) + 'px' }, 1000);
                                            if (this.canScroll) { $('.timelinediv').scrollLeft(-(-94 * (index + 1) - 13)); }
                                        } else {
                                            // $('.timeHdMy').stop().animate({ left: (-94 * (this.timeline.data.length - 3) - 13) + 'px' }, 1000);
                                            if (this.canScroll) { $('.timelinediv').scrollLeft(-(-94 * (this.timeline.data.length - 3) - 13)); }
                                        }
                                    }
                                    if (index == (this.timeline.data.length - 1)) {
                                        if ((this.timeline.serverTime - Date.parse(new Date(item.time)) >= 1800000) || (this.timeline.serverTime - Date.parse(new Date(item.time)) > 0 && this.timeline.serverTime - Date.parse(new Date(item.time)) < 1800000)) {
                                            // $('.timeHdMy').stop().animate({ left: (-94 * (this.timeline.data.length - 3) - 13) + 'px' }, 1000);
                                            if (this.canScroll) { $('.timelinediv').scrollLeft(-(-94 * (this.timeline.data.length - 3) - 13)); }
                                        }

                                    }
                                });
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
    mounted() {},
    updated() {},
    methods: {
        getTimeLen(now, preTime) {
            return Date.parse(new Date(now)) - Date.parse(new Date(preTime));
        },
        checkDataArr(serverTime) {
            let wid = ((this.timeline.data.length - 1) * 94 + 120) + 'px';
            $('.timeHdMy').css('width', wid);
            this.timeline.data.forEach((item, index) => {
                if (item.time.length != 16) {
                    item.time = new Date(this.timeline.serverTime).Format('yyyy/MM/dd') + ' ' + item.time;
                }
                if (index == 0 && Date.parse(item.time) - serverTime >= 0) {
                    item.state = 'will';
                }

                if (index > 0 && (Date.parse(new Date(item.time)) - serverTime) >= (this.getTimeLen(item.time, this.timeline.data[index - 1].time) - 1800000)) {
                    item.state = 'next';
                }
                if ((serverTime - Date.parse(new Date(item.time))) >= 0 && (serverTime - Date.parse(new Date(item.time))) <= 1800000) {
                    item.state = 'present';
                }
                if (index > 0 && (Date.parse(new Date(item.time)) - serverTime) >= 0 && (Date.parse(new Date(item.time)) - serverTime) <= (this.getTimeLen(item.time, this.timeline.data[index - 1].time) - 1800000)) {
                    item.state = 'will';
                }
                if ((serverTime - Date.parse(new Date(item.time))) >= 1800000) {
                    item.state = 'preview';
                }
                if (this.timeline.serverTime - Date.parse(new Date(item.time)) >= 0 && this.timeline.serverTime - Date.parse(new Date(item.time)) < 1800000) {
                    if (index < (this.timeline.data.length - 3)) {
                        // $('.timeHdMy').stop().animate({ left: (-94 * index - 13) + 'px' }, 1000);

                        $('.timelinediv').scrollLeft(-(-94 * index - 13));
                    } else {
                        // $('.timeHdMy').stop().animate({ left: (-94 * (this.timeline.data.length - 3) - 13) + 'px' }, 1000);
                        $('.timelinediv').scrollLeft(-(-94 * (this.timeline.data.length - 3) - 13))
                    }

                }

                if (this.timeline.serverTime - Date.parse(new Date(item.time)) >= 1800000) {
                    if (index < (this.timeline.data.length - 3)) {
                        // $('.timeHdMy').stop().animate({ left: (-94 * (index + 1) - 13) + 'px' }, 1000);
                        $('.timelinediv').scrollLeft(-(-94 * (index + 1) - 13));
                    } else {
                        // $('.timeHdMy').stop().animate({ left: (-94 * (this.timeline.data.length - 3) - 13) + 'px' }, 1000);
                        $('.timelinediv').scrollLeft(-(-94 * (this.timeline.data.length - 3) - 13));
                    }
                }

            });
        },
        getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
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
}

.timeHdMy {
    display: inline-flex;
    position: relative;
    max-width: 600% !important;
    p {
        line-height: 58px;
        padding-top: 0;
        padding-bottom: 0;
    }
}
</style>