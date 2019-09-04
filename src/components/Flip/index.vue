<template>
    <div class="flip">
        <template v-if="options.hasToggleBtn">
            <div ignore="1" class="flip_btn prev" @click="handleTurn('previous')">prev</div>
            <div ignore="1" class="flip_btn next" @click="handleTurn('next')">next</div>
        </template>
        <div class="flip_book">
            <slot>
                <!-- 举例内容 -->
                <div class="flip_page first">page 1</div>
                <div class="flip_page">page 2</div>
                <div class="flip_page">page 3</div>
                <div class="flip_page">page 4</div>
                <div class="flip_page">page 5</div>
                <div class="flip_page">page 6</div>
            </slot>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
import '@/lib/turn.min.js';
export default {
    data() {
        return {
            currentPage: 1,
            triggerClicking: false,
            options: {
                width: 800,
                height: 600,
                display: 'single',
                // 时间间隔
                duration: 1800,
                // 倾斜角度
                inclination: 50,
                // 默认有左右切换按钮
                hasToggleBtn: true,
                when: {
                    // 翻页
                    turning: (event, page, pageObj) => {
                        // console.log(event, page, pageObj);
                        // console.log("the current page is " + page);
                        this.currentPage = page;
                    },
                    // triggered before turned
                    first: () => {
                        this.$emit('start');
                    },
                    // triggered before turned
                    last: () => {
                        this.$emit('end');
                    }
                }
            }
        }
    },
    props: {
        flipOptions: {
            type: Object,
            default: () => { }
        }
    },
    watch: {
        // 监听当前页码
        currentPage(val) {
            // console.log("currentPage = ", val);
            this.$emit('changePage', val);
        },
    },
    mounted() {
        // 合并自定义options
        if (this.flipOptions && Object.keys(this.flipOptions).length) {
            Object.keys(this.flipOptions).forEach(n => {
                this.options[n] = this.flipOptions[n];
            });
        }
        $('.flip_book').turn(this.options);
    },
    methods: {
        handleTurn(direction) {
            this.triggerClicking = true;
            $('.flip_book').turn(direction);
        },
    }
}
</script>
<style lang="less">
@import './index.less';
</style>
