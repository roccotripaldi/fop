<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Flight of Phrase - jQuery Plugin</title>
	<script src="jquery-1.9.1.js"></script>
    <script src="jquery-ui-1.10.3.custom.min.js"></script>
    <script src="jquery.snippet.js"></script>
    <script src="jquery.fop-1.0.2.min.js"></script>
	<script>
	$(document).ready(function(){
		//$('#rain').Fop({'phrase_class': 'rain', 'animation_type' : 'rain', 'phrase' : '$', 'density' : 20, 'duration' : 2000});
		$("#fop").Fop({ 'phrase_class' : 'fop_phrase', 'phrase' : 'Flight&nbsp;of&nbsp;Phrase' });
		$("#content").tabs();
		$(".target_tab").click(function(){
			var tab = $(this).data("tab");
			$("#content").tabs("option", "active", parseInt(tab));
		});
		
		$("#flying").Fop({
			"phrase_class" : "flying",
			"animation_type" : "chaos",
			"phrase" : "Mega&nbsp;Awesome!",
			"density" : 10,
			"duration" : 2000
		});
		
		$("#fop_challenge_button").Fop({
			"phrase_class" : "love",
			"phrase" : "&hearts;",
			"click_to_start" : false // <-important
		});
		
		$("#rain").Fop({
			"phrase_class" : "rain",
			"phrase" : "$",
			"animation_type" : "rain",
			"density" : 14,
			"duration" : 2000,
			"fop_complete" : function() {
				alert("You are all wet");
			}
	 	});
		
		$("#fop_challenge_button").click(
			function() {
				var the_text = $("#fop_challenge").val();
				if( the_text == "love" ){
					$("#fop_challenge_button").Fop("start");
				}
			}
		);
		
		$(".snip_js").snippet("javascript_dom",{style:"acid"});
		$(".snip_html").snippet("html",{style:"acid"});
		$(".snip_css").snippet("css",{style:"acid"});
		
	});
	</script>
    <link href="css/custom-theme/jquery-ui-1.10.3.custom.min.css" rel="stylesheet" media="all" />
    <link href="styles.css" rel="stylesheet" media="all" />
	<script type="text/javascript">

	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-36068463-1']);
	  _gaq.push(['_setDomainName', 'roccotripaldi.com']);
	  _gaq.push(['_trackPageview']);

	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();

	</script>
</head>
<body>

<div class="wrapper">
	<div id="top">
    	<img src="images/flight-of-phrase.png" alt="flight of phrase - typanimation for your website" />
    </div>
	<div id="content">
    <ul>
		<li><a href="#summary">Summary</a></li>
		<li><a href="#examples">Examples</a></li>
		<li><a href="#wiki">Wiki</a></li>
		<li><a href="#download">Download</a></li>
	</ul>
	
    
    <div id="summary">
    
    	<div class="main_text left">
        <p>Flight of Phrase is a <a href="http://jquery.com" target="_blank">jQuery</a> plugin authored by Rocco Tripaldi. It sends a character, word, or phrase flying across your website.</p> 
        <p>Flight of Phrase is free to use, modify, or distribute under the <a href="http://opensource.org/licenses/GPL-3.0" target="_blank">GNU General Public License</a>. But if you've enjoyed using it, please feel free to buy Rocco something from his <a href="http://www.amazon.com/registry/wishlist/1KP6FT22Z5QGL/ref=cm_sw_r_tw_ws_UP-Rrb1CZCPVG" target="_blank">Amazon wish list</a>.</p>
        <p>You should find all you need to use this plugin right here, but if you have any questions or issues, please <a href="https://github.com/roccotripaldi/fop/issues" target="_blank">post them on GitHub</a>.</p>
        </div>
        
        <div class="example right">
        <h2>Try It</h2>
        <div class="example_box">
        	<p>Go ahead, <span class="fop" id="fop">Send it flying</span></p>
            </div>
        </div>
        <div class="clear">&nbsp;</div>
    </div> <!-- END SUMMARY -->
    
	
	
	<div id="examples">
		
		<h1>Using Flight of Phrase Options</h1>
    	<div class="main_text left">
			<p>Create a CSS class to style your flying phrases.</p>
			<pre class="snip_css">
