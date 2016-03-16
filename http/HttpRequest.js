/**
 * Created by wenxucheng on 16/2/29.
    此类为根据平台特定协议扩展FetchUtil
 */

'use strict';

import FetchUtil from './FetchUtil';

class HttpRequest extends FetchUtil {

	constructor(baseUrl = null) {
		if(null === baseUrl){
			this.baseUrl = '';
		}else{
			this.baseUrl = baseUrl;
		}
 	}

	dofetch() {
        this.url = _formatUrl(this.url, this.bodys);

		return super.dofetch()
            .then(
    			(response) => {
    				this.checkStatus(response);
    				return response;
    			}
    		)
    		.then(
    			(response) => {
    				if('json' == this.return_type){
    					return response.json();
    				}else if('text' == this.return_type){
    					return response.text();
    				}else if('blob' == this.return_type){
    					return response.blob();
    				}else if('formData' == this.return_type){
    					return response.formData();
    				}else if('arrayBuffer' == this.return_type){
    					return response.arrayBuffer();
    				}
    			}
    		)
    		.catch(
    			(err) => {
    				throw err;
    			}
    		);
	}


	checkStatus(response){
		console.log(response);
		//throw new Error('no login');
	}

	//如果api中带有{}携带参数格式化
    _formatUrl(url, params) {
        if (url.includes('{') && !!params) {
        	for (let i = params.keys().length-1; i >= 0 ; i--) {
				let name = params.keys()[i];
        		if (url.includes(name)) {
        			url = url.replace('{'+name+'}', params[name]);
        		}
        	}
        }
		return url.startsWith('http://') ? url : this.baseUrl + url;
    }

}

module.exports = HttpRequest;
