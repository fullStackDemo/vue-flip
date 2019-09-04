<template>
    <div id="app">
        <div :style="{height: boxHeight + 'px'}" class="box">
            <div class="boxLeft">
                <div class="logo">
                    <img alt="Vue logo" src="./assets/logo.png">
                </div>
                <h3>Vue component</h3>
                <div class="navBox">
                    <div :class="{'active': currentNavName == item.name}" :key="index" @click="tabClick(item)" class="navItem" v-for="(item, index) in menuData">{{item.name}}</div>
                </div>
            </div>
            <div class="boxRight">
                <div :is="currentComponent"></div>
            </div>
        </div>
    </div>
</template>

<script>
//left menu data
import menuData from '@data/menu.js';
import { mapMutations } from 'vuex';
export default {
    name: 'app',
    data() {
        return {
            boxHeight: 0,
            menuData,
        };
    },
    computed: {
        currentNavName: function () {
            const nav = this.$store.state.nav;
            return nav ? nav : this.menuData[0].name;
        },
        currentComponent: function () {
            const data = this.menuData.find(n => n.name == this.$store.state.nav);
            return data ? data.component : this.menuData[0].component;
        },
    },
    mounted() {
        this.calcHeight();
        //window resize
        window.addEventListener('resize', () => {
            this.calcHeight();
        });
    },
    created() { },
    methods: {
        ...mapMutations(['setNav', 'setNum']),
        calcHeight() {
            this.boxHeight = window.innerHeight;
        },
        tabClick(item) {
            this.currentComponent = item.component;
            this.currentNavName = item.name;
            this.setNav(item.name);
            this.setNum(1);
        },
    },
};
</script>

<style lang="less">
@import "~@less/index.less";
</style>
