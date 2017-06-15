/* ======= Model ======= */

var model = {
    currentprey: null,
    preys: [
        {
            clickCount : 0,
            name : 'Carnivine',
            imgSrc :  "https://raw.githubusercontent.com/sparklinlabs/superpowers-asset-packs/master/prehistoric-platformer/monsters/plant-1.png",
            width: 600,
            height: 253,
            frames: 6,
            flip: true,
        },
        {
            clickCount : 0,
            name : 'Grass Chopper',
            imgSrc : 'https://raw.githubusercontent.com/sparklinlabs/superpowers-asset-packs/master/prehistoric-platformer/monsters/insect-1.png',
            width: 390,
            height: 138,
            frames: 5,
            flip: true,
        },
        {
            clickCount : 0,
            name : 'Hurtle',
            imgSrc : 'https://raw.githubusercontent.com/sparklinlabs/superpowers-asset-packs/master/prehistoric-platformer/monsters/turtle-1.png',
            width: 362,
            height: 154,
            frames: 6,
            flip: false,
        },
        {
            clickCount : 0,
            name : 'Lizorde',
            imgSrc : 'https://raw.githubusercontent.com/sparklinlabs/superpowers-asset-packs/master/prehistoric-platformer/monsters/lizard-2.png',
            width: 600,
            height: 196,
            frames: 6,
            flip: true,
        },
        {
            clickCount : 0,
            name : 'Visciousaur',
            imgSrc : 'https://raw.githubusercontent.com/sparklinlabs/superpowers-asset-packs/master/prehistoric-platformer/monsters/tyrannosaurus-1.png',
            width: 600,
            height: 280,
            frames: 6,
            flip: false,
        }
    ]
};


/* ======= controller ======= */

var controller = {

    init: function() {
        // set our current prey to the first one in the list
        model.currentprey = model.preys[0];

        // tell our views to initialize
        preyListView.init();
        preyView.init();
    },

    getCurrentprey: function() {
        return model.currentprey;
    },

    getpreys: function() {
        return model.preys;
    },

    // set the currently-selected prey to the object passed in
    setCurrentprey: function(prey) {
        model.currentprey = prey;
    },

    // increments the counter for the currently-selected prey
    incrementCounter: function() {
        model.currentprey.clickCount++;
        preyView.render();
    }
};


/* ======= View ======= */

var preyView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.preyElem = document.getElementById('prey');
        this.preyNameElem = document.getElementById('prey-name');
        this.preyImageElem = document.getElementById('prey-img');
        this.countElem = document.getElementById('prey-count');

        // on click, increment the current prey's counter
        this.preyImageElem.addEventListener('click', function(){
            controller.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current prey
        var currentprey = controller.getCurrentprey();
        this.countElem.textContent = currentprey.clickCount;
        this.preyNameElem.textContent = currentprey.name;
        this.preyImageElem.src = currentprey.imgSrc;
    }
};

var preyListView = {

    init: function() {
        // store the DOM element for easy access later
        this.preyListElem = document.getElementById('prey-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var prey, elem, i;
        // get the preys we'll be rendering from the controller
        var preys = controller.getpreys();

        // empty the prey list
        this.preyListElem.innerHTML = '';

        // loop over the preys
        for (i = 0; i < preys.length; i++) {
            // this is the prey we're currently looping over
            prey = preys[i];

            // make a new prey list item and set its text
            elem = document.createElement('li');
            elem.textContent = prey.name;

            // on click, setCurrentprey and render the preyView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the prey variable to the click event function)
            elem.addEventListener('click', (function(preyCopy) {
                return function() {
                    controller.setCurrentprey(preyCopy);
                    preyView.render();
                };
            })(prey));

            // finally, add the element to the list
            this.preyListElem.appendChild(elem);
        }
    }
};

// make it go!
controller.init();
