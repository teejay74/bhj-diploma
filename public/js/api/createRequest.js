/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	let xhr = new XMLHttpRequest();
	let formData = new FormData();
	if (options.responseType) {
    	xhr.responseType = options.responseType;
  	}
    xhr.withCredentials = true;
	
    if(options.method === 'GET') {
        options.url += "?";
    	for (let value in options.data) {
            options.url += `${value}=${options.data[value]}&`;
         }      
     }

    else {
    	for (let option in options.data) {
            formData.append(option, options.data[option]);
        }
    }

    try {
    	xhr.open(options.method, options.url);
    	xhr.send(formData);
    }

    catch (e) {
    	callback(e);
    }

    xhr.addEventListener('readystatechange', () => {
    	if(xhr.status === 200) {
    		if(!xhr.response.success) {
    			options.callback(xhr.response.error, xhr.response);
    		}
    		else {
    			options.callback(null, xhr.response);
    		}
    	}

    });

    return xhr;

};
