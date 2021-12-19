<script>
	import { post, get } from '../shared/apis';
	import { onMount } from 'svelte';
	import { name, username, access_token, refresh_token, isAuthenticated } from '../shared/stores';

	// import { isAuthenticated, user, token } from '../stores/session.js';
	let usernmae = '';
	let userList = [];

	onMount(() => {
		//console.log($userInfo); // 7
	});

	// async function getUserInfo(username, access_token) {
	// 	console.log('username', username);
	// 	const res = await fetch(`http://localhost:8080/api/user/${username}`, {
	// 		method: 'GET',
	// 		headers: { Authorization: `Bearer ${access_token}` }
	// 	});
	// 	if (res.ok) {
	// 		const json = await res.json();
	// 		console.log(res);
	// 		console.log(json);
	// 		name = json.name;
	// 	}
	// }

	async function getUserList() {
		const { response, json } = await get(
			'http://localhost:8080',
			'api/users',
			'',
			'',
			$access_token
		);
		if (response.ok) {
			userList = json;
		} else {
			onClickRefresh();
		}
	}

	async function onClickRefresh() {
		const { response, json } = await get(
			'http://localhost:8080',
			'api/token/refresh',
			'',
			'',
			$refresh_token
		);
		if (response.ok) {
			access_token.set(json.access_token);
			refresh_token.set(json.refresh_token);
			getUserList();
		}
	}

	const onClick = () => {
		getUserList($access_token);
	};
</script>

<div class="container">
	<div class="header">
		<h1 cl>Welcome to SvelteKit {name}</h1>
		<h2>Zebra Striped Table</h2>
	</div>
	<div class="table">
		<div class="tableTitle">
			<div>
				<span>User List</span>
			</div>
			<div class="buttns">
				<button class="btn success" on:click={onClickRefresh}>Refresh</button>
				<button class="btn success" on:click={onClick}>Search</button>
			</div>
		</div>
		<table>
			<tr>
				<th>User Id</th>
				<th>User Name</th>
				<th>User Alias</th>
			</tr>
			{#each userList as user (user.id)}
				<tr>
					<td>{user.id}</td>
					<td>{user.name}</td>
					<td>{user.username}</td>
				</tr>
			{/each}
		</table>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.header h1 {
		text-align: center;
		font-size: xx-large;
		font-weight: bolder;
		margin-top: 20px;
	}

	.header h2 {
		text-align: center;
		font-size: x-large;
		font-weight: bolder;
		margin-top: 40px;
	}
	.table {
		margin-top: 50px;
		width: 600px;
	}
	.tableTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.tableTitle span {
		font-size: large;
		font-weight: bold;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
		width: 100%;
		border: 1px solid #ddd;
		margin-top: 10px;
	}

	th,
	td {
		text-align: left;
		padding: 16px;
	}

	tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	.btn {
		border: 2px solid black;
		background-color: white;
		color: black;
		padding: 14px 28px;
		font-size: 16px;
		cursor: pointer;
	}

	/* Green */
	.success {
		border-color: #04aa6d;
		color: green;
	}

	.success:hover {
		background-color: #04aa6d;
		color: white;
	}
</style>
