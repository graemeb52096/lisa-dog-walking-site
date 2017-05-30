var MONTHS = ['January','February','March','April','May','June','July','August','September','October','Novermber','December'];
var WEEK_DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

var selectedAppointments = [];

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

var createDayTable = function(dateKey){
	var dayTable = document.createElement("table");
	dayTable.createCaption().innerHTML = dateKey;
	var header = dayTable.createTHead();
	var header = header.insertRow(0);
	header.insertCell(0).innerHTML = "Time";
	header.insertCell(1).innerHTML = "Service";
	return addAppointments(dateKey, dayTable);
};

var addAppointments = function(dateKey, dayTable){
	var body = dayTable.createTBody();
	var appointments = schedule[dateKey];
	for (var i=0; i<appointments.length; i++){
		var row = body.insertRow(i);
		var service = document.createElement("select");
		service.id = dateKey + appointments[i].time;
		for (var x=0; x<services.length; x++){
			var option = document.createElement("option");
			option.text = services[x].title;
			option.value = x;
			service.add(option);
		};
		var selector = document.createElement("input");
		selector.type = "checkbox";
		selector.time = appointments[i].time;
		selector.dateKey = dateKey;
		selector.onclick = function(){
			var appointmentDetails = {
				"time": this.time,
				"date": this.dateKey,
				"service": document.getElementById(dateKey + this.time).value
			};
			if (this.checked == true){
				addAppointment(appointmentDetails);
			} else {
				removeAppointment(appointmentDetails);
			};
		};
		row.insertCell(0).innerHTML = appointments[i].time;
		row.insertCell(1).appendChild(service);
		row.insertCell(2).appendChild(selector);
	};
	return dayTable;
};

var displayDaySchedule = function(dateKey){
	var modal = document.getElementById("modal");
	modal.style.display = "block";
	var scheduleDetails = document.getElementById("scheduleDetails");
	scheduleDetails.innerHTML = "";
	if (!dateHasAppointment(dateKey)){
		alert("Sorry about that, this day no longer has any appointments available!");
	} else {
		scheduleDetails.appendChild(createDayTable(dateKey));
	};
};

var hideDaySchedule = function(){
	var modal = document.getElementById("modal");
	modal.style.display = "none";
};

var addAppointment = function(appointmentDetails){
	console.log("adding");
	console.log(appointmentDetails);
};

var removeAppointment = function(appointmentDetails){
	console.log("removing");
	console.log(appointmentDetails);
};

var updateRecipt = function(){
	var appointmentSummary = document.getElementById("appointment-summary");
	appointmentSummary.style.display = "block";
	var recipt = document.getElementById("recipt");
	var selection = recipt.createTBody();
	for (var i=0; i<selectedAppointments.length; i++){
		var appointment = selectedAppointments[i]
		var row = selection.insertRow();
		row.insertCell(0) = appointment.title;
		row.insertCell(1) = appointment.cost;
		row.insertCell(2) = appointment.date;
		row.insertCell(3) = appointment.time;
	};
};
