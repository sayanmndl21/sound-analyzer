$(document).ready(function(){

	  //  Initial State START
	
	var deviceStatus = false;
	var rightLeg = false;
	var leftLeg = false;
	var sitStatus = false;
	var mode = false;
	$(".alert").css("background-color","#A9A9A9");
	

	$("#deviceStatus").click(function(){
		toggleDeviceState();
	});


	// ******** Initial State END ****
	function toggleDeviceState()
	{
		
		deviceStatus = !deviceStatus;
		console.log(deviceStatus);
		if(deviceStatus)
		{
			// Device Turned On State
			var data = {};
			data['deviceStatus'] = deviceStatus ;
			data['value'] = 1;

			console.log(JSON.stringify(data));
			$.ajax({

				type:'POST',
				url: '/ping',
				contentType: "application/json; charset=utf-8",
				data:JSON.stringify(data),
				dataType:'json',
				
				success: function(response){

					if(response == "-1\r")
					{
						var data = {};
						data['deviceStatus'] = deviceStatus ;
						data['value'] = 2;
						$.ajax({

							type:'POST',
							url: '/ping',
							contentType: "application/json; charset=utf-8",
							data:JSON.stringify(data),
							dataType:'json',
							
							success: function(response){
								if(response == "-2\r")
								{
									$(".alert").css("background-color","#0066ff");
									$(".mode").css("background-color","#6286c4");
									$(".mode").html("<span style='margin-left:20px; font-size:2.4em; color:white; font-face:Raleway'><b>m</b></span>");
									mode = "manual";
								}
								else
								{
									deviceStatus = !deviceStatus;
								}

								
								console.log(response);
							},
							error: function(response){
								deviceStatus = !deviceStatus;
							}
						});
					}
					else
					{
						deviceStatus = !deviceStatus;
					}

					
					console.log(response);
				},
				error: function(response){
					deviceStatus = !deviceStatus;
				}
			});
			// console.log(!mode);


		}
		else
		{
			// Device Turned OFF State
			var data = {};
			data['deviceStatus'] = !deviceStatus ;
			data['value'] = 8;

			console.log(JSON.stringify(data));
			$.ajax({

				type:'POST',
				url: '/ping',
				contentType: "application/json; charset=utf-8",
				data:JSON.stringify(data),
				dataType:'json',
				
				success: function(response){
					if(response == "-8\r")
					{
						console.log("Device Off");	
					}

					
					console.log(response);
				}
			});

			$(".alert").css("background-color","#A9A9A9");
			$(".buttonright").css("background-image","url('static/assets/pics/rightoff.png')")
			rightLeg = false;
			$(".buttonleft").css("background-image","url('static/assets/pics/leftoff.png')")
			leftLeg = false;
			$(".sit").css("background-image","url('static/assets/pics/chairoff.png')")
			sitStatus = false;
			$(".mode").css("background-color","#A9A9A9");
			$(".mode").html('');
			mode = false;
			
		}
	}

	// Clicking States

	$(".buttonright").click(function(){
		if(deviceStatus && !leftLeg && !sitStatus && (mode == "manual"))
		{
			var data = {};
			data['deviceStatus'] = deviceStatus ;
			data['value'] = 4;

			console.log(JSON.stringify(data));
			$.ajax({

				type:'POST',
				url: '/ping',
				contentType: "application/json; charset=utf-8",
				data:JSON.stringify(data),
				dataType:'json',
				
				success: function(response){
					if(response == "-4\r")
					{
						$(".buttonright").css("background-image","url('static/assets/pics/righton.png')");
						rightLeg = true;	
					}

					
					console.log(response);
				}
			});
			setTimeout(function(){
				$(".buttonright").css("background-image","url('static/assets/pics/rightoff.png')")
				rightLeg = false;		
			},5000);
		}
			
		else
		{
			$(".buttonright").css("background-image","url('static/assets/pics/rightoff.png')")
			rightLeg = false;
		}
			
	})
	$(".buttonleft").click(function(){
		if(deviceStatus && !rightLeg && !sitStatus && (mode == "manual"))
		{
			
			var data = {};
			data['deviceStatus'] = deviceStatus ;
			data['value'] = 5;

			console.log(JSON.stringify(data));
			$.ajax({

				type:'POST',
				url: '/ping',
				contentType: "application/json; charset=utf-8",
				data:JSON.stringify(data),
				dataType:'json',
				
				success: function(response){
					if(response == "-5\r")
					{
						$(".buttonleft").css("background-image","url('static/assets/pics/lefton.png')");
						leftLeg = true;	
					}

					
					console.log(response);
				}
			});
			setTimeout(function(){
				$(".buttonleft").css("background-image","url('static/assets/pics/leftoff.png')")
				leftLeg = false;		
			},5000);


		}
			
		else
		{
			$(".buttonleft").css("background-image","url('static/assets/pics/leftoff.png')")
			leftLeg = false;
		}
			
	})
	$(".sit").click(function(){
		if(deviceStatus && !rightLeg && !leftLeg && !sitStatus && (mode == "manual"))
		{
			
			var data = {};
			data['deviceStatus'] = deviceStatus ;
			data['value'] = 6;

			console.log(JSON.stringify(data));
			$.ajax({

				type:'POST',
				url: '/ping',
				contentType: "application/json; charset=utf-8",
				data:JSON.stringify(data),
				dataType:'json',
				
				success: function(response){
					if(response == "-6\r")
					{
						$(".sit").css("background-image","url('static/assets/pics/chairon.png')");
						sitStatus = true;	
					}

					
					console.log(response);
				}
			});
			


		}
			
		else
		{
			var data = {};
			data['deviceStatus'] = deviceStatus ;
			data['value'] = 7;

			console.log(JSON.stringify(data));
			$.ajax({

				type:'POST',
				url: '/ping',
				contentType: "application/json; charset=utf-8",
				data:JSON.stringify(data),
				dataType:'json',
				
				success: function(response){
					if(response == "-7\r")
					{
						$(".sit").css("background-image","url('static/assets/pics/chairoff.png')")
						sitStatus = false;
					}

					
					console.log(response);
				}
			});

			
		}
			
	})
	$(".mode").click(function(){
		console.log(deviceStatus+" "+!rightLeg+" "+!leftLeg+" "+mode);
		if(deviceStatus && !rightLeg && !leftLeg && (mode != false))
		{
			if(mode == "automatic")
			{
				var data = {};
				data['deviceStatus'] = deviceStatus ;
				data['value'] = 2;

				console.log(JSON.stringify(data));
				$.ajax({

					type:'POST',
					url: '/ping',
					contentType: "application/json; charset=utf-8",
					data:JSON.stringify(data),
					dataType:'json',
					
					success: function(response){
						if(response == "-2\r")
						{
							$(".mode").css("background-color","#6286c4");
							$(".mode").html("<span style='margin-left:20px; font-size:2.4em; color:white; font-family:Raleway'><b>m</b></span>");
							mode = "manual";	
						}

						
						console.log(response);
					}
				});
				

					
			}
			else if(mode == "manual")
			{
				var data = {};
				data['deviceStatus'] = deviceStatus ;
				data['value'] = 3;

				console.log(JSON.stringify(data));
				$.ajax({

					type:'POST',
					url: '/ping',
					contentType: "application/json; charset=utf-8",
					data:JSON.stringify(data),
					dataType:'json',
					
					success: function(response){
						if(response == "-3\r")
						{
							$(".mode").css({"background-color":"#c46281","padding-top":"6px"});
							$(".mode").html("<span style='margin-left:24px; font-size:2.4em; color:white; font-family:Raleway'><b>a</b></span>");
							mode = "automatic";	
						}

						
						console.log(response);
					}
				});
			}
			
		}
			
		
			
	});

	$(".reboot").click(function(){

		if(!rightLeg && !leftLeg)
		{
			
			var data = {};
				data['deviceStatus'] = deviceStatus ;
				data['value'] = 9;

				console.log(JSON.stringify(data));
				$.ajax({

					type:'POST',
					url: '/ping',
					contentType: "application/json; charset=utf-8",
					data:JSON.stringify(data),
					dataType:'json',
					
					success: function(response){
						if(response == "-9\r")
						{
							alert("PI Updated");
						}

						
						console.log(response);
					}
				});
		}

	});




});
