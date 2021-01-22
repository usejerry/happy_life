<template>

	<div v-show="showPopup" class="popup">

		<div class="popup-mask" :class="{show:showTrans}"></div>

		<div class="popup-box" :class="{show:showTrans}">

			<div class="popup-content" @click.stop="clear">
				<a class="close" href="javascript:void(0);" @click="close">关闭</a>
				<slot></slot>
			</div>

		</div>
		
	</div>

</template>

<script>

	/**
	 * PopUp 弹出层
	 * @event {Function} popupChange 打开关闭弹窗触发，e={show: false}
	 */

	export default {
		name: 'Popup',   
		components: {
			
		},
		props: {
			showState: {//弹窗默认隐藏
				type: Boolean,
				default: false
			},

		},
		data() {
			return {
				duration: 300,
				showPopup: this.showState,
				showTrans : this.showState,
			}
		},
		computed : {
			
		},
		created() {
			if (this.animation) {
				this.duration = 300
			} else {
				this.duration = 0
			}
		},
		methods: {
			clear(e) {
				// TODO nvue 取消冒泡
				e.stopPropagation()
			},
			open(){
				this.showPopup = true
				this.$nextTick(() => {
					clearTimeout(this.timer)
					this.timer = setTimeout(() => {
						this.showTrans = true
					}, 50);
				})
				this.$emit('popupChange', {
					show: true
				})
			},
			close() {
				this.showTrans = false
				this.$nextTick(() => {
					clearTimeout(this.timer)
					this.timer = setTimeout(() => {
						this.$emit('popupChange', {
							show: false
						})
						this.showPopup = false
					},300)
				})
			}
		},
		mounted : function(){
			// console.log("...",this.showState);
		}
	}
</script>

<style>
	.popup {
		position:fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10000002;
	}
	.popup-mask{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color:rgba(0, 0, 0, 0.8);
		opacity: 0;
		transition:opacity 0.2s ease;
	}
	.popup-mask.show {
		opacity: 1;
	}

	.popup-box{
		position: fixed;
	    display: flex;
	    flex-direction: column;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		justify-content: center;
		align-items: center;
		transform:scale(0.5);
		opacity:0;
		transition:all 0.2s ease;
	}
	.popup-box.show {
		transform: scale(1);
		opacity: 1;
	}
	.popup-content{
		display:block;
		position:relative;
	}
	.popup-content .close{
		position:absolute; 
	}
</style>