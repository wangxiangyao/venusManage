// Process [component]{a:1, b:2}

var JSON5 = require("json5")

// valid component name character
var componentNameRe = /[a-zA-Z-]/
var baseUrl = process.env.NODE_ENV === 'production'
	? 'http://app.starluxe.cn/api'
	: 'http://test.starluxe.cn:8080'
const resource = 'https://resource.starluxe.cn'

function component(state, silent) {
	var max = state.posMax
	var start = state.pos

	// Search for [
	if (state.src[start] !== "[") {
		return false
	}
	if (silent) {
		return false
	}

	// Search for ]
	state.pos++
	var found = false
	while (state.pos < max) {
		var char = state.src[state.pos]
		if (char === "]") {
			found = true
			break
		}
		// Assert valid component name character.
		if (!componentNameRe.test(char)) {
			break
		}
		state.pos++
	}

	if (!found) {
		state.pos = start
		return false
	}

	// 传入的是哪个模块 目前只有：commodity
	var name = state.src.slice(start + 1, state.pos)

	// Assert {
	state.pos++
	if (state.src[state.pos] !== "{") {
		state.pos = start
		return false
	}

	// Search for }
	var jsonStart = state.pos
	state.pos++
	found = false
	var count = 0
	while (state.pos < max) {
		var char = state.src[state.pos]
		// Handle nested JSON
		if (char === "{") {
			count++
		}
		// Match close token.
		if (char === "}") {
			if (count === 0) {
				found = true
				break
			} else {
				count--
			}
		}
		state.pos++
	}

	if (!found) {
		state.pos = start
		return false
	}

	// Parse JSON props.
	var content = state.src.slice(jsonStart, state.pos + 1)
	var json
	try {
		json = JSON5.parse(content)
	} catch (e) {
		state.pos = start
		console.log('请输入符合json规则的数据')
		return false
	}

	// found!
	state.posMax = state.pos
	state.pos = start + 1

	var token = state.push("component", 'a', 0)
	token.markup = "[" + name + "]{" + content + "}"
	token.props = json

	state.pos = state.posMax + 1
	state.posMax = max
	return true
}

function attrValue(value) {
	var str = JSON.stringify(value)
	if (str[0] === '"') {
		str = str.slice(1)
	}
	if (str[str.length - 1] === '"') {
		str = str.slice(0, str.length - 1)
	}
	return str
}

function render(options) {
	return function(tokens, idx, _options, env, self) {
		var token = tokens[idx]
		var props = token.props
		var commodity = {}
		console.log(process)
		$.ajax({
		 url: baseUrl + '/commodity/' + props.id,
		 type:'GET', //GET
		 async: false, //或false,是否异步
		 timeout: 5000, //超时时间
		 dataType: 'json', //返回的数据格式
		 success:function(data,textStatus,jqXHR){
			 console.log(process.env, data)
			 commodity = data
		 },
		 error:function(xhr,textStatus){
		 },
		 complete:function(){
		 }
		})
		console.log(commodity)
		var temp = `
		<a class="commodityItem" href="/#/commodity/CommodityDetail/${props.id}">
			<div class='main-pic-wrapper'>
				<img class='main-pic' alt="${props.id}" src="${resource}${commodity.src.split(',')[0]}">
			</div>
			<div class='commodity-info'>
				<div class="BrandName item">
					${commodity.commodityBrandNameEn}
				</div>
				<div class="Name item">
					${commodity.name}
				</div>
				<div class="RantInfo item">
					单周体验价 ¥${commodity.rentPrice}
				</div>
				<div class="Price item">
					市场价 ¥${commodity.marketPrice}
				</div>
			</div>
		</a>
		`
		return temp

		// if (options.jsonData) {
		// 	token.attrPush(["json-data", JSON.stringify(props)])
		// } else {
		// 	var keys = Object.keys(props)
    //
		// 	for (var i = 0; i < keys.length; i++) {
		// 		var key = keys[i]
		// 		var value = props[key]
		// 		token.attrPush([key, attrValue(value)])
		// 	}
		// }

		// return self.renderToken(tokens, idx, _options, env, self)
	}
}

export default function(options) {
	return function(md) {
		md.inline.ruler.after("image", "component", component)
		md.renderer.rules["component"] = render(options || {})
	}
}