.flying {
	color: #8fc73c;
	font-size: 18px;
	text-shadow: 0px 0px 4px #000;
}</pre>
			<p>Format your HTML.</p>
			<pre class="snip_html"><?php echo htmlentities(
'<p><span id="flying">How awesome are you?</span></p>'
);?></pre>
			<p>Initialize Flight of Phrase via jQuery.</p>
        	<pre class="snip_js"><?php echo htmlentities(
'$(document).ready( funtion() {
	$("#flying").Fop({
		"phrase_class" : "flying",
		"animation_type" : "chaos",
		"phrase" : "Mega&nbsp;Awesome!",
		"duration" : 2000,
		"density" : 4
	});
})'); 
?></pre>
        </div>
        
        <div class="example right">
        <h2>Try It</h2>
        <div class="example_box">
        	<p><span id="flying">How awesome are you?</span></p>
          </div>
        </div>
        <div class="clear">&nbsp;</div><!-- END OPTIONS EXAMPLE -->
		
		
		<h1>Using Flight of Phrase Methods</h1>
    	<div class="main_text left">
			<p>By default, the flight begins when someone clicks the element. You may want to start the flight only when certain conditions are met. In this example the flight will begin only if someone types "love" in the text field. We acheive this by using the <code>click_to_start</code> option and the <code>start</code> method.</p>
			<p>Here's the HTML</p>
			<pre class="snip_html"><?php echo htmlentities(
'<p>Type "love", click "Go".</p>
<p><input type="text" name="fop_challenge" id="fop_challenge" /></p>
<p><input type="button" value="Go" id="fop_challenge_button" /></p>'
);?></pre>
			<p>And the jQuery</p>
        	<pre class="snip_js"><?php echo htmlentities(
'$(document).ready( funtion() {
	$("#fop_challenge_button").Fop({
		"phrase_class" : "love",
		"phrase" : "&hearts;",
		"click_to_start" : false // <-important
	});
	
	$("#fop_challenge_button").click(
		function() {
			var the_text = $("#fop_challenge").val();
			if( the_text == "love" ){
				$("#fop_challenge_button").Fop("start");
			}
		}
	);
})'); 
?></pre>
        </div>
        
        <div class="example right">
        <h2>Try It</h2>
        <div class="example_box">
			<p>Type "love", click "Go".</p>
			<p><input type="text" name="fop_challenge" id="fop_challenge" /></p>
			<p><input type="button" value="Go" id="fop_challenge_button" /></p>
          </div>
        </div>
		<div class="clear">&nbsp;</div><!-- END METHODS EXAMPLE -->
		
		<h1>Using Flight of Phrase Events</h1>
    	<div class="main_text left">
			<p>You can use the <code>fop_complete</code> event to do something after the flight animation is done.</p>
        	<pre class="snip_js"><?php echo htmlentities(
'$(document).ready( funtion() {
	$("#rain").Fop({
		"phrase_class" : "rain",
		"phrase" : "$",
		"animation_type" : "rain",
		"density" : 16,
		"duration" : 2000,
		"fop_complete" : function() {
			alert("You are all wet");
		}
 	});
'); 
?></pre>
        </div>
        
        <div class="example right">
        <h2>Try It</h2>
        <div class="example_box">
			<p><span id="rain">Make it RAIN!</span></p>
          </div>
        </div>
		<div class="clear">&nbsp;</div>
		
	</div><!-- END EXAMPLES -->
    
	
	
	
	
	<div id="wiki">
    	<table id="fop_table">
			<tbody>
				<tr class="section_marker">
					<th colspan="3">Options</th>
				</tr>
				<tr class="sub_section_marker">
					<th>Variable</th>
					<th>Default Value</th>
					<th>Accepted Values</th>
				</tr>
				<tr>
					<td><code>phrase</code></td>
					<td>flightOfPhrase</td>
					<td>Any string</td>
				</tr>
				<tr>
					<td><code>animation_type</code></td>
					<td>origin_burst</td>
					<td>Any exitisting Flight of Phrase animation type: <code>left</code>, <code>right</code>, <code>rise</code>, <code>rain</code>, <code>chaos</code>, <code>center_burst</code>, <code>origin_burst</code></td>
				</tr>
				<tr>
					<td><code>phrase_class</code></td>
					<td>none</td>
					<td>A CSS class name (it is applied to the flying phrases)</td>
				</tr>
				<tr>
					<td><code>duration</code></td>
					<td>1000</td>
					<td>Integer between 1000 and 5000 (miliseconds).</td>
				</tr>
				<tr>
					<td><code>density</code></td>
					<td>9</td>
					<td>Integer between 4 and 40. This determines how many phrases get flung. Animation types <code>center_burst</code> and <code>origin_burst</code> do not respond to density.</td>
				</tr>
				<tr>
					<td><code>click_to_start</code></td>
					<td>true</td>
					<td>Bolean true or false. If true, clicking the element will start the flight. If false, the flight will start only by calling the <code>start</code> method elsewhere in your script.</td>
				</tr>
				<tr class="section_marker">
					<th colspan="3">Methods</th>
				</tr>
				<tr class="sub_section_marker">
					<th>Method Name</th>
					<th colspan="2">Usage</th>
				</tr>
				<tr>
					<td><code>start</code></td>
					<td colspan="2">This method triggers the flight after initialization. It accepts no arguments.<br /><code>$("my_element").Fop("start");</code></td>
				</tr>
				
				<tr class="section_marker">
					<th colspan="3">Events</th>
				</tr>
				<tr class="sub_section_marker">
					<th>Event Name</th>
					<th colspan="2">Usage</th>
				</tr>
				<tr>
					<td><code>fop_complete</code></td>
					<td colspan="2">Define on initialization:<br /><code>$("my_element").Fop("phrase" : "my phrase", "fop_complete" : function() { alert ("done"); })</code><br /><br />
						Or define after initialization:<br /><code>$("my_element").on("fop_complete", function(){ alert("done"); })</code></td>
				</tr>
			</tbody>
		</table>
	</div><!-- END WIKI -->

	
	
	 <div id="download">
		 
		 <div class="main_text left">
        	 <p>Use the link on the right to download the latest, minified version of Flight of Phrase.</p>
			 <p>Go to <a href="https://github.com/roccotripaldi/fop" target="_blank">GitHub</a> to post a question, bug, idea, or to fork it.</p>
			 <p>If you've enjoyed using Flight of Phrase, consider <a href="http://www.amazon.com/registry/wishlist/1KP6FT22Z5QGL/ref=cm_sw_r_tw_ws_UP-Rrb1CZCPVG" target="_blank">buying Rocco a gift</a>.</p>
        </div>
        
        <div class="example right">
        <div class="example_box">
        	<p><a href="/download/">Download<br />jquery.fop-1.0.2.min.js</a></p>
            </div>
        </div>
		
        <div class="clear">&nbsp;</div>
	</div>
    
    </div>
	<div id="footer">
		Flight of Phrase - a jQuery plugin by <a href="http://www.roccotripaldi.com/">Rocco Tripaldi </a>
	</div>
</div>

</body>
</html>