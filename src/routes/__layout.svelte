<script>
	import { post, get } from '../shared/apis';
	import { name, username, access_token, refresh_token, isAuthenticated } from '../shared/stores';
	import { onMount } from 'svelte';

	let userId = '';
	let password = '';

	onMount(() => {
		console.log('onMount name ', $name);
		console.log('onMount username ', $username);
		console.log('onMount access_token', $access_token);
		console.log('onMount refresh_token', $refresh_token);
		console.log('onMount isAuthenticated', $isAuthenticated);
	});

	$: {
		console.log('isAuthenticated', $isAuthenticated);
	}

	async function onSubmit() {
		console.log(`${userId} : ${password}`);
		const data = {
			username: userId,
			password
		};

		const { response, json } = await post(
			'http://localhost:8080',
			'api/login',
			data,
			'loginData',
			''
		);
		access_token.set(json.access_token);
		refresh_token.set(json.refresh_token);
		if (response.ok) {
			isAuthenticated.set(true);
			username.set(userId);

			const { response, json } = await get(
				'http://localhost:8080',
				`api/user/${userId}`,
				'',
				'',
				$access_token
			);
			console.log(json);
			name.set(json.name);
		}
	}

	// const [data, loading, error, get] = fetchStore(url);

	// async function onSubmit() {
	// 	console.log(`${username} : ${password}`);

	// 	var details = {
	// 		username,
	// 		password
	// 	};

	// 	var formBody = [];

	// 	for (var property in details) {
	// 		var encodedKey = encodeURIComponent(property);
	// 		var encodedValue = encodeURIComponent(details[property]);
	// 		formBody.push(encodedKey + '=' + encodedValue);
	// 	}
	// 	formBody = formBody.join('&');

	// 	const res = await fetch('http://localhost:8080/api/login', {
	// 		method: 'POST',
	// 		body: formBody,
	// 		credentials: 'include',
	// 		headers: {
	// 			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	// 		}
	// 	});

	// 	if (res.status == 200) {
	// 		const json = await res.json();
	// 		result = JSON.stringify(json);
	// 		console.log(result);
	// 		token.set({ access_token: json.access_token, refresh_token: json.refresh_token });
	// 		user.set({ username });
	// 		isAuthenticated.set(true);
	// 	}

	// 	//username = '';
	// 	//password = '';
	// }
</script>

<header>
	<div class="topnav">
		<div class="menu">
			<a class="active" href="#home">Home</a>
			<a href="#about">About</a>
			<a href="#contact">Contact</a>
		</div>
		<div class="login-container">
			{#if $isAuthenticated}
				<form on:submit|preventDefault={onSubmit}>
					<input type="text" placeholder="Username" name="username" bind:value={userId} />
					<input type="text" placeholder="Password" name="password" bind:value={password} />
					<button type="submit">Login</button>
				</form>
			{:else}
				<span>
					{$username}
				</span>
			{/if}
		</div>
	</div>
</header>
<slot />

<style>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	/* Style the navbar */
	.topnav {
		display: flex;
		justify-content: space-between;
		overflow: hidden;
		background-color: #e9e9e9;
	}

	/* Navbar links */
	.topnav a {
		float: left;
		display: block;
		color: black;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
		font-size: 17px;
	}

	/* Navbar links on mouse-over */
	.topnav a:hover {
		background-color: #ddd;
		color: black;
	}

	/* Active/current link */
	.topnav a.active {
		background-color: #2196f3;
		color: white;
	}

	/* Style the input container */
	.topnav .login-container {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.topnav .login-container span {
		margin-right: 10px;
		font-size: x-large;
		font-weight: bold;
	}

	/* Style the input field inside the navbar */
	.topnav input[type='text'] {
		padding: 6px;
		margin-top: 8px;
		font-size: 17px;
		border: none;
		width: 150px; /* adjust as needed (as long as it doesn't break the topnav) */
	}

	/* Style the button inside the input container */
	.topnav .login-container button {
		float: right;
		padding: 6px;
		margin-top: 8px;
		margin-right: 16px;
		background: #ddd;
		font-size: 17px;
		border: none;
		cursor: pointer;
	}

	.topnav .login-container button:hover {
		background: #ccc;
	}

	/* Add responsiveness - On small screens, display the navbar vertically instead of horizontally */
	@media screen and (max-width: 600px) {
		.topnav {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.topnav .login-container {
			float: none;
		}
		.topnav .login-container span {
			padding: 14px;
		}
		.topnav a,
		.topnav input[type='text'],
		.topnav .login-container button {
			float: none;
			display: block;
			text-align: left;
			width: 100%;
			margin: 0;
			padding: 14px;
		}
		.topnav input[type='text'] {
			border: 1px solid #ccc;
		}
	}
</style>
