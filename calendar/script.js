!function() {

  var today = moment();

  function Calendar(selector) {
    this.el = document.querySelector(selector);
    this.current = moment().date(1);
    this.createCalendar();
    var current = document.querySelector('.today');
  }
  
  Calendar.prototype.createCalendar = function() {
    //Fill Header with Month Name
    this.fillHeader();
    
    //Add event listeners
    this.addListeners();

    //Create Month
    this.month = document.querySelector('.month');
    this.fillMonth(this.month);
    this.month.className = 'month new';
  }
  
  Calendar.prototype.drawCalendar = function() {
    //Create Header
    this.fillHeader();
    
    //Draw Month
    this.addMonth();
  }

  Calendar.prototype.addListeners = function() {
    var self = this;
    var next = document.querySelector('.controller-next');
    next.addEventListener('click', function() { self.nextMonth(); });

    var prev = document.querySelector('.controller-prev');
    prev.addEventListener('click', function() { self.prevMonth(); });
  }
  
  Calendar.prototype.fillHeader = function() {
    var self = this;
    this.nameWrapper = document.querySelector('.name-wrapper');
    this.monthName = document.querySelector('.month-name');
    this.oldMonthName = this.monthName;
    
    this.oldMonthName.className = 'month-name out';
    self.oldMonthName.parentNode.removeChild(self.oldMonthName);
    self.monthName = createElement('h1', 'month-name');
    self.monthName.innerHTML = this.current.format('MMMM YYYY');
    self.nameWrapper.appendChild(self.monthName);
    self.monthName.className = 'month-name in';
  }

  Calendar.prototype.fillMonth = function(month) {
    this.month = month;
    this.backFill();
    this.currentMonth();
    this.fowardFill();
  }

  Calendar.prototype.addMonth = function() {
    var self = this;
    this.month = document.querySelector('.month');
    this.monthWrapper = document.querySelector('.month-wrapper');
    this.oldMonth = this.month;
    
    this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
    self.oldMonth.parentNode.removeChild(self.oldMonth);
    self.month = createElement('div', 'month');
    self.fillMonth(self.month);
    self.monthWrapper.appendChild(self.month);
      self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
  }

  Calendar.prototype.backFill = function() {
    var clone = this.current.clone();
    var dayOfWeek = clone.day();

    if(!dayOfWeek) { return; }

    clone.subtract('days', dayOfWeek+1);

    for(var i = dayOfWeek; i > 0 ; i--) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.fowardFill = function() {
    var clone = this.current.clone().add('months', 1).subtract('days', 1);
    var dayOfWeek = clone.day();

    if(dayOfWeek === 6) { return; }

    for(var i = dayOfWeek; i < 6 ; i++) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.currentMonth = function() {
    var clone = this.current.clone();

    while(clone.month() === this.current.month()) {
      this.drawDay(clone);
      clone.add('days', 1);
    }
  }

  Calendar.prototype.getWeek = function(day) {
    if(!this.week || day.day() === 0) {
      this.week = createElement('div', 'week');
      this.month.appendChild(this.week);
    }
  }

  Calendar.prototype.drawDay = function(day) {
    var self = this;
    this.getWeek(day);

    //Outer Day
    var outer = createElement('div', this.getDayClass(day));

    //Day Name
    var name = createElement('div', 'day-name', day.format('ddd'));

    //Day Number
    var number = createElement('div', 'day-number', day.format('DD'));

    // outer.appendChild(name);
    outer.appendChild(number);
    this.week.appendChild(outer);
  }

  Calendar.prototype.getDayClass = function(day) {
    classes = ['day'];
    if(day.month() !== this.current.month()) {
      classes.push('other');
    } else if (today.isSame(day, 'day')) {
      classes.push('today');
    }
    return classes.join(' ');
  }

  Calendar.prototype.nextMonth = function() {
    this.current.add('months', 1);
    this.next = true; 
    this.drawCalendar();
  }

  Calendar.prototype.prevMonth = function() {
    this.current.subtract('months', 1);
    this.next = false;
    this.drawCalendar();
  }

  window.Calendar = Calendar;

  function createElement(tagName, className, innerText) {
    var ele = document.createElement(tagName);
    if(className) {
      ele.className = className;
    }
    if(innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }
}();

!function() {
  var calendar = new Calendar('#calendar');
}();