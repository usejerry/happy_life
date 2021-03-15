<template>

	<div class="circle-progress">
		<div class="content left">
			<div class="circle left-circle" :style="{'transform': 'rotate('+right_r+'deg)'}"></div>
		</div>
		<div class="content right">
			<div class="circle right-circle" :style="{'transform': 'rotate('+left_r+'deg)'}"></div>
		</div>
	</div>


</template>

<script>

	/**
	 * PopUp 弹出层
	 * @event {Function} popupChange 打开关闭弹窗触发，e={show: false}
	 */

	export default {
		name: 'Calculation',   
		components: {
			
		},
		props: {
            ca_num: {
              type: Number,
              default: 0
            },
            ca_num_total: {
              type: Number,
              default: 0
            },
		},
		data() {
			return {
                num:0,
                yuan:{s_x:0,s_y:0,m_x:0,m_y:0},
                aounts_div:null,
                now_po:{x:0,y:0},  // 当前目标xy
                drop:false,
                trabs_x:0,
                left_p:'',
                one_ok:-1,
			}
		},
		computed : {
            // left_p:function(){
            //     return parseInt(this.num/this.ca_num_total*100)+'%'
            // }	
		},
		created() {
            // this.num = this.$props.ca_num
		},
		methods: {
		},
		mounted : function(){

		}
	}
</script>

<style lang="less" scope>
	.text_box{
		width: 5rem;
		height: 1rem;
		position: relative;
		.minus{
			width: .72rem;
			height: .74rem;
			background: url(../../img/minus_btn.png)no-repeat;
			background-size: 100% auto;
			position: absolute;
			left: -0.3rem;
			top: 50%;
			transform: translateY(-50%);
		}
		.aounts_bg{
			width: 4.2rem;
			height: .04rem;
			background: #2b2929;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
            z-index: 2;
			.jdu_y{
				width: .34rem;
				height: .32rem;
				position: absolute;
				left: 0;
				top:0;
				background: url(../../img/yuan_io.png)no-repeat;
				background-size: 100% auto;
				margin-top: -0.13rem;
                margin-left: -0.24rem;
			}
		}
		.add{
			width: .72rem;
			height: .74rem;
			background: url(../../img/add_btn.png)no-repeat;
			background-size: 100% auto;
			position: absolute;
			right: -0.24rem;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>