// shoutem animation
function ShoutemAnimation(p_container_selector) {

	this.$container = $(p_container_selector);
	this.particles = [];
	this.maxParticles = 10;
	this.paused = false;
	this.time = null;
	
	this.getTranslateY = function(p_$el) {
		return parseFloat(p_$el.css('transform').split(/[()]/)[1].split(',')[5].split(" ").join(""));
	}
		
	this.removeAllParticles = function() {
		while (this.particles.length) {
			var p = this.particles.pop();
			p.$e.remove();
		}
	}

	this.manageParticles = function() {
		
		// calculate number for particles
		this.maxParticles = Math.max(5, Math.round(this.$container.width() * this.$container.height() / 90000));
			
		// delete superfluous particles
		while (this.particles.length > this.maxParticles) {
			var p = this.particles.pop();
			p.$e.remove();
		}
		
		// reset off-screen particles 
		for (var i = 0; i < this.particles.length; i++) {
			var p = this.particles[i];
//				if (parseInt(p.$e.css("top").split("px")[0]) < - (parseInt(p.$e.css("height").split("px")[0])) - 40 ) {
			if (this.getTranslateY(p.$e) < - (parseInt(p.$e.css("height").split("px")[0])) - 40 ) {
				if (p.type != 5) {
					p.$e.removeClass("particle-" + p.type);
					p.type = Math.ceil(Math.random() * 4);
					p.$e.addClass("particle-" + p.type);
				}
				p.rotation = 0;
//					p.$e.css({ top: (this.$container.height() + parseInt(p.$e.css("height").split("px")[0])) + "px", left: ((this.$container.width() - 75) * Math.random())  +"px" });
				p.$e.css({ transform: "translateY(" + Math.round(this.$container.height() + parseInt(p.$e.css("height").split("px")[0])) + "px)", left: ((this.$container.width() - 75) * Math.random())  +"px" });
				p.velocity = 1 + Math.random() * 2;
				if (p.type == 1 || p.type == 4) p.velocity *= 0.50; // slow down small particles
			}  
		}
		
		// create missing particles
		while (this.particles.length < this.maxParticles) {
			
			var p = {};
			this.particles.push(p);

			// shuttle
			if (this.particles.length == 1) {
				p.type = 5;
				p.$e = $('<div class="particle particle-' + p.type + '"><div class="thrust-line thrust-line-1"></div><div class="thrust-line thrust-line-2"></div><div class="thrust-line thrust-line-3"></div><div class="thrust-line thrust-line-4"></div><div class="thrust-line thrust-line-5"></div><div class="thrust-line thrust-line-6"></div></div>');
			}
			// other particles
			else {
				p.type = Math.ceil(Math.random() * 4);
				p.$e = $('<div class="particle particle-' + p.type + '"></div>');
			}
			p.rotation = 0;
					
//				p.$e.css({ left: ((this.$container.width() - 75) * Math.random())  +"px", top: (this.$container.height() * Math.random() + this.$container.height()) + "px" });
			p.$e.css({ left: ((this.$container.width() - 75) * Math.random())  +"px", transform: "translateY(" + Math.round(this.$container.height() * Math.random() + this.$container.height()) + "px)" });
			p.velocity = 1 + Math.random();
			if (p.type == 1 || p.type == 4) p.velocity *= 0.5; // slow down small particles
			this.$container.append(p.$e);
			
		}
		
	}
	
	this.animate = function() {
		
		var _this = this;
	    requestAnimationFrame(function() { _this.animate(); });
	    
	    if (this.paused) return;
	    
	    var now = new Date().getTime(),
	        dt = now - (this.time || now);
	        
	    // too long timeout, probably browser tab switch
	    if (dt > 1000) { dt = 0; }
	 
	    this.time = now;

		// animate particles forward
		for (var i = 0; i < this.particles.length; i++) {
			var $e = this.particles[i].$e;
//				$e.css({ top: ($e.css("top").split("px")[0] - dt * (this.particles[i].velocity) / 20) + "px" });
			if (this.particles[i].type == 3 || this.particles[i].type == 4) {
				this.particles[i].rotation += dt/20;
				if (this.particles[i].rotation > 360) {
					this.particles[i].rotation -= 360;
				}
			}
			$e.css({ transform: "translateY(" + (Math.round((this.getTranslateY($e) - dt * (this.particles[i].velocity) / 20) * 50 ))/50 + "px) rotate("+ this.particles[i].rotation + "deg)" });
			
		}
		
		this.manageParticles();
	    
	}
	
	
	this.animate();
	
}
