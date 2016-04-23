
Observable = function() {
    this.status = "constructed";
    this.text = "<p>This is my <span style='color:red;'>special string</span> with an <img src='http://placehold.it/150x150'> image !</p>";
}

// returns the status of Observable
Observable.prototype.getStatus = function() {
    return this.status;
}

// returns a string
Observable.prototype.getText = function () {
    return this.text;
}

Observer = function() {
    this.subscriptions = [];
    this.textLenght = 0;
}
Observer.prototype = {
        
    subscribeTo: function(observable) {
        this.subscriptions.push(observable);
    },
    unsubscribeFrom: function(observable) {
        var i = 0,
            len = this.subscriptions.length;

        // Iterate through the array and if the observable is
        // found, remove it.
        for (; i < len; i++) {
            if (this.subscriptions[i] === observable) {
                this.subscriptions.splice(i, 1);
                // Once we've found it and removed it, we
                // don't need to continue, so just return.
                return;
            }
        }
    },
    doSomethingIfOk: function() {
        var i = 0;
        var len = this.subscriptions.length;
        var myStr;

        // Iterate through the subscriptions and determine
        // whether the status has changed to ok on each of them,
        // and do something for each subscription that has
        for (; i < len; i++) {
            if (this.subscriptions[i].getStatus() === "ok") {
                myStr = this.subscriptions[i].getText();
                
                this.typewrite(myStr);
            }
        }
    }, 
    typewrite: function (str) {
        
        text = str.slice(0, ++this.textLenght);
        if (text === str) 
            return;
        
        document.getElementById('typewriter').innerHTML = text;

        var char = text.slice(-1);
        if( char === '<' ) isTag = true;
        if( char === '>' ) isTag = false;

        if (isTag) 
            return this.typewrite(str);
            
        setTimeout(function() {
            this.typewrite(str);
        }.bind(this), 80);
    }
}

var observer = new Observer();
var observable = new Observable();
observer.subscribeTo(observable);

// Nothing will happen because the status hasn't changed
observer.doSomethingIfOk();

// Change the status to "ok" so now something will happen
observable.status = "ok";
observer.doSomethingIfOk();