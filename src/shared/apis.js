async function send({ method, path, data, type, jwt, base }) {
	const opts = { method, headers: {} };

	if (data) {
		if (!type) {
			opts.headers['Content-Type'] = 'application/json';
			opts.body = JSON.stringify(data);
		} else if (type === 'formData') {
			// TODO: refactor this to work better for file uploads
			const formData = new FormData();
			formData.append('image', data.image[0]);
			opts.body = formData;
			// NOTE: for `fetch` we don't send Content-Type
			// opts.headers['Content-Type'] = 'multipart/form-data';
		} else if (type === 'loginData') {
			opts.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
			const formData = [];
			for (var property in data) {
				var encodedKey = encodeURIComponent(property);
				var encodedValue = encodeURIComponent(data[property]);
				formData.push(encodedKey + '=' + encodedValue);
			}
			opts.body = formData.join('&');
		}
	}

	if (jwt) {
		// Set the Authorization header
		if (jwt) {
			if (jwt.includes('Bearer')) {
				opts.headers['Authorization'] = jwt;
			} else {
				opts.headers['Authorization'] = `Bearer ${jwt}`;
			}
		}
	}

	const fullPath = encodeURI(`${base}/${path}`);
	const response = await fetch(fullPath, opts);
	const json = await response.json();
	return { response, json };
}

/*
 * Shortcut methods for send
 */
export function get(base, path, data, type, jwt) {
	return send({ method: 'GET', path, data, type, jwt, base });
}

export function del(base, path, data, type, jwt) {
	return send({ method: 'DELETE', path, data, type, jwt, base });
}

export function post(base, path, data, type, jwt) {
	return send({ method: 'POST', path, data, type, jwt, base });
}

export function put(base, path, data, type, jwt) {
	return send({ method: 'PUT', path, data, type, jwt, base });
}
