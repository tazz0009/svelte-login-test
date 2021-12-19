import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const name = writable((browser && localStorage.getItem('name')) || '');
name.subscribe((val) => {
	if (browser) return (localStorage.name = val);
});
export const username = writable((browser && localStorage.getItem('username')) || '');
username.subscribe((val) => {
	if (browser) return (localStorage.username = val);
});
export const access_token = writable((browser && localStorage.getItem('access_token')) || '');
access_token.subscribe((val) => {
	if (browser) return (localStorage.access_token = val);
});
export const refresh_token = writable((browser && localStorage.getItem('refresh_token')) || '');
refresh_token.subscribe((val) => {
	if (browser) return (localStorage.refresh_token = val);
});
export const isAuthenticated = writable(
	(browser && localStorage.getItem('isAuthenticated')) || false
);
isAuthenticated.subscribe((val) => {
	if (browser) return (localStorage.isAuthenticated = val);
});

// // User/JWT-related
// // https://stackoverflow.com/a/61300826/2933427
// export const createWritableStore = (key, startValue) => {
// 	const { subscribe, set } = writable(startValue);

// 	return {
// 		subscribe,
// 		set,
// 		useLocalStorage: () => {
// 			const json = localStorage.getItem(key);
// 			if (json) {
// 				set(JSON.parse(json));
// 			}

// 			subscribe((current) => {
// 				localStorage.setItem(key, JSON.stringify(current));
// 			});
// 		}
// 	};
// };

// export const userInfo = createWritableStore('userInfo', {});
// export const tokenInfo = createWritableStore('tokenInfo', {});
// export const isAuthenticated = createWritableStore('isAuthenticated', false);
