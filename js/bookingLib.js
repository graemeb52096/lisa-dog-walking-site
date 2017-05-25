var MONTHS = ['January','February','March','April','May','June','July','August','September','October','Novermber','December'];
var WEEK_DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

var dateHasAppointment = function(dateKey){
	if (dateKey in schedule){
		return(true);
	};
 	return(false);
};

var initCalendar = function(month, year){
	var calendar = document.createElement("table");
	calendar.classList.add("days");
	var caption = calendar.createCaption();
	caption.innerHTML = MONTHS[month-1];
	var header = calendar.createTHead();
	var row = header.insertRow(0);
	for (var i=0; i<7; i++){
		var temp = row.insertCell(i);
		temp.innerHTML = WEEK_DAYS[i];
	};
	//element.appendChild(calendar);
	return addDaysToCalendar(calendar, month, year);
};

var addDaysToCalendar = function(calendar, month, year){
	var body = calendar.createTBody();
	var calendarBody = calendar.createTBody();
	var daysInMonth = new Date(year, month, 0).getDate();
	console.log(daysInMonth);
	console.log(new Date(year, month, 0));
	var firstDay = new Date(year, month, 1).getDay();
	var row = document.createElement("tr");
	var dayOfWeek = 0;
	while (dayOfWeek<firstDay){
		var emptyDate = document.createElement("td");
		row.appendChild(emptyDate);
		dayOfWeek++;
	};
	for (var i=1; i<daysInMonth+1; i++){
		if (dayOfWeek % 7 == 0){
			body.appendChild(row);
			row = document.createElement("tr");
			dayOfWeek = 0;
		};
		var tempDate = new Date(year, month, i);
		var date = document.createElement("td");
		var dateButton = document.createElement("button");
		dateButton.classList.add("date-picker");
		dateButton.innerHTML = i;
		var day = tempDate.getDate();
		var month = tempDate.getMonth();
		var year = tempDate.getFullYear();
		var dateKey = month + "/" + day + "/" + year;
		dateButton.value = dateKey;
		if (dateHasAppointment(dateKey)){
			dateButton.onclick = function(){displayDaySchedule(this.value)};
		} else {
			dateButton.classList.add("unavailable");
		};
		date.appendChild(dateButton);
		row.appendChild(date);
		dayOfWeek++;
	};
	body.appendChild(row);
	return (calendar);
};

var displayDaySchedule = function(dateKey){
	var modal = document.getElementById("modal");
	modal.style.display = "block";
	var scheduleDetails = document.getElementById("scheduleDetails");
	scheduleDetails.innerHTML = "";
	if (!dateHasAppointment(dateKey)){
		alert("Sorry about that, this day no longer has any appointments available!");
	} else {
		var appointments = schedule[dateKey];
		var bookingForm = document.createElement("form");
		bookingForm.classList.add("form-control");
		var head = document.createElement("h2");
		head.innerHTML = "Select times";
		bookingForm.appendChild(head);
		for (var i=0; i<appointments.length; i++){
			var appointmentSlot = document.createElement("div");
			appointmentSlot.classList.add("form-group");
			var label = document.createElement("label");
			label.innerHTML = appointments[i].time + ": ";
			appointmentSlot.appendChild(label);
			var appointmentType = document.createElement("select");
			var option = document.createElement("option");
			option.text = "Select Service"
			appointmentType.add(option);
			for (var x=0; x<services.length; x++){
				var option = document.createElement("option");
				option.text = services[x].title;
				appointmentType.add(option);
			};
			var appointmentSelected = document.createElement("input");
			appointmentSelected.type = "checkbox";
			appointmentSlot.appendChild(appointmentType);
			appointmentSlot.appendChild(appointmentSelected);
			bookingForm.appendChild(appointmentSlot);
		};
		console.log(appointments);
		scheduleDetails.appendChild(bookingForm);
		//alert("has appointment");
	};
};

var hideDaySchedule = function(){
	var modal = document.getElementById("modal");
	modal.style.display = "none";
};

var addAppointment = function(appointmentDetails){

};

var removeAppointment = function(){};
