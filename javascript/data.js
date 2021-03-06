var data = {
	defaultLang: "en",
	langItem: lang["en"],
	lang: lang,
	menu: false,
	langList: {
			en: "English",
			cn: "中文",
			kr: "한국어",
			jp: "日本語",
			ru: "Россия",
	},
	account: null,
	copySuccess:false,
	noId:false,
	noRegister:false,
	idError:false,
	defaultAddress:"",
	trxBalance: "--",
	playerID: 0,
	pid: 0,
	
	mixID:0,
	userID:0,
	userAddress:"",
	userIncome:"--",
	userInviteCount:"--",
	
	myAddress:"",
	myInviteCount:"--",
	myIncome:"--",
	
	address:"--",
	invest:"--",
	openID:0,
	inviteCount:"--",
	
	joinTime:"--",
	income:"--",
	
	parentID:"--",
	historyCount:0,
	loaded:false,
	showLoading:true,
	inputValue:"",
	
	matrixData:[
	  {nodes:[0,0,0,0,0,0,0,0,0,0,0,0],no:1,uid:0,quantity:2000,partners:0,round:0,skip:0,burn:0,buy:false,loss:0,isactive:0},
	  {nodes:[0,0,0,0,0,0,0,0,0,0,0,0],no:2,uid:0,quantity:4000,partners:0,round:0,skip:0,burn:0,buy:false,loss:0,isactive:0},
	  {nodes:[0,0,0,0,0,0,0,0,0,0,0,0],no:3,uid:0,quantity:8000,partners:0,round:0,skip:0,burn:0,buy:false,loss:0,isactive:0},
	  {nodes:[0,0,0,0,0,0,0,0,0,0,0,0],no:4,uid:0,quantity:16000,partners:0,round:0,skip:0,burn:0,buy:false,loss:0,isactive:0},
	  {nodes:[0,0,0,0,0,0,0,0,0,0,0,0],no:5,uid:0,quantity:32000,partners:0,round:0,skip:0,burn:0,buy:false,loss:0,isactive:0},
	  {nodes:[0,0,0,0,0,0,0,0,0,0,0,0],no:6,uid:0,quantity:64000,partners:0,round:0,skip:0,burn:0,buy:false,loss:0,isactive:0},
	  {nodes:[0,0,0,0,0,0,0,0,0,0,0,0],no:7,uid:0,quantity:128000,partners:0,round:0,skip:0,burn:0,buy:false,loss:0,isactive:0},
	  {nodes:[0,0,0,0,0,0,0,0,0,0,0,0],no:8,uid:0,quantity:256000,partners:0,round:0,skip:0,burn:0,buy:false,loss:0,isactive:0},
	  {nodes:[0,0,0,0,0,0,0,0,0,0,0,0],no:9,uid:0,quantity:512000,partners:0,round:0,skip:0,burn:0,buy:false,loss:0,isactive:0},
	  {nodes:[0,0,0,0,0,0,0,0,0,0,0,0],no:10,uid:0,quantity:1024000,partners:0,round:0,skip:0,burn:0,buy:false,loss:0,isactive:0},
	],
	matrixDetail:{
		nodes:[0,0,0,0,0,0,0,0,0,0,0,0],
	    income:0,
	    partners:0,
	    partners:0,
	    round:0,
	    skip:0,
	    burn:0,
	    buy:false,
	    loss:0
	},
	matrixHistory:[],
	currentRestart:0,
	maxRestart:0,
	logCount:"--",
	logIndex:0,
	logPageCount:0,
	inviteIndex:0,
	invitePageCount:0,
	pageSize:12,
	task:null,
	inviteList:[],
	contractAddress: "TKiRSKzKQRo3n2ejT2VT2Xx6ATVsD6We5r",
	contract:null,
	feeLimit: 100000000,
	callValue: 0,
	abi:"",
}