/*
 * FlightOfPhrase
 * Copyright (c) 2013 Rocco Tripaldi < http://www.roccotripaldi.com >
 * Licensed under the GPL < http://www.opensource.org/licenses/gpl-license.php > license.
 * 
 * Version 0.1.2
 *
 */
;(function($){
	var fop_timer, animation_timer;
	
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
	}
	
	var methods = {
		init : function (options) {
			 $(this).css("cursor", "pointer");
			var defaults = {
				phrase :  'Flight Of Phrase',
				animation_type : "origin_burst",
				phrase_class : "",
				duration : 1000,
				density : 9,
			}
			var settings = $.extend({}, defaults, options);
			
			if( !methods.animations[ settings["animation_type"] ]) {
				settings["animation_type"] = defaults["animation_type"];
			}
			settings["density"] = parseInt(settings["density"]);
			if(isNaN(settings["density"])) {
				settings["density"] = 9;
			}
			if(settings["density"] > 42) {
				settings["density"] = 42;
			}
			settings["duration"] = parseInt( settings["duration"]);
			if(isNaN(settings["duration"])) {
				settings["duration"] = 1000;
			}
			if(settings["duration"] > 5000) {
				settings["duration"] = 5000;
			}
			console.log(settings);
			 $( this ).click(function(e) {
				$( "body" ).append( fop_config["box_html"] );
				$( "#" + fop_config["box_id"] ).css( fop_config["box_styles"] );
				methods.calibrate(e, settings);
				methods.animations[ settings["animation_type"] ](settings);
			});
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
		
		calibrate : function(mouse_event, settings) {
			fop_config["mouse_x"] = mouse_event.pageX;
			fop_config["mouse_y"] = mouse_event.pageY;
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
			fop_config['sector'][1] = [0, window_width / 2, 0, window_height / 2];
			fop_config['sector'][2] = [window_width / 2, window_width, 0, window_height / 2];
			fop_config['sector'][3] = [0, window_width / 2, window_height / 2, window_height];
			fop_config['sector'][4] = [window_width / 2, window_width, window_height / 2, window_height];
			fop_timer = setTimeout(function(){ methods.destroy(); }, settings["duration"]);
			animation_timer = setInterval( function(){ methods.fly(); }, fop_config["animation_interval"] );
			console.log(fop_config);
		},
		
		destroy : function() {
			$("#" + fop_config["box_id"]).fadeOut(
				300, 
				function() { 
					clearInterval(animation_timer);
					$("#" + fop_config["box_id"]).detach(); 
			});
		},
		
		populate_sectors : function(dir, settings) {

			for( var i = 1; i < fop_config['num_sectors']; i++) {
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
			left_2d : function(settings) {
				// populate each sector based on phrase density
				// give direction 3, or east
				for(var a = 0; a < settings['density']; a++) {
					methods.populate_sectors(3, settings);
				}
			},
			
			right_2d : function(settings) {
				// populate each sector based on phrase density
				// give direction 7, or west
				for(var a = 0; a < settings['density']; a++) {
					methods.populate_sectors(7, settings);
				}
			}, 

			random_2d : function(settings) {
				// populate each sector based on phrase density
				// give direction 9, or random
				for(var a = 0; a < settings['density']; a++) {
					methods.populate_sectors(9,settings);
				}
			}, 
			
			top_2d : function(settings) {
				// populate each sector based on phrase density
				// give direction 9, or random
				for(var a = 0; a < settings['density']; a++) {
					methods.populate_sectors(1,settings);
				}
			}, 
			
			bottom_2d : function(settings) {
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
	      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
	    } 
	}
})(jQuery);
