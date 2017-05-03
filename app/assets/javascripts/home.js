document.addEventListener("DOMContentLoaded", function(event) {
	var app = new Vue({
		el: "#app",
		data: {
			tasks: [
				{
					text: "Take out the trash",
					completed: false
				},
				{
					text: "Clean the lizard",
					completed: false
				},
				{
					text: "Eat medicine",
					completed: false
				}
			],
			newText: '',
			statuses: [
				"Completed",
				"Active",
				"All"
			],
			textFilter: "",
			statusFilter: ""
		},
		// the term 'this' gets the object that is one scope above the current reference frame.
		// we need to use this because otherwise, the functions below will look for a local variable
		// called 'newTask', or 'tasks' , when we call them. But really we want to find 
		// 'newTask' and 'task' , which are OUTSIDE of 'methods' and inside 'data',
		// so we need to get what's inside of data => tasks
		methods: {
			addTask: function() {
				var newTask = {
					text: this.newText,
					completed: false
				};

				if (this.newText != '') {
					this.tasks.push(newTask);
					this.newText = '';
				}
			},

			deleteTask: function(task) {
				var index = this.tasks.indexOf(task);

				if (index > -1) {
					this.tasks.splice(index, 1);
				}
			},

			deleteCompleted: function() {
				var incomplete =[];

				for (var i = 0; i < this.tasks.length; i++) {
					if (this.tasks[i]["completed"] == false) {
						console.log(this.tasks[i]);
						incomplete.push(this.tasks[i]);
					};
				};

				this.tasks = incomplete;
			},

			finishTask: function(task) {
				task.completed = !task.completed;
				console.log(task.completed);
			},

			incompleteTasks: function() {
				var sum = 0;
				for (var i = 0; i < this.tasks.length; i++) {
					if (this.tasks[i]["completed"] == false) {
						sum ++;
					}
				}

				return sum;
			},

			filterTasks: function(filter) {
				this.statusFilter = filter;
				console.log(filter);
				console.log(this.statusFilter);
			},

			isValidTask: function(task) {
				// filter conditions:
				// complete => show where task[complete] == true
				// active => show where task[complte] == false
				// all => show where (task[complete] == true || task[complete] == false)

				if (task.text.toLowerCase().includes(this.textFilter.toLowerCase()) || this.textFilter == "") {
					if (this.statusFilter == "Completed") {
						if (task.completed) {
							return true;
						};
					} else if (this.statusFilter == "Active") {
						if (task.completed == false) {
							return true;
						};
					} else if (this.statusFilter == "All" || this.statusFilter == "") {
						return true;
					};
				}
			
			}

		}
	});
});