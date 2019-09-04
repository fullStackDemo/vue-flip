<template>
	<div class="waterFallBox">
		<ul class="report_contaner">
			<li :key="index" :style="{width: itemWidth + 'px', height: item.height + 'px', left: item.left + 'px', top: item.top + 'px'}" class="report_item" v-for="(item, index) in listData">
				<div class="reportTitle">
					<span>{{item.name}}</span>
				</div>
				<div class="reportDetail" v-html="item.text"></div>
			</li>
		</ul>
	</div>
</template>

<script>
import assumData from './data.js';
export default {
	name: 'Waterfall',
	data() {
		return {
			// column: 3, //列数
			boxWidth: null, //parent box宽度
			itemWidth: null, //child box宽度
			space: 10, //间歇距离
			fontSize: 14,
			lineHeight: 1.5,
			assumData,
			listData: [],
		};
	},
	props: {
		data: {
			type: Array,
			default: () => {},
		},
		keyword: {
			type: String,
			default: '',
		},
		column: {
			type: Number,
			default: 3,
		},
	},
	watch: {
		data: {
			handler: function(data) {
				this.listData = data.slice(0);
				this.calcData();
			},
			deep: true,
		},
	},
	created() {
		if (this.data) {
			this.listData = this.data;
		} else {
			this.listData = this.assumData;
		}
	},
	filters: {
		getDate: function(val) {
			return val.substr(0, 10);
		},
	},
	mounted() {
		this.calcWidth();
		this.calcData();
		//window resize
		window.addEventListener('resize', () => {
			this.calcWidth();
			this.calcData();
		});
	},
	methods: {
		calcWidth() {
			const boxWidth = document.getElementsByClassName('waterFallBox');
			this.boxWidth = boxWidth[0].clientWidth - 20;
			this.itemWidth = Math.floor((this.boxWidth - this.space * (this.column - 1)) / this.column);
		},
		calcData() {
			//计算高度
			const colHeightArr = []; //记录每列高度
			const newData = this.listData.slice(0);
			newData.forEach((n, i) => {
				const new_hit_text = this.getText(n.text);
				//判断所处第几行
				const line = Math.ceil((i + 1) / this.column);
				//根据字体个数大概判断内容高度
				//一行大概多少个字
				const oneLineNumber = Math.floor(this.itemWidth / this.fontSize);
				//大概多少行
				const allLineCount = Math.ceil(n.text.length / oneLineNumber);
				//大概内容高度
				const hasBrLen = new_hit_text ? new_hit_text.split('br').length - 1 : 0;
				const itemHeight = 36 + 20 + (allLineCount + hasBrLen) * (this.fontSize * this.lineHeight);
				n.height = itemHeight;
				n.text = new_hit_text;
				// console.log('>>>>>', oneLineNumber, allLineCount, itemHeight);
				//计算left
				//当前行 item索引
				const currentItemIndex = i - (line - 1) * this.column;
				/**
				 * 计算top
				 * 取上一行最短的那个 index 和 高度
				 * top = 最短那个top + space + itemHeight;
				 */
				//第一排都是靠顶
				if (i < this.column) {
					n.top = 0;
					colHeightArr.push(itemHeight);
					n.left = (this.space + this.itemWidth) * currentItemIndex;
					//其他排都是根据最矮的一排进行排列
				} else {
					//找到最矮的那一列进行排列
					let index = 0;
					//假设最小高度是第一个索引的对应高度
					let minHeight = colHeightArr[index];
					//遍历数组，找到最小值和最小值对应的索引
					colHeightArr.forEach((m, j) => {
						if (minHeight > m) {
							index = j;
							minHeight = m;
						}
					});
					// console.log('>>>', index, itemHeight, minHeight, colHeightArr);
					//赋值
					n.top = minHeight + this.space;
					n.left = index * (this.space + this.itemWidth);
					//当前数组中最小的高度进行新的高度的更新
					colHeightArr[index] = minHeight + this.space + itemHeight;
				}
			});
			this.listData = newData.slice(0);
		},
		getText(val) {
			if (!val) return val == 0 ? 0 : '--';
			let res = '';
			res = val.replace(/[\r\n]+/g, '<br>');
			return res;
		},
	},
};
</script>

<style lang="less">
@import './index.less';
</style>



