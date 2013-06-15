/*
 * FlightOfPhrase
 * Copyright (c) 2013 Rocco Tripaldi < http://www.roccotripaldi.com >
 * Licensed under the GPL < http://www.opensource.org/licenses/gpl-license.php > license.
 * 
 * Version 0.1.2
 *
 */
;(function($){
	var fop_timer, animation_timer, pageX, pageY;
    $(document).mousemove(function(e){
		pageX = e.clientX;
		pageY = e.clientY;
     }); 
	var instances = 0;
	var fop_config = {
		box_styles : {
			"position" : "fixed",
			"width" : "100%",
			"height" : "100%",
			"top" : "0px",
			"left" : "0px",
			"z-index" : "100000",
		},
		box_html : "<div id='flight_of_phrase'></div>",
		box_id : "flight_of_phrase",
		animation_interval : 50,
		phrase_styles : {
			"position" : "absolute",
		},
		test_phrase_styles : {
			"position" : "absolute",
			"visibility" : "hidden",
		},
		num_phrase : 0,
		phrase_width : 0,
		phrase_height : 0,
		phrase_font_size: 0,
		mouse_x : 0,
		mouse_y : 0,
		center_x : 0,
		center_y : 0,
		x_offset : 0,
		y_offset : 0,
		origin_x : 0,
		origin_y : 0,
		sector : {
			1 : new Array(),
			2 : new Array(),
			3 : new Array(),
			4 : new Array(),
		},
		num_sectors : 4,
		sector_padding : 100,
		max_density : 40,
		min_density : 4,
		max_duration : 5000,
		min_duration : 1000,
	}

	var defaults = {
		phrase :  'FlightOfPhrase',
		animation_type : "origin_burst",
		phrase_class : "",
		duration : 1000,
		density : 9,
		click_to_start : true,
		fop_complete: function(){},
	}
	
	var oa = new Array();
	
	var methods = {
		init : function (options) {
			instances++;
			$(this).data("instance_id", instances);
			$(this).addClass("fop" + instances);
			oa[instances] = $.extend({}, defaults, options);
			methods.sanitize_options( instances );
			if(oa[instances]['click_to_start']) {
				$(this).click(function(e) {
					 $(this).Fop("start");
				});
			}
			$(this).on("fop_complete", function(){ 
				var id = $(this).data("instance_id");
				oa[id]["fop_complete"]();
			});
		},
		
		sanitize_options : function(instance_id) {
			if( !methods.animations[ oa[instance_id]["animation_type"] ]) {
				oa[instance_id]["animation_type"] = defaults["animation_type"];
			}
			oa[instance_id]["density"] = parseInt(oa[instance_id]["density"]);
			if(isNaN(oa[instance_id]["density"])) {
				oa[instance_id]["density"] = defaults["density"];
			}
			if(oa[instance_id]["density"] > fop_config["max_density"] || oa[instance_id]["density"] < fop_config["min_density"]) {
				oa[instance_id]["density"] = fop_config["min_density"];
			}
			oa[instance_id]["duration"] = parseInt( oa[instance_id]["duration"]);
			if(isNaN(oa[instance_id]["duration"])) {
				oa[instance_id]["duration"] = defaults["duration"];
			}
			if(oa[instance_id]["duration"] > fop_config["max_duration"] || oa[instance_id]["duration"] < fop_config["min_duration"]) {
				oa[instance_id]["duration"] = fop_config["min_duration"];
			}
			if( typeof(oa[instance_id]["click_to_start"]) != "boolean" ) {
				oa[instance_id]["click_to_start"] = true;
			}
			if( typeof(oa[instance_id]["fop_complete"]) != "function" ) {
				oa[instance_id]["fop_complete"] = defaults["fop_complete"];
			}
		},
		
		start : function() {
			var instance_id = $(this).data("instance_id");
			$( "body" ).append( fop_config["box_html"] );
			$( "#" + fop_config["box_id"] ).css( fop_config["box_styles"] );
			methods.calibrate(oa[instance_id], instance_id);
			methods.animations[ oa[instance_id]["animation_type"] ](oa[instance_id]);
		},
		
		configure_phrase : function( options ) {
			fop_config["num_phrase"]++;
			var phrase_id = fop_config["num_phrase"].toString();
			var phrase_options = {
				phrase_id : phrase_id,
				default_styles : fop_config["phrase_styles"],
				phrase : options["phrase"],
				phrase_class : options["phrase_class"]
			};
			methods.append_phrase( phrase_options );
			var new_font_size = fop_config["phrase_font_size"] * options["ratio"];
			$("#"+ fop_config["box_id"] + " #" + phrase_id).css({ 
				top : options["y"],
				left : options["x"],
				opacity : options["alpha"],
				fontSize : new_font_size.toString() + "px"
			});
			$("#"+ fop_config["box_id"] + " #" + phrase_id).data( {
				"speed" : options["speed"],
				"dir" : options["dir"]
			});
		},
		
		remove_phrase : function(phrase_id) {
			$("#"+ fop_config["box_id"] + " #" + phrase_id).detach();
		},
		
		append_phrase : function(options) {
			var phrase = "<span id='"+options["phrase_id"]+"' class='phrase'>" + options["phrase"] + "</span>";
			$("#"+fop_config["box_id"]).append(phrase);
			$("#"+ fop_config["box_id"] + " #" + options["phrase_id"]).css(options["default_styles"]);
			$("#"+ fop_config["box_id"] + " #" + options["phrase_id"]).addClass( options["phrase_class"] );
		}, 
		
		fly : function() {
			$("#" + fop_config["box_id"] + " .phrase").each(function() {
				var data = $(this).data();
				var diag_speed = parseInt(Math.sqrt( ((data.speed * data.speed) / 2) ));
				switch( data.dir ) {
					case 1:
						$(this).animate({ top : "-=" + data.speed.toString() + "px"}, 0 );
						break;
					case 2:
						$(this).animate({
							top : "-=" + diag_speed.toString() + "px",
							left : "+=" + diag_speed.toString() + "px",
						}, 0);
						break;
					case 3:
						$(this).animate({ left : "+=" + data.speed.toString() + "px"}, 0 );
						break;
					case 4:
						$(this).animate({
							top : "+=" + diag_speed.toString() + "px",
							left : "+=" + diag_speed.toString() + "px",
						}, 0);
						break;
					case 5:
						$(this).animate({ top : "+=" + data.speed.toString() + "px"}, 0 );
						break;
					case 6:
						$(this).animate({
							top : "+=" + diag_speed.toString() + "px",
							left : "-=" + diag_speed.toString() + "px",
						}, 0);
						break;
					case 7:
						$(this).animate({ left : "-=" + data.speed.toString() + "px"}, 0 );
						break;
					case 8:
						$(this).animate({
							top : "-=" + diag_speed.toString() + "px",
							left : "-=" + diag_speed.toString() + "px",
						}, 0);
						break;
				}
			});
		},
		
		calibrate : function(settings, instance_id) {
			fop_config["mouse_x"] = pageX;
			fop_config["mouse_y"] = pageY;
			var options = {
				phrase_id : "test",
				default_styles : fop_config["test_phrase_styles"],
				phrase : settings["phrase"],
				phrase_class : settings["phrase_class"],
			};
			methods.append_phrase( options );
			var phrase_width = $("#"+ fop_config["box_id"] + " #test").width();
			var phrase_height = $("#"+ fop_config["box_id"] + " #test").height();
			var font_size = parseInt($("#"+ fop_config["box_id"] + " #test").css("font-size"));
			fop_config["phrase_width"] = phrase_width;
			fop_config["phrase_height"] = phrase_height;
			methods.remove_phrase("test");
			var window_width = $(window).width();
			var window_height = $(window).height();
			fop_config["phrase_font_size"] = font_size;
			fop_config["center_x"] = (window_width - phrase_width) / 2;
			fop_config["center_y"] = (window_height - phrase_height) / 2;
			fop_config["x_offset"] = (window_width / 2) - fop_config["center_x"];
			fop_config["y_offset"] = (window_height / 2) - fop_config["center_y"];
			fop_config["origin_x"] = fop_config["mouse_x"] - fop_config["x_offset"];
			fop_config["origin_y"] = fop_config["mouse_y"] - fop_config["y_offset"];
			// sectors are [minX, maxX, minY, maxY]
			var top = 0 - fop_config["sector_padding"];
			var center = window_width / 2;
			var right = window_width + fop_config["sector_padding"];
			var middle = window_height / 2;
			var bottom = window_height + fop_config["sector_padding"];
			fop_config['sector'][1] = [top, center, top, middle];
			fop_config['sector'][2] = [center, right, top, middle];
			fop_config['sector'][3] = [top, center, middle, bottom];
			fop_config['sector'][4] = [center, right, middle, bottom];
			fop_timer = setTimeout(function(){ methods.destroy(instance_id); }, settings["duration"]);
			animation_timer = setInterval( function(){ methods.fly(); }, fop_config["animation_interval"] );
		},
		
		destroy : function(instance_id) {
			$("#" + fop_config["box_id"]).fadeOut(
				300, 
				function() { 
					clearInterval(animation_timer);
					$("#" + fop_config["box_id"]).detach();
					$(".fop" + instance_id).trigger('fop_complete');
			});
		},
		
		populate_sectors : function(dir, settings) {

			for( var i = 1; i <= fop_config['num_sectors']; i++) {
				var ratio = Math.floor(Math.random()*5) + 1;
				var options = {
				 	ratio : ratio,
					speed : 10 * ratio,
		x : Math.floor( Math.random() * (fop_config['sector'][i][1] - fop_config['sector'][i][0]) ) + fop_config['sector'][i][0],
		y : Math.floor( Math.random() * (fop_config['sector'][i][3] - fop_config['sector'][i][2]) ) + fop_config['sector'][i][2],
					alpha : ratio / 2,
					dir : dir,
					phrase : settings['phrase'],
					phrase_class : settings['phrase_class'],
				};
				if(dir==9) {
					options['dir'] = Math.floor(Math.random() * 8) + 1;
				};
				methods.configure_phrase( options );
			}
		},
		
		animations : {
			left : function(settings) {
				// populate each sector based on phrase density
				// give direction 3, or east
				for(var a = 0; a < settings['density']; a++) {
					methods.populate_sectors(3, settings);
				}
			},
			
			right : function(settings) {
				// populate each sector based on phrase density
				// give direction 7, or west
				for(var a = 0; a < settings['density']; a++) {
					methods.populate_sectors(7, settings);
				}
			}, 

			chaos : function(settings) {
				// populate each sector based on phrase density
				// give direction 9, or random
				for(var a = 0; a < settings['density']; a++) {
					methods.populate_sectors(9,settings);
				}
			}, 
			
			rise : function(settings) {
				// populate each sector based on phrase density
				// give direction 9, or random
				for(var a = 0; a < settings['density']; a++) {
					methods.populate_sectors(1,settings);
				}
			}, 
			
			rain : function(settings) {
				// populate each sector based on phrase density
				// give direction 9, or random
				for(var a = 0; a < settings['density']; a++) {
					methods.populate_sectors(5, settings);
				}
			}, 
			
			center_burst : function(settings) {
				// loop through compass points and add a phrase at stage center
				// give each phrase a direction of current compass point
				for(var i = 1; i < 9; i++) {
					var options = {
						speed : 30,
						ratio : 1,
						x : fop_config["center_x"],
						y : fop_config["center_y"],
						dir : i,
						alpha : 1,
						phrase : settings['phrase'],
						phrase_class : settings['phrase_class'],
					}
					methods.configure_phrase( options );
				}
			},
		
			origin_burst : function(settings) {
				// loop through compass points and add a phrase at user supplied mouse origin 
				// give each phrase a direction of current compass point
				for(var i = 1; i < 9; i++) {
					var options = {
						speed : 30,
						ratio : 1,
						x : fop_config["origin_x"],
						y : fop_config["origin_y"],
						dir : i,
						alpha : 1,
						phrase : settings['phrase'],
						phrase_class : settings['phrase_class'],
					}
					methods.configure_phrase( options );
				}
			}
		}
	};
	
	$.fn.Fop = function( method ) {
		// Method calling logic
	    if ( methods[method] ) {
	      return methods[ method ].apply( $(this), Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	      return methods.init.apply( $(this), arguments );
	    } else {
	      $.error( 'Method ' +  method + ' does not exist.' );
	    } 
	}
})(jQuery);
