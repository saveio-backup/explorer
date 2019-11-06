<template>
	<footer>
		<div class="contact-link">
			<a>
				<i class="ofont ofont-linkedin"></i>
			</a>
			<a>
				<i class="ofont ofont-telegram"></i>
			</a>
			<a>
				<i class="ofont ofont-twitter"></i>
			</a>
			<a>
				<i class="ofont ofont-facebook"></i>
			</a>
		</div>
		<p class="footer-description">Copynight© 2018 The Onchain Team</p>
	</footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
	max-width: 1170px;
	width: calc(100% - 30px);
	height: 137px;
	margin: 0 auto;
	border-top: 1px solid #afacac;

	.contact-link {
		height: 94px;
		line-height: 94px;
		display: flex;
		justify-content: center;

		& > a {
			margin: 0 25px;
			transition: margin 0.5s;
			@media (max-width: 1024px) {
				margin: 0 12px;
			}			

			.ofont {
				font-size: 18px;
        border: 1px solid white;
        color: white;
				opacity: 1;
				padding: 10px;
				text-align: center;
				border-radius: 50%;
        opacity: 0.5;
        cursor: pointer;

				&.ofont-facebook:before {
					position: relative;
					left: -1px;
					top: -1px;
				}

				&:hover {
					opacity: 1;
					background: rgba(255, 255, 255, 0.1);
				}
			}
		}
  }
  
  .footer-description {
    height: 18px;
    font-size: 14px;
    color: rgba(89,87,87,1);
    line-height: 18px;
    text-align: center;
  }
}
</style>