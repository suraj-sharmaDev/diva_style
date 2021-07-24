class AbortController {
	signal = false;
	_reboot(){
		this.signal = true;
		return this.signal;		
	}
	_abort(){
		this.signal = true;
		return this.signal;
	}
	_signal(){
		return this.signal;
	}

}

export default AbortController;