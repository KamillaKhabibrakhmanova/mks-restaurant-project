$(document).ready(function() {

        /*
         * Image Slider
         */

        /*
         * @name Menu
         * @description The goal of this section to get the menu information from the JSON.
         *              Go to http://mksrestaurantapi.herokuapp.com/menu-dinner.json to see an example of what the JSON looks like.
         * @steps
         *      1. Get the event information from a click handler.
         *      2. Use that event info to get the JSON from the API.
         *      3. Iterate through the array in 2 steps:
         *          1. Iterate through the array of sections and create the HTML string per section
         *          2. Within each section, iterate through each piece of menu info and create the HTML string.
         *      4. Take the finalized HTML string and populate the menu section of the site.
         */

        /*
         * @name populateMenu
         * @description Populate individual items of the menu
         */

        var populatePieces = function(json) {

            // @TODO Create empty string variable
            var string = "";

            //     // @TODO Iterate through array that was passed through the parameter 
            for (var i = 0; i < json.length; i++) {

                if (json[i].hasOwnProperty('ingredients')) {

                    string = string + "<div class=\"menu-item\"><div class = \"menu-item-name\">" + json[i].dish;
                    string = string + "</div><p class = \" menu-item description\">" + json[i].ingredients;
                    string = string + "<span class=\"menu-item-price\">" + json[i].price + "</span></p></div>";

                } else {

                    string = string + "<div class=\"menu-item\"><div class = \"menu-item-name no-price\">" + json[i].dish;
                    string = string + "</div>";
                    string = string + "<span class=\"menu-item-price\">" + json[i].price + "</span></div>";
                }
            };
                //         /*
                //  * @TODO Create HTML string based on the original HTML. Final sting should look like this:
                //  *       <div class="menu-item">
                //  *            <div class="menu-item-name">malpeque oyster</div>
                //  *            <p class="menu-item-description">prince edward island, canada</p>
                //  *            <div class="menu-item-price">3</div>
                //  *       </div>
                // */

                /*
                 * @TODO Extension: Notice how on wine, there are undefined ingredients
                 *            Goal: Check if the ingredient section exists.
                 *                   If it doesn't, remove the ingredients section and
                 *                   add a new CSS class to the menu item name to make the price
                 *                   show up next to it.
                 */


                // @TODO Return the created string
                return string;
            };

            /*
             * @name populateSections
             * @description Populate sections of the menu and add that to the HTML.
             */

            var populateSections = function(json) {

                // @TODO Create empty string variable
                var string2 = "";
                for (var i = 0; i < json.length; i++) {
                    string2 = string2 + "<div id=\"menu-section-content\" class=\"menu-section-content is-active\">";
                    string2 = string2 + "<div class = \" menu-group columns small-12 medium-4\">";
                    string2 = string2 + "<h4>" + json[i].section + "</h4>" + populatePieces(json[i].content) + "</div></div>";
                }

                $(".menu-section").html(string2);
            };

            /*
             * @TODO Create HTML string based on the original HTML. 
             *       YOU WILL NEED TO PASS populatePieces() into this loop in order to get the string for the individual pieces.
              
             *  Final sting should look like this:
             *  <div id="menu-section-content" class="menu-section-content menu-dinner is-active">
             *        <div class="menu-group columns small-12 medium-4">
             *            <h4>Raw Bar</h4>
             *               ...
             *        </div>
             *         ...
             *  </div>
            */

            // @TODO Iterate through array that was passed through the parameter and create the HTML string

            // @TODO Use a jQuery function to insert the HTML string into the menu section content area



            /*
             * @name getMenu
             * @description Get menu items from the API.
             * @param course - this parameter is used to get the specific course section, ie 'breakfast', 'lunch', 'wine'
             */

            var getMenu = function(course) {

                /*
                 * @TODO Extension: Replace $.getJSON() with $.ajax(). If done properly, you will have made your first AJAX command!
                 *                   Google 'jQuery json' to learn more about how to use it.
                 */

                // Get the JSON from the API.
                $.getJSON('http://mksrestaurantapi.herokuapp.com/menu-' + course + '.json', function(json) {
                    // Once that happens, run populateSections() and pass in the JSON.
                    populateSections(json);

                });

                $.ajax({
                    url:'http://mksrestaurantapi.herokuapp.com/menu-' + course + '.json'
                    }).done(function(json) {
                    // Once that happens, run populateSections() and pass in the JSON.
                    populateSections(json);

                });


            };

            /*
             * @name Event Handler
             * @description This event handler will pick up event information from the menu actions. Use this to pass the course to getMenu.
             */

            // @TODO Create an event handler to get event information for menu actions
            $('.menu-action').on('click', function(e) {
                // @TODO Get the id attribute from what was clicked.
                id = $(this).attr('id');
                // @TODO Console.log id. Notice how the end of the ID has 'breakfast','lunch', etc. 

                // This action will save the ending of the id to back into id, so now id only equals 'breakfast','lunch',etc
                id = id.substring(12, id.length);
                // @TODO Pass the id into getMenu() to begin the process of getting the JSON and populating the data
                getMenu(id);
                // @TODO Remove the class 'is-active' from all menu actions
                $('.menu-action').removeClass('is-active');
                $(this).addClass('is-active');
                // @TODO Add 'is-active' to this specific action that was clicked. 'is-active provides the visual cue for what's active via CSS
            });

            $('.dropdown-item').on('click', function(e) {
                id2 = $(this).attr('id');
                getMenu(id2);
                $('.menu-action').removeClass('is-active');
                $(this).addClass('is-active');
            });

            var init = function() {
                var d = new Date();
                var n = d.getHours();
                console.log(n);
                $(".menu-action").removeClass('is-active');
                if (n > 5 && n < 11) {
                    getMenu('breakfast');
                    $("#menu-action-breakfast").addClass('is-active');
                }

                else if (n >= 11 && n < 15) {
                    getMenu('lunch');
                    $("#menu-action-lunch").addClass('is-active');
                }
                else if (n >= 15 && n < 17) {
                    getMenu('cocktails');
                    $("#menu-action-cocktails").addClass('is-active');
                }
                else {
                getMenu('dinner');
                
                $("#menu-action-dinner").addClass('is-active');
            }
            };

            // Run init() to make whatever happens in init run.
            init();

        });