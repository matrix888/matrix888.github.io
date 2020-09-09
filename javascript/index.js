var app = new Vue({
	el: "#app",
	data: data,
	methods: {
		SC: function(name, value) {
			var Days = 7;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
		},
		GC: function(name) {
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if(arr = document.cookie.match(reg))
				return unescape(arr[2]);
			else
				return null;
		},
		IL: function() {
			var _t = this,
				value = this.GC("lang");
			for(var key in _t.lang) {
				if(key == value) {
					_t.langItem = _t.lang[key];
					break;
				}
			}
		},
		changeLang: function(index) {
			this.SC("lang", index), this.IL(), this.menu = false
		},
		displayMenu: function() {
			this.menu = !this.menu;
		},
		tokenTab: function(index) {
			this.tabData.tokenItem = index
		},
		clickTab: function(index) {
			this.tabData.ecologyItem = index
		},
		investTab: function(index) {
			this.gameData.investNumber = index;
		},
		daysTab: function(index) {
			this.financial.joinDays = index;
		},
		hidePop: function() {
			this.copySuccess = false;
			this.noId=false;
			this.noRegister=false;
			this.idError=false;
		},
		getQuantity: function(val) {
			this.quantity = val;
		},
		i: async function() {
			return(this.IL(), this.PID(), this.MID(), this.UID(), await this.I3());
		},
		wait: async function() {
			var _t = this;
			if (window.tronWeb) {
				var tronWeb = window.tronWeb;
				var nodes = await tronWeb.isConnected();
				if (nodes&&nodes["fullNode"]&&nodes["solidityNode"]){
					return(await _t.A(), _t.I());
				} else {
					setTimeout(async () => {
						await _t.wait();
					}, 1000);
				}
			} else {
				setTimeout(async () => {
					await _t.wait();
				}, 1000);
			}
		},
		I3: async function() {
			this.wait().then();			
		},
	    tg: async function (methodName, args, callback) {
			let myContract = await window.tronWeb.contract().at(this.contractAddress)
			var callSend = 'send'
			this.abi.forEach(function (val) {
			  if (val.name === methodName) {
				callSend = /payable/.test(val.stateMutability) ? 'send' : 'call'
			  }
			})
			myContract[methodName](...args)[callSend]({
			  feeLimit: this.feeLimit,
			  callValue: this.callValue || 0,
			}).then(function (res) {
			  if (res) {
				callback && callback(res);
			  }
			})
		},
		JP:function(uid){
			if(~~uid > 0) {
				window.location.href = "main.html?userID=" + uid;
				return false;
			}
		},
		IX: function() {
			var _t = this;
			_t.getUserID(function(r){
				_t.showLoading = false;
			});
		},
		RG: function() {
			var _t = this;
			_t.getUserID(function(r){
				_t.JP(_t.playerID);
				_t.showLoading = false;
			});
		},
		IT: function() {
			var _t = this;
			_t.getBalance();
			_t.getUserID(function(r){
				if(_t.playerID==0){
					window.location.href = "reg.html?pid=" + _t.lg("pid");
					return false;
				}else{
					_t.getUserInfo(_t.playerID, function(r){
						_t.parentID = parseInt(r[1]);
						_t.myAddress = _t.h(r[2]);
						_t.invest = r[5] / 10 ** 6;
						_t.myIncome = r[6] / 10 ** 6;
						_t.openID = ~~r[7];
						_t.myInviteCount = ~~r[8];
						_t.invitePageCount = ~~((_t.myInviteCount+_t.pageSize-1)/_t.pageSize);
						_t.inviteIndex = _t.myInviteCount>0?1:0;
						_t.joinTime = ~~r[9];
						_t.showLoading = false;
					});
					_t.getInviteList(_t.playerID, 0);
				}
			});
			_t.copy();
		},
		getInvitePage: function(n){
			var _t = this;
			_t._invitePageList(_t.playerID, n);
		},
		getMainInvitePage: function(n){
			var _t = this;
			_t._invitePageList(_t.userID, n);
		},
		_invitePageList: function(uid, n){
			var _t = this;
			if(_t.invitePageCount==0){
				_t.inviteIndex= 0;
				return false;
			}
			_t.inviteIndex += n;
			if(_t.inviteIndex<1)_t.inviteIndex=1;
			if(_t.inviteIndex>_t.invitePageCount)_t.inviteIndex=_t.invitePageCount;
			_t.showLoading = true;
			_t.getInviteList(uid, (_t.inviteIndex-1)*_t.invitePageCount, function(r){
				_t.showLoading = false;
			});
		},
		MN: function() {
			var _t = this;
			if(_t.playerID == 0){
				_t.playerID = _t.lg("_uID");
			}
			if(_t.playerID == 0){
				_t.getUserID(function(r){});
			}
			_t.getUserInfo(_t.userID, function(r){
				_t.parentID = ~~r[1];
				_t.userAddress = _t.h(r[2]);
				_t.userIncome = r[6] / 10 ** 6;
				_t.userInviteCount = ~~r[8];
				_t.invitePageCount = ~~((_t.userInviteCount+_t.pageSize-1)/_t.pageSize);
				_t.inviteIndex = _t.userInviteCount>0?1:0;
				_t.openID = ~~r[7];
				_t.getBoxInfo(_t.userID, _t.openID, function(r){
					_t.showLoading = false;
				});
			});
			_t.getInviteList(_t.userID, 0);
			_t.copy();
		},
		DT: function() {
			var _t = this;
			
			if(_t.playerID == 0){
				_t.playerID = _t.lg("_uID");
			}
			if(_t.playerID == 0){
				_t.getUserID(function(r){});
			}
			
			_t.getUserInfo(_t.userID, function(r){
				_t.parentID = ~~r[1];
				_t.userAddress = _t.h(r[2]);
				_t.getDetail(_t.userID, _t.mixID - 1, function(r){
					_t.showLoading = false;
				});
			});
			_t.logIndex = 1;
			_t.getBoxLogInfo(_t.userID, _t.mixID - 1);
		},
		I: function() {
			var _t = this;
			if(TAG=="REG"){_t.RG();
			}else if(TAG=="INDEX"){_t.IX();
			}else if(TAG=="INVITE"){_t.IT()
			}else if(TAG=="MAIN"){_t.MN()
			}else if(TAG=="DETAIL"){_t.DT()
			}else{_t.showLoading=false;}
		},
		PID: function() {
			var reg = new RegExp('(^|&)' + 'pid' + '=([^&]*)(&|$)'),
				r = window.location.search.substr(1).match(reg);
			this.pid = r != null ? parseInt(decodeURIComponent(r[2])) : 0;
			if(this.pid > 0) {
				this.ls("pid", this.pid);
			}else{
				this.pid = ~~this.lg("pid");
			}
		},
		UID: function() {
			var reg = new RegExp('(^|&)' + 'userID' + '=([^&]*)(&|$)'),
				r = window.location.search.substr(1).match(reg);
			this.userID = r != null ? parseInt(decodeURIComponent(r[2])) : 0;
		},
		MID: function() {
			var reg = new RegExp('(^|&)' + 'mixID' + '=([^&]*)(&|$)'),
				r = window.location.search.substr(1).match(reg);
			this.mixID = r != null ? parseInt(decodeURIComponent(r[2])) : 0;
			
		},
		getBalance: async function() {
			this.trxBalance = await tronWeb.trx.getBalance(this.defaultAddress) /10**6;
		},
		copy: function() {
			var _this = this;
			var clipboard = new ClipboardJS('.btn');
			clipboard.on('success', function(e) {
				e.clearSelection();
				_this.copySuccess = true;
			});

			clipboard.on('error', function(e) {
				alert("copy failed!")
			});
		},
		getUserID: async function(callback) { 
			var _t = this;
			_t.contract.getUserID(_t.defaultAddress).call().then(function(r){
				_t.ls("_uID", ~~r);
				_t.playerID = ~~r;
				callback && callback(r);
			});
		},
		getUserInfo: async function(uid, callback) { 
			var _t = this;
			_t.contract.getUserInfo(uid).call().then(function(r){
				callback && callback(r);
			});
		},
		h:function(a){return TronWeb.address.fromHex(a);},
		getInviteList: async function(uid, start, callback) { 
			var _t = this;
			_t.contract.getInviteList(uid, start).call().then(function(r){
				var uids = r[1];
				callback&&callback(r);
				_t.inviteList = [];
				for(var i = 0; i < uids.length; i++) {
					if(uids[i]>0){
						_t.getUserInfo(uids[i], function(r){
							_t.inviteList.push({
								id:~~r[0],
								time:~~r[9],
								address:_t.h(r[2]),
								income:r[6] / 10 ** 6,
								invite:~~r[8]
							}),_t.inviteList.sort(compare);
						});
					}
				}
			}).catch(function(err) {
					console.log(err.message + " at getInviteList");
			});;
		},
		join: async function() {
			var _t = this;
			if(_t.playerID == 0){
				_t.playerID = _t.lg("_uID");
			}_t.JP(_t.playerID);
			if(_t.pid == "" || _t.pid == 0) {
				_t.noId=true;
				return false;
			}
			_t.contract.Join(_t.pid).send({
				  feeLimit: _t.feeLimit,
				  callValue: _t.matrixData[0].quantity*1000000,
			}).then(function(r){});setInterval(function() {
				_t.getUserID(function(r){
					_t.JP(_t.playerID);
				});
			}, 5000);
			
		},
		getBoxInfo: async function(uid, max, callback) {
			var _t = this;
			if(++max>_t.matrixData.length-1)max=_t.matrixData.length-1;
			for(var i = 0; i < _t.matrixData.length; i++) {
				_t.contract.getBoxInfo(uid, i).call().then((function(i){
					return function(r){if(r){
							_t.matrixData[i].nodes = r[0];
							_t.matrixData[i].partners = ~~r[1];
							_t.matrixData[i].round = ~~r[3];
							_t.matrixData[i].skip = ~~r[4];
							_t.matrixData[i].burn = ~~r[5];
							if(i == _t.openID + 1) {
								_t.matrixData[i].buy = true;
							} else {
								_t.matrixData[i].buy = false;
							};
							if(i <= _t.openID) {
								_t.matrixData[i].isactive = true;
							} else {
								_t.matrixData[i].isactive = false;
							};
						}
						callback&&callback(r);
					}
				})(i)).catch(function(err) {
					console.log(err.message + " at getBoxInfo error");
				});
			}
		},
		getDetail: async function(uid, mid, callback) { 
			var _t = this;
			_t.contract.getBoxInfo(uid, mid).call().then(function(r){
				if(r){
					_t.matrixDetail.nodes = r[0];
					_t.matrixDetail.partners = ~~r[1];
					_t.matrixDetail.income = r[2] / 10 ** 6;
					_t.matrixDetail.round = ~~r[3];
					_t.matrixDetail.skip = ~~r[4];
					_t.matrixDetail.burn = ~~r[5];
					_t.currentRestart = ~~r[3];
					_t.maxRestart = ~~r[3];
				}
				callback&&callback(r);
			});
		},
		getBoxLog: async function(uid, mid, index, callback){
			var _t = this;
			_t.contract.getBoxLog(uid, mid, index).call().then(function(r){
				callback && callback(r);
			});
		},
		getBoxLogInfo: async function(uid, mid, callback) {
			var _t = this;
			_t.contract.getBoxLogCount(uid, mid).call().then(function(r){
				_t.logCount = ~~r;
				_t.logPageCount = ~~((_t.logCount+_t.pageSize-1)/_t.pageSize);
				_t.matrixHistory = [];
				if(_t.logCount==0){_t.logIndex==0;return false;}
				
				callback&&callback(r);
				var start = _t.logCount - (_t.logIndex-1)*_t.pageSize
				var limit = start - _t.pageSize < 0?0:start - _t.pageSize;

				while(start>limit) {
					_t.getBoxLog(uid, mid, --start, (function(i){
						return function(r){if(~~r[1]>0){_t.matrixHistory.push({
								address:_t.h(r[0]),
								id:i,
								uid:~~r[1],
								time:~~r[2],
								income:r[3] / 10 ** 6,
								type:~~r[4],
								round:~~r[5]
							}),_t.matrixHistory.sort(compare);}
						}
					})(start));
				}

			}).catch(function(err) {
					//console.log(err.message + " at getBoxLogInfo");
			});;
			
		},
		open: async function() { 
			var _t = this;
			var boxId = _t.openID + 1;	
			if(boxId>_t.matrixData.length)return;
			_t.contract.Open(boxId).send({
				  feeLimit: _t.feeLimit,
				  callValue: _t.matrixData[boxId].quantity*1000000,
			}).then(function(r){
			});
			
			if(_t.task!=null)clearInterval(_t.task);
			_t.task = setInterval(function() {
				_t.getUserInfo(_t.userID, function(r){
					_t.parentID = parseInt(r[1]);
					_t.userAddress = _t.h(r[2]);
					_t.userIncome = r[6] / 10 ** 6;
					_t.userInviteCount = ~~r[8];
					_t.invitePageCount = ~~((_t.userInviteCount+_t.pageSize-1)/_t.pageSize);
					_t.inviteIndex = _t.userInviteCount>0?1:0;
					_t.openID = ~~r[7];
					_t.getBoxInfo(_t.userID, _t.openID, function(r){});
				});
			}, 5000);
			
		},
		next: function(offset) { 
			var _t = this;
			_t.mixID += offset;
			if(_t.mixID<1)_t.mixID=1;
			if(_t.mixID>10)_t.mixID=10;
			_t.showLoading = true;
			_t.getDetail(_t.userID, _t.mixID - 1, function(r){
				_t.logIndex = 1;
				_t.getBoxLogInfo(_t.userID, _t.mixID - 1);
				_t.showLoading = false;
			});
		},
		getLogPage:function(n){
			var _t = this;
			if(_t.logPageCount==0){
				_t.logIndex = 0;
				return False;
			}
			_t.logIndex += n;
			if(_t.logIndex<1)_t.logIndex=1;
			if(_t.logIndex>_t.logPageCount)_t.logIndex=_t.logPageCount;
			_t.showLoading = true;
			_t.getBoxLogInfo(_t.userID, _t.mixID - 1, function(r){
				_t.showLoading = false;
			});
		},
		
		getBoxHistoryInfo: async function(uid, mid, round, callback) { 
			var _t = this;
			_t.contract.getBoxHistory(uid, mid, round).call().then(function(r){
				callback&&callback(r);
			});
		},
		history: function(offset) {
			var _t = this;
			if(_t.maxRestart==0)return;
			_t.currentRestart = _t.currentRestart + offset;

			if(_t.currentRestart < 0) {
				_t.currentRestart = 0;
			} else if(_t.currentRestart > _t.maxRestart) {
				_t.currentRestart = _t.maxRestart;
			}
			
			_t.showLoading = true;
			_t.getBoxHistoryInfo(_t.userID, _t.mixID - 1, _t.currentRestart, function(r){
				
				_t.maxRestart = ~~r[0];
				_t.matrixDetail.nodes = r[1];
				_t.showLoading = false;
			});

		},
		login: function() {
			var _t = this;
			if(_t.playerID == 0){
				_t.playerID = _t.lg("_uID");
			}
			if(_t.playerID == 0){
				_t.showLoading = true;
				_t.getUserID(function(r){
					_t.showLoading = false;

					if(_t.playerID == 0) {
						_t.noRegister=true;
					} else {
						_t.JP(_t.playerID);
					}
					
				});
			}
		
		},
		look: async function() {
			var _t = this;
			var value = _t.inputValue;
			var reNumber = new RegExp(/^[0-9]{1,10}$/);
			var reAddress = new RegExp(/^T[a-z0-9A-Z]{33}$/);
			
			if(!reNumber.test(value)&&!reAddress.test(value)) {
				_t.idError=true;
			} else {
				if(reAddress.test(value)) {
					_t.showLoading=true;
				
					_t.getUserID(function(r){
						_t.showLoading=false;
						_t.JP(_t.playerID);
					});
					
				} else {
					_t.JP(value);
				}
				
			}
		},
		ls: function(k, v){localStorage.setItem(k, v);},
		lg: function(k){return localStorage.getItem(k);},
		profile: function() { 
			var _t = this;

			if(_t.playerID == 0){
				_t.playerID = _t.lg("_uID");
			}
			if(_t.playerID == 0){
				_t.showLoading = true;
				_t.getUserID(function(r){
					_t.showLoading = false;
				});
			}
			if(_t.playerID > 0) {
				window.location.href = "invite.html?userID=" + _t.playerID
			} else {
				window.location.href = "reg.html?pid=" + _t.lg("pid");
			}
		},
		panel: function() { 
			var _t = this;
			
			if(_t.playerID == 0){
				_t.playerID = _t.lg("_uID");
			}
			if(_t.playerID == 0){
				_t.showLoading = true;
				_t.getUserID(function(r){
					_t.showLoading = false;
				});
			}
			
			if(_t.playerID > 0) {
				window.location.href = "main.html?userID=" + _t.playerID
			} else {
				window.location.href = "reg.html?pid=" + _t.lg("pid");
			}
		},
		A: async function() {
			var _t = this;
			_t.contract = await window.tronWeb.contract().at(_t.contractAddress);
			_t.defaultAddress = window.tronWeb.defaultAddress.base58;
			
			setInterval(function() {
				if(_t.defaultAddress != window.tronWeb.defaultAddress.base58) {
					
					_t.ls("_uID", 0);
					window.location.reload();
				}
			}, 3000);
		},
	},
	computed: {
		formatMyURL: function() {
			var url = window.location.href;
			var index = url.lastIndexOf("\/");
			str = url.substring(0, index + 1);
			return str + "index.html?pid=" + this.playerID;
		},
		formatUserURL: function() {
			var url = window.location.href;
			var index = url.lastIndexOf("\/");
			str = url.substring(0, index + 1);
			return str + "index.html?pid=" + this.userID;
		},

	},
	mounted: function() {
		return(this.GC("lang") || this.SC("lang", this.defaultLang), this.i());
	}
})