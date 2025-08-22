<script setup></script>

<template>
	<header class="app-header">
		<div class="container">
			<button class="ui-btn">
				<span class="ui-icon">
					<svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M5.5 7C4.119 7 3 5.881 3 4.5C3 3.119 4.119 2 5.5 2C6.881 2 8 3.119 8 4.5C8 5.881 6.881 7 5.5 7ZM5.5 0C2.462 0 0 2.462 0 5.5C0 8.538 5.5 16 5.5 16C5.5 16 11 8.538 11 5.5C11 2.462 8.538 0 5.5 0Z"
							fill="#979797"
						/>
					</svg>
				</span>
				<span style="font-weight: 600; margin-left: 6px">Новосибирск</span>
			</button>
		</div>
	</header>
	<main>
		<router-view />
	</main>
</template>

<style>
.app-header {
	width: 100%;
	height: 72px;
	display: flex;
	align-items: center;
	background-color: var(--c-white);
	box-shadow: 0 2px 4px rgba(39, 39, 39, 0.1);
}
</style>
